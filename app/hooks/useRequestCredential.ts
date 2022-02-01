import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
// import * as RNFS from 'react-native-fs';

import { credentialsFromQrText } from '../lib/decode';

import { requestCredential, CredentialRequestParams } from '../lib/request';
import { RootState } from '../store';
import { DidState } from '../store/slices/did';
import { Credential } from '../types/credential';

import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

export type RequestPayload = {
  credential?: Credential;
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
        console.log(error);
        reject(error);
      },
      'edu.mit.eduwallet',
    );
  });
}

function isCredentialRequestParams(params?: Params): params is CredentialRequestParams {
  const { issuer, vc_request_url } = (params || {} as CredentialRequestParams);
  return issuer !== undefined && vc_request_url !== undefined;
}

export function useRequestCredential(routeParams?: Params): { credential: Credential | string | undefined; loading: boolean; error: string } {
  const { rawDidRecords } = useSelector<RootState, DidState>(({ did }) => did);
  const [ didRecord ] = rawDidRecords;

  const [credential, setCredential] = useState<Credential | string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * The app takes a few miliseconds to update the DID store when the app is launched
   * with a deep link request, so we should wait until the didRecord is
   * present before handling a deep link and ensure that the splash screen is
   * hidden.
   */
  async function handleDeepLink() {
    console.log('Handling deep link...');
    let files;
    try {
      console.log('Attempting to get shared files...');
      files = await getSharedFiles();
      console.log('files:', files);
    } catch (e) {
      console.log(e);
      console.error('Error getting shared files:', e);
    }

    let credential: Credential;

    if(files) {
      console.log('Received files:', files);
      const [file] = files;

      // console.log('url:', url);
      const encoded = 'VP1-' + file.text.split('VP1-')[1];

      console.log('extracted:', encoded);

      await SplashScreen.hideAsync();
      setLoading(true);

      // let credential: Credential;
      const [credential] = await credentialsFromQrText(encoded);

      console.log('credential:', credential);

      // const fileContents = await RNFS.readFile(file.filePath, 'ascii');
      // console.log(fileContents);
      // const credential = fileContents;

      setCredential(credential);
      setLoading(false);
      return;
    }

    if (didRecord !== undefined && isCredentialRequestParams(routeParams)) {
      await SplashScreen.hideAsync();
      setLoading(true);

      try {
        credential = await requestCredential(routeParams, didRecord);
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
  }, [routeParams, didRecord, credential]);

  return { credential, loading, error };
}
