import { useState, useCallback, useEffect } from 'react';
import { ResultLog, verifyCredential } from '../lib/validate';
import { CredentialError } from '../types/credential';
import { Cache, CacheKey } from '../lib/cache';
import { CredentialRecordRaw } from '../model';

/* Verification expiration = 30 days */
const VERIFICATION_EXPIRATION = 1000 * 60 * 60 * 24 * 30;

export type VerificationResult = {
  timestamp: number | null;
  log: ResultLog[];
  verified: boolean | null;
}

export type VerifyPayload = {
  loading: boolean;
  error: string | null;
  result: VerificationResult;
}

export type CachedResult = {
  verified: boolean;
  timestamp: number;
  log: ResultLog[];
}

const initialResult = { timestamp: null, log: [], verified: null };

// Adapted from https://usehooks.com/useAsync/
export function useVerifyCredential(rawCredentialRecord?: CredentialRecordRaw): VerifyPayload | null {
  const [loading, setLoading] = useState<VerifyPayload['loading']>(true);
  const [result, setResult] = useState<VerifyPayload['result']>(initialResult);
  const [error, setError] = useState<VerifyPayload['error']>(null);

  if (rawCredentialRecord === undefined) {
    return null;
  }

  const verify = useCallback(async () => {
    try {
      const verificationResult = await getOrGenerateVerificationResultFor(rawCredentialRecord);
      setResult(verificationResult);
    } catch (err) {
      const { message } = err as Error;
      const credentialErrors = Object.values(CredentialError) as string[];

      if (credentialErrors.includes(message)) {
        setError(message);
      } else {
        setError('An error was encountered while verifying this credential.');
      }
    } finally {
      setLoading(false);
    }
  }, [setLoading, setResult]);

  useEffect(() => {
    verify();
  }, [verify]);

  return { loading, error, result };
}

async function getOrGenerateVerificationResultFor(rawCredentialRecord: CredentialRecordRaw): Promise<VerificationResult> {
  const cachedRecordId = String(rawCredentialRecord._id);
  const cachedResult = await Cache.getInstance().load(CacheKey.VerificationResult, cachedRecordId).catch(() => null) as CachedResult;
  if (cachedResult) return cachedResult;

  const response = await verifyCredential(rawCredentialRecord.credential);
  const result = { 
    verified: response.verified, 
    log: response.results ? response.results[0].log : [],
    timestamp: Date.now(),
  };

  await Cache.getInstance().store(
    CacheKey.VerificationResult,
    cachedRecordId,
    result,
    VERIFICATION_EXPIRATION
  );

  return result;
}
