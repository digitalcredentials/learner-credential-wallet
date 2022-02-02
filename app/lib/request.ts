import { authorize } from 'react-native-app-auth';

import { Credential } from '../types/credential';
import { DidRecordRaw } from '../model';

import { createVerifiablePresentation } from './present';
import { verifyCredential } from './validate';
import { registries } from './registry';

export type CredentialRequestParams = {
  auth_type?: string;
  issuer: string;
  vc_request_url: string;
  challenge?: string;
}

export async function requestCredential(credentialRequestParams: CredentialRequestParams, didRecord: DidRecordRaw): Promise<Credential> {
  const { 
    // auth_type,
    issuer, 
    vc_request_url, 
    challenge,
  } = credentialRequestParams;

  console.log('Credential request params', credentialRequestParams);

  if (!registries.issuerAuth.isInRegistry(issuer)) {
    throw new Error(`Unknown issuer: "${issuer}"`);
  }

  const config = registries.issuerAuth.entryFor(issuer);

  /**
   * There needs to be a delay before authenticating or the app errors out.
   */
  await new Promise((res) => setTimeout(res, 1000));

  const { accessToken } = await authorize(config).catch((err) => {
    console.error(err);
    throw Error('Unable to receive credential: Authorization with the issuer failed');
  });

  const requestBody = await createVerifiablePresentation([], didRecord, challenge);
  const request = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  };

  const response = await fetch(vc_request_url, request);

  if (!response.ok) {
    console.error(`Issuer response (failed): ${JSON.stringify(response, null, 2)}`);
    throw Error('Unable to receive credential: The issuer failed to return a valid response');
  }

  const responseJson  = await response.json();
  const credential = responseJson as Credential;

  try {
    const verified = await verifyCredential(credential);
    if (!verified) {
      throw new Error('Credential was received, but could not be verified');
    }
  } catch (err) {
    console.warn(err);
  }

  return credential;
}