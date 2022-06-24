import { useState, useCallback, useEffect } from 'react';

import { ResultLog, verifyCredential } from '../lib/validate';
import { Credential, CredentialError } from '../types/credential';


export type VerifyPayload = {
  loading: boolean;
  verified: boolean | null;
  error: string | null;
  log: ResultLog[]
}

// Adapted from https://usehooks.com/useAsync/
export function useVerifyCredential(credential?: Credential): VerifyPayload | null {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [log, setLog] = useState<ResultLog[]>([]);

  if (credential === undefined) {
    return null;
  }

  const verify = useCallback(async () => {
    try {
      const { verified, results } = await verifyCredential(credential);
      setLog(results[0].log);
      setVerified(verified);
    } catch (err) {
      if (Object.values(CredentialError).includes(err.message)) {
        setError(err.message);
      } else {
        setError('An error was encountered while verifying this credential.');
      }
    } finally {
      setLoading(false);
    }
  }, [setLoading, setVerified]);

  useEffect(() => {
    verify();
  }, [verify]);

  return { loading, verified, error, log };
}
