import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';

import { requestCredential, CredentialRequestParams } from '../lib/request';
import { RootState } from '../store';
import { DidState } from '../store/slices/did';
import { Credential } from '../types/credential';

export type RequestPayload = {
  credentials?: Credential[];
  loading: boolean;
  error: string;
}

type Params = Record<string, unknown>

function isCredentialRequestParams(params?: Params): params is CredentialRequestParams {
  const { issuer, vc_request_url } = (params || {} as CredentialRequestParams);
  return issuer !== undefined && vc_request_url !== undefined;
}

export function useRequestCredentials(routeParams?: Params): RequestPayload {
  const { rawDidRecords } = useSelector<RootState, DidState>(({ did }) => did);
  const [ didRecord ] = rawDidRecords;

  const [credentials, setCredentials] = useState<Credential[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * The app takes a few miliseconds to update the DID store when the app is launched
   * with a deep link request, so we should wait until the didRecord is
   * present before handling a deep link and ensure that the splash screen is
   * hidden.
   */
  async function handleDeepLink() {
    console.log('handleDeepLink', routeParams);
    if (didRecord !== undefined && isCredentialRequestParams(routeParams)) {
      await SplashScreen.hideAsync();
      setLoading(true);

      try {
        const credentials = await requestCredential(routeParams, didRecord);
        setCredentials(credentials);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
  }


  useEffect(() => {
    handleDeepLink();
  }, [routeParams, didRecord]);

  return { credentials, loading, error };
}
