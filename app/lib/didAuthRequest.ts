import { ProfileRecordRaw } from '../model';
import { makeSelectDidFromProfile, selectWithFactory } from '../store/selectorFactories';
import { Ed25519Signature2020 } from '@digitalcredentials/ed25519-signature-2020';
import { Ed25519VerificationKey2020 } from '@digitalcredentials/ed25519-verification-key-2020';
import { constructExchangeRequest, handleVcApiExchange } from './exchanges';
import store from '../store';
import { stageCredentials } from '../store/slices/credentialFoyer';
import { extractCredentialsFrom } from './verifiableObject';

type VerifiablePresentationRequestService = {
  type: string;
  serviceEndpoint: string;
}

export type DidAuthRequestParams = {
  query: {
    type: 'DIDAuthentication';
  };
  interact?: {
    service: VerifiablePresentationRequestService[];
  };
  challenge: string;
  domain: string;
};

export async function performDidAuthRequest(params: DidAuthRequestParams, rawProfileRecord: ProfileRecordRaw): Promise<void> {
  const didRecord = selectWithFactory(makeSelectDidFromProfile, { rawProfileRecord });
  const { challenge, domain, interact } = params;

  const holder = didRecord?.didDocument.authentication[0].split('#')[0] as string;
  const key = await Ed25519VerificationKey2020.from(didRecord?.verificationKey);
  const suite = new Ed25519Signature2020({ key });

  const url = interact?.service[0]?.serviceEndpoint as string;
  const request = await constructExchangeRequest({
    challenge,
    domain,
    holder,
    suite
  });

  const { verifiablePresentation } = await handleVcApiExchange({ url, request });
  const credentials = extractCredentialsFrom(verifiablePresentation);

  if (credentials) {
    await store.dispatch(stageCredentials(credentials));
  }
}
