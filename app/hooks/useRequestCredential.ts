import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import * as RNFS from 'react-native-fs';

import { credentialsFromQrText } from '../lib/decode';

import { requestCredential, CredentialRequestParams } from '../lib/request';
import { RootState } from '../store';
import { DidState } from '../store/slices/did';
import { Credential } from '../types/credential';

import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

export type RequestPayload = {
  credentials?: Credential[];
  loading: boolean;
  error: string;
}

type Params = Record<string, unknown>

async function getSharedFiles(): Promise<any> {
  return new Promise((resolve, reject) => {
    ReceiveSharingIntent.getReceivedFiles(
      (files: any) => {
        resolve(files);
      },
      (error: any) => {
        console.log('Error in getReceivedFiles:');
        console.log(error);
        reject(error);
      },
      'org.dcconsortium',
    );
  });
}

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
   * The app takes a few milliseconds to update the DID store when the app is launched
   * with a deep link request, so we should wait until the didRecord is
   * present before handling a deep link and ensure that the splash screen is
   * hidden.
   */
  async function handleDeepLink() {
    console.log('handleDeepLink', routeParams);
    let files;
    try {
      console.log('Attempting to get shared files...');
      files = await getSharedFiles();
      console.log('files:', files);
    } catch (e) {
      console.log(e);
      console.error('Error getting shared files:', e);
    }

    let credentials: Credential[];

    if(files) {
      console.log('Received files:', files);
      const [file] = files;
      if(!file.filePath) {
        return;
      }

      const vp = await RNFS.readFile(file.filePath, 'utf8');
      console.log('Shared via WebShare:', vp);

      await SplashScreen.hideAsync();
      setLoading(true);

      try {
        let {verifiableCredential: credentials} = JSON.parse(vp);
        if (!Array.isArray(credentials)) {
          credentials = [credentials];
        }
        setCredentials(credentials);
      } catch (err) {
        console.log('Could not parse shared vp:', err);
        setError('Could not parse shared credential(s).');
      }

      setLoading(false);
      return;
    }

    if (didRecord !== undefined && isCredentialRequestParams(routeParams)) {
      await SplashScreen.hideAsync();
      setLoading(true);

      try {
        credentials = await requestCredential(routeParams, didRecord);
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
  }, [routeParams, didRecord, credentials]);

  return { credentials, loading, error };
}
