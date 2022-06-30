import { useState, useCallback, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { ResultLog, verifyCredential } from '../lib/validate';
import { Credential, CredentialError } from '../types/credential';
import { Cache } from '../lib/cache';


export type VerifyPayload = {
  loading: boolean;
  verified: boolean | null;
  error: string | null;
  timestamp: number | null;
  log: ResultLog[];
}

export type CachedResult = {
  verified: boolean;
  timestamp: number;
  log: ResultLog[];
}

// Adapted from https://usehooks.com/useAsync/
export function useVerifyCredential(credential?: Credential): VerifyPayload | null {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [log, setLog] = useState<ResultLog[]>([]);


  if (credential === undefined) {
    return null;
  }

  const verify = useCallback(async () => {

    try {
      const cache = Cache.getInstance();
      const { isInternetReachable } = await NetInfo.fetch();

      let verified: boolean, timestamp: number, log: ResultLog[];
      if (isInternetReachable) {
        const response = await verifyCredential(credential);
        verified = response.verified;
        log = response.results[0].log;
        timestamp = Date.now();
        await cache.store('verificationResult', credential.id, { verified, timestamp, log })
      } else {
        ({ verified, timestamp, log } = await cache.load('verificationResult', credential.id) as CachedResult);
      }

      setLog(log);
      setVerified(verified);
      setTimestamp(timestamp);
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

  return { loading, verified, error, timestamp, log };
}
