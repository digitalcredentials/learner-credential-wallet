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
    issuer,
    vc_request_url,
    challenge,
  } = credentialRequestParams;
  // Default to 'code' - OAuth2 Authorization Code flow
  const authType = credentialRequestParams.auth_type || 'code';
  console.log('Credential request params', credentialRequestParams);

  let accessToken;
  let oidcConfig;

  switch (authType) {
  case 'code':
    if (!registries.issuerAuth.isInRegistry(issuer)) {
      throw new Error(`Unknown issuer: "${issuer}"`);
    }
    oidcConfig = registries.issuerAuth.entryFor(issuer);
    // There needs to be a delay before authenticating or the app errors out.
    await new Promise((res) => setTimeout(res, 1000));
    console.log('Launching OIDC auth:', oidcConfig);
    try {
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
    throw Error(`Unsupported auth_type value: "${authType}".`);
  }

  const requestBody = await createVerifiablePresentation(
    undefined, didRecord, challenge);

  console.log(JSON.stringify(requestBody, null, 2));

  const headers: any = {
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
