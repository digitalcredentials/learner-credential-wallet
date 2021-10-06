import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { requestCredential, CredentialRequestParams } from '../lib/request';
import { RootState } from '../store';
import { DidState } from '../store/slices/did';
import { Credential } from '../types/credential';
import { DidRecordRaw } from '../model';

export type RequestPayload = {
  credential?: Credential;
  loading: boolean;
  error: string;
}

type Params = Record<string, unknown>

function isCredentialRequestParams(params?: Params): params is CredentialRequestParams {
  const { issuer, vc_request_url, challenge } = (params || {} as CredentialRequestParams);
  return issuer !== undefined && vc_request_url !== undefined && challenge !== undefined;
}

function isDidRecord(didRecord?: DidRecordRaw): didRecord is DidRecordRaw {
  return didRecord !== undefined;
}

export function useRequestCredential(routeParams?: Params): RequestPayload {
  const { rawDidRecords } = useSelector<RootState, DidState>(({ did }) => did);
  const [ didRecord ] = rawDidRecords;

  const [credential, setCredential] = useState<Credential | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * The Database connection isn't immediately ready on app load so we 
   * should verify the didRecord along with the routeParams when
   * handling a deep link.
   */
  async function handleDeepLink() {
    if (isDidRecord(didRecord) && isCredentialRequestParams(routeParams)) {
      setLoading(true);
      try {
        const credential = await requestCredential(routeParams, didRecord);
        if (credential !== undefined) {
          setCredential(credential);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }

  
  useEffect(() => {
    handleDeepLink();
  }, [routeParams, didRecord]);

  return { credential, loading, error };
}
