import uuid from 'react-native-uuid';
import vc from '@digitalcredentials/vc';
import { Ed25519Signature2020 } from '@digitalcredentials/ed25519-signature-2020';
import { securityLoader } from '@digitalcredentials/security-document-loader';
import { JSONPath } from 'jsonpath-plus';
import validator from 'validator';
import { VerifiablePresentation } from '../types/presentation';

const MAX_INTERACTIONS = 10;

// Different types of queries in verifiable presentation request
enum QueryType {
  Example = 'QueryByExample',
  Frame = 'QueryByFrame',
  DidAuth = 'DIDAuthentication',
  DidAuthLegacy = 'DIDAuth'
}

// Interact with VC-API exchange
const interactExchange = async (url: string, request={}): Promise<any> => {
  const exchangeResponseRaw = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request, undefined, 2)
  });
  return exchangeResponseRaw.json();
};

// Extend JSON path of credential by a literal value
const extendPath = (path: string, extension: string): string => {
  const jsonPathResCharsRegex = /[$@*()\[\].:?]/g;
  if (jsonPathResCharsRegex.test(extension)) {
    // In order to escape reserved characters in a JSONPath in jsonpath-plus,
    // you must prefix each occurrence thereof with a tick symbol (`)
    extension = extension.replace(jsonPathResCharsRegex, (match: string) => '`' + match);
  }
  return `${path}.${extension}`;
};

// Check if credential matches QueryByExample VPR
const credentialMatchesVprExampleQuery = async (vprExample: any, credential: any, credentialPath='$'): Promise<boolean> => {
  const credentialMatches = [];
  for (let [vprExampleKey, vprExampleValue] of Object.entries(vprExample)) {
    const newCredentialPath = extendPath(credentialPath, vprExampleKey);
    // The result is always dumped into a single-element array
    const [credentialScope] = JSONPath({ path: newCredentialPath, json: credential });
    if (Array.isArray(vprExampleValue)) {
      // Array query values require that matching credentials contain at least every values specified
      // Note: This logic assumes that each array element is a literal value
      if (!Array.isArray(credentialScope)) {
        return false;
      }
      if (credentialScope.length < vprExampleValue.length) {
        return false;
      }
      const credentialArrayMatches = vprExampleValue.every((vprExVal) => {
        return !!credentialScope.includes(vprExVal);
      });
      credentialMatches.push(credentialArrayMatches);
    } else if (typeof vprExampleValue === 'object' && vprExampleValue !== null) {
      // Object query values will trigger a recursive call in order to handle nested queries
      const credentialObjectMatches = await credentialMatchesVprExampleQuery(vprExampleValue, credential, newCredentialPath);
      credentialMatches.push(credentialObjectMatches);
    } else {
      // Literal query values can be compared directly
      const credentialLiteralMatches = credentialScope === vprExampleValue;
      credentialMatches.push(credentialLiteralMatches);
    }
  }
  return credentialMatches.every(matches => matches);
};

// Type definition for constructExchangeRequest function parameters
type ConstructExchangeRequestParameters = {
  credentials?: unknown[];
  challenge?: string | undefined;
  domain: string | undefined;
  holder: string;
  suite: Ed25519Signature2020;
  signed?: boolean;
};

type ExchangeRequest = {
  verifiablePresentation: VerifiablePresentation
}

type ExchangeResponse = ExchangeRequest;

// Construct exchange request in the form of a verifiable presentation
export const constructExchangeRequest = async ({
  credentials=[],
  challenge=uuid.v4() as string,
  domain,
  holder,
  suite,
  signed=true
}: ConstructExchangeRequestParameters): Promise<ExchangeRequest> => {
  const presentation = vc.createPresentation({ holder });
  if (credentials.length !== 0) {
    presentation.verifiableCredential = credentials;
  }
  let finalPresentation = presentation;
  if (signed) {
    const documentLoader = securityLoader({ fetchRemoteContexts: true }).build();
    finalPresentation = await vc.signPresentation({
      presentation,
      challenge,
      domain,
      suite,
      documentLoader
    });
  }
  return { verifiablePresentation: finalPresentation };
};

// Determine if any additional VC-API exchange interactions are required
const requiresAction = (exchangeResponse: any): boolean => {
  return !!exchangeResponse.verifiablePresentationRequest;
};

// Type definition for handleVcApiExchangeSimple function parameters
type HandleVcApiExchangeSimpleParameters = {
  url: string;
  request: ExchangeRequest;
};

// Handle simplified VC-API credential exchange workflow
export const handleVcApiExchangeSimple = async ({ url, request }: HandleVcApiExchangeSimpleParameters): Promise<ExchangeResponse> => {
  const exchangeResponseRaw = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request, undefined, 2)
  });

  return exchangeResponseRaw.json();
};

// Type definition for handleVcApiExchangeComplete function parameters
type HandleVcApiExchangeCompleteParameters = {
  url: string;
  request?: any;
  holder: string;
  suite: Ed25519Signature2020;
  interactions?: number;
  interactive?: boolean;
};

// Handle complete VC-API credential exchange workflow
export const handleVcApiExchangeComplete = async ({
  url,
  request={},
  holder,
  suite,
  interactions=0,
  interactive=false
}: HandleVcApiExchangeCompleteParameters): Promise<ExchangeResponse> => {
  if (interactions === MAX_INTERACTIONS) {
    throw new Error(`Request timed out after ${interactions} interactions`);
  }
  if (!validator.isURL(url + '')) {
    throw new Error(`Received invalid interaction URL from issuer: ${url}`);
  }

  const exchangeResponse = await interactExchange(url, request);
  if (!requiresAction(exchangeResponse)) {
    return exchangeResponse;
  }

  let signed = false;
  let credentials: any[] = [];
  const { query, challenge, domain, interact } = exchangeResponse.verifiablePresentationRequest;
  let queries = query;
  if (!Array.isArray(queries)) {
    queries = [query];
  }
  for (let query of queries) {
    switch (query.type) {
      case QueryType.DidAuthLegacy:
      case QueryType.DidAuth:
        signed = true;
        break;
    }
  }

  const exchangeRequest = await constructExchangeRequest({ credentials, challenge, domain, holder, suite, signed });
  const exchangeUrl = interact?.service[0]?.serviceEndpoint ?? url;
  return handleVcApiExchangeComplete({ url: exchangeUrl, request: exchangeRequest, holder, suite, interactions: interactions + 1, interactive });
};
