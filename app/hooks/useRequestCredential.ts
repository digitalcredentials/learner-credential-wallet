import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { requestCredential, CredentialRequestParams } from '../lib/request';
import { RootState } from '../store';
import { DidState } from '../store/slices/did';
import { Credential } from '../types/credential';

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

export function useRequestCredential(routeParams?: Params): RequestPayload {
  const { rawDidRecords } = useSelector<RootState, DidState>(({ did }) => did);
  const [ didRecord ] = rawDidRecords;

  const [credential, setCredential] = useState<Credential | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * The app takes a seconded to update the did store when the app is launched
   * with a deep link request, so we have to wait until the didRecord is
   * present before handling a deep link.
   */
  async function handleDeepLink() {
    if (didRecord !== undefined && isCredentialRequestParams(routeParams)) {
      setLoading(true);
      try {
        const credential = await requestCredential(routeParams, didRecord);
        setCredential(credential);
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
