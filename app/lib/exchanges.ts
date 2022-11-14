import uuid from 'react-native-uuid';
import vc from '@digitalcredentials/vc';
import { Ed25519Signature2020 } from '@digitalcredentials/ed25519-signature-2020';
import { securityLoader } from '@digitalcredentials/security-document-loader';

// Type definition for constructExchangeRequest function parameters
type ConstructExchangeRequestParameters = {
  credentials?: any[];
  challenge?: string | undefined;
  domain: string | undefined;
  holder: string;
  suite: Ed25519Signature2020;
  signed?: boolean;
};

// Construct exchange request in the form of a verifiable presentation
export const constructExchangeRequest = async ({
  credentials=[],
  challenge=uuid.v4() as string,
  domain,
  holder,
  suite,
  signed=true
}: ConstructExchangeRequestParameters): Promise<any> => {
  const presentation = vc.createPresentation({ holder });
  if (credentials.length !== 0) {
    presentation.verifiableCredential = credentials;
  }
  let finalPresentation = presentation;
  if (signed) {
    const documentLoader = securityLoader().build();
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

// Type definition for handleVcApiExchange function parameters
type HandleVcApiExchangeParameters = {
  url: string;
  request: any;
};

// Handle simplified vc api credential exchange workflow
export const handleVcApiExchange = async ({ url, request }: HandleVcApiExchangeParameters): Promise<any> => {
  const exchangeResponseRaw = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request, undefined, 2)
  });
  return exchangeResponseRaw.json();
};
