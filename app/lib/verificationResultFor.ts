import { LruCache } from '@digitalcredentials/lru-memoize';
import { RegistryClient } from '@digitalcredentials/issuer-registry-client';
import {ResultLog} from './validate';
import {CredentialRecordRaw} from '../model';
import {verifyCredential} from './verifyCredentials';


/* Verification expiration = 30 days */
const VERIFICATION_EXPIRATION = 1000 * 30;
const lruCache = new LruCache({ maxAge: VERIFICATION_EXPIRATION });
export type VerificationResult = {
  timestamp: number | null;
  log: ResultLog[];
  verified: boolean | null;
  error?: Error;
}

export type VerifyPayload = {
  loading: boolean;
  error: string | null;
  result: VerificationResult;
}

export async function verificationResultFor(
  { rawCredentialRecord, forceFresh = false, registries }:
    { rawCredentialRecord: CredentialRecordRaw, forceFresh?: boolean, registries: RegistryClient },
): Promise<VerificationResult> {
  const cachedRecordId = String(rawCredentialRecord._id);

  if (!forceFresh) {
    const cachedResult = await lruCache.memoize({
      key: cachedRecordId,
      fn: () => {
        return verifyCredential(rawCredentialRecord.credential, registries);
      },
    }) as VerificationResult;
    return cachedResult;
  }

  let response, error;
  try {
    response = await verifyCredential(rawCredentialRecord.credential, registries);
  } catch (err) {
    error = err as Error;
  }

  const result: VerificationResult = {
    verified: response?.verified ?? false,
    log: response?.results ? response.results[0].log : [],
    timestamp: Date.now(),
    error,
  };

  return result;
}
