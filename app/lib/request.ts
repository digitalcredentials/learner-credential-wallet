import { authorize } from 'react-native-app-auth';

import { Credential } from '../types/credential';
import { DidRecordRaw } from '../model';

import { createVerifiablePresentation } from './present';
import { registries } from './registry';
import { parseResponseBody } from './parseResponse';
import { extractCredentialsFrom, verifyVerifiableObject, VerifiableObject } from './verifiableObject';

export type CredentialRequestParams = {
  auth_type?: string;
  issuer: string;
  vc_request_url: string;
  challenge?: string;
}

export async function requestCredential(credentialRequestParams: CredentialRequestParams, didRecord: DidRecordRaw): Promise<Credential[]> {
  const {
    auth_type = 'code',
    issuer,
    vc_request_url,
    challenge,
  } = credentialRequestParams;
 
  console.log('Credential request params', credentialRequestParams);

  let accessToken;
  let oidcConfig;

  switch (auth_type) {
  case 'code':
    if (!registries.issuerAuth.isInRegistry(issuer)) {
      throw new Error(`Unknown issuer: "${issuer}"`);
    }
    oidcConfig = registries.issuerAuth.entryFor(issuer);
    // There needs to be a delay before authenticating or the app errors out.
    await new Promise((res) => setTimeout(res, 1000));
    console.log('Launching OIDC auth:', oidcConfig);
    try {
      console.log('authorize() called with:', oidcConfig);
      ({accessToken} = await authorize(oidcConfig));
    } catch (err) {
      console.error(err);
      throw Error(
        'Unable to receive credential: Authorization with the issuer failed');
    }
    console.log('Received access token, requesting credential.');
    break;
  case 'bearer':
    // Bearer token - do nothing. The 'challenge' param will be passed in the VP
    break;
  default:
    throw Error(`Unsupported auth_type value: "${auth_type}".`);
  }

  const requestBody = await createVerifiablePresentation(
    undefined, didRecord, challenge);

  console.log(JSON.stringify(requestBody, null, 2));

  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const request = {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  };

  const response = await fetch(vc_request_url, request);

  if (!response.ok) {
    console.error(`Issuer response (failed): ${JSON.stringify(response, null, 2)}`);
    throw Error('Unable to receive credential: The issuer failed to return a valid response');
  }

  const responseBody = await parseResponseBody(response);
  const verifiableObject = responseBody as VerifiableObject;

  const verified = await verifyVerifiableObject(verifiableObject);
  if (!verified) {
    console.warn('Response was received, but could not be verified');
  }

  const credentials = extractCredentialsFrom(verifiableObject);
  if (credentials === null) {
    throw new Error('Unable to receive credential: The issuer failed to return a Verifiable Credential (VC) or Verifiable Presentation (VP)');
  }

  return credentials;
}
