import { useState, useCallback, useEffect } from 'react';
import { ResultLog, verifyCredential } from '../lib/validate';
import { CredentialError } from '../types/credential';
import { Cache, CacheKey } from '../lib/cache';
import { CredentialRecordRaw } from '../model';
import { useFocusEffect } from '@react-navigation/native';

/* Verification expiration = 30 days */
const VERIFICATION_EXPIRATION = 1000 * 60 * 60 * 24 * 30;
const DEFAULT_ERROR_MESSAGE = 'An error was encountered while verifying this credential.';

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

const initialResult = { timestamp: null, log: [], verified: null };

// Adapted from https://usehooks.com/useAsync/
export function useVerifyCredential(rawCredentialRecord?: CredentialRecordRaw, forceFresh = false): VerifyPayload | null {
  const [loading, setLoading] = useState<VerifyPayload['loading']>(true);
  const [result, setResult] = useState<VerifyPayload['result']>(initialResult);
  const [error, setError] = useState<VerifyPayload['error']>(null);

  if (rawCredentialRecord === undefined) {
    return null;
  }

  const verify = useCallback(async () => {
    const verificationResult = await verificationResultFor(rawCredentialRecord, forceFresh);
    setResult(verificationResult);

    if (verificationResult.error) {
      const { message } = verificationResult.error;
      const credentialErrors = Object.values(CredentialError) as string[];
      const errorMessage = credentialErrors.includes(message) ? message : DEFAULT_ERROR_MESSAGE;

      setError(errorMessage);
    }
    
    setLoading(false);
  }, []);

  useFocusEffect(useCallback(() => {
    verify();
  }, [verify]));

  return { loading, error, result };
}

async function verificationResultFor(rawCredentialRecord: CredentialRecordRaw, forceFresh: boolean): Promise<VerificationResult> {
  const cachedRecordId = String(rawCredentialRecord._id);

  if (!forceFresh) {
    const cachedResult = await Cache.getInstance().load(CacheKey.VerificationResult, cachedRecordId).catch(() => null) as VerificationResult;
    if (cachedResult) return cachedResult;
  }

  let response, error;
  try {
    response = await verifyCredential(rawCredentialRecord.credential);
  } catch (err) {
    error = err as Error;
  }

  const result: VerificationResult = { 
    verified: response?.verified ?? false, 
    log: response?.results ? response.results[0].log : [],
    timestamp: Date.now(),
    error,
  };

  await Cache.getInstance().store(
    CacheKey.VerificationResult,
    cachedRecordId,
    result,
    VERIFICATION_EXPIRATION
  );

  return result;
}
