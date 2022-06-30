import { useState, useCallback, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { verifyCredential } from '../lib/validate';
import { Credential, CredentialError } from '../types/credential';
import { Cache } from '../lib/cache';

export type VerifyPayload = {
  loading: boolean;
  verified: boolean | null;
  error: string | null;
  timestamp: number | null;
}

export type CachedResult = {
  verified: boolean;
  timestamp: number;
}

// Adapted from https://usehooks.com/useAsync/
export function useVerifyCredential(credential?: Credential): VerifyPayload | null {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);


  if (credential === undefined) {
    return null;
  }

  const verify = useCallback(async () => {

    try {
      const cache = Cache.getInstance();
      const { isConnected } = await NetInfo.fetch();
      if (isConnected) {
        setVerified(await verifyCredential(credential));
      } else {
        const {verified, timestamp} = await cache.load('verificationResult', credential.id) as CachedResult;
        setTimestamp(timestamp);
        setVerified(verified);
      }
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

  return { loading, verified, error, timestamp };
}
