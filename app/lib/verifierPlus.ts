import { VERIFIER_PLUS_URL } from '@env';
import { CredentialRecordRaw } from '../model';
import { makeSelectDidForCredential, selectWithFactory } from '../store/selectorFactories';
import { createVerifiablePresentation } from './present';

/**
 * Posts a credential to Verifier Plus
 * 
 * @param rawCredentialRecord - the credential record to post
 * @returns {string} the url for the credential on Verifier Plus
 */
export async function postCredentialToVerifierPlus(rawCredentialRecord: CredentialRecordRaw): Promise<string> {
  const rawDidRecord = selectWithFactory(makeSelectDidForCredential, { rawCredentialRecord });
  const { credential } = rawCredentialRecord;
  const vp = await createVerifiablePresentation(credential, rawDidRecord);

  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vp }),
  };

  const url = `${VERIFIER_PLUS_URL}/api/credentials`;

  const response = await fetch(url, request);
  if (!response.ok) {
    console.log('Verifier Plus response:', JSON.stringify(response, null, 2));
    throw new Error(`Failed to post credential to Verifier Plus: ${response.status} ${response.statusText}`);
  }

  const { location } = await response.json();

  return `${VERIFIER_PLUS_URL}${location}`;
}