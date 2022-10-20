import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

import { ReceivedFilePayload } from '../types/receiveSharingIntent';

import store from '../store';
import { stageCredentials } from '../store/slices/credentialFoyer';
import { Credential } from '../types/credential';
import { navigationRef } from '../navigation';
import { displayGlobalError } from '../store/slices/wallet';
import { credentialsFromQrText } from './decode';
import { readFile } from './import';

export async function onShareIntent(): Promise<void> {
  const files = await getReceivedFiles();
  if (files.length === 0) return;

  const credentials: Credential[] = [];
  let hasError = false;

  await Promise.all(files.map(async (file) => {
    try {
      const { filePath } = file;
      const fileContent = await readFile(filePath);
      const fileCredentials = await credentialsFromQrText(fileContent);
      credentials.push(...fileCredentials);
    } catch (err) {
      hasError = true;
      console.warn(err);
    }
  }));

  if (hasError) {
    await store.dispatch(displayGlobalError({ title: 'Unable to Add Credentials', message: 'Ensure the file contains one or more credentials, and is a supported file type.' }));
  } else {
    await store.dispatch(stageCredentials(credentials));

    if (navigationRef.isReady()) {
      navigationRef.navigate('AcceptCredentialsNavigation', { screen: 'ChooseProfileScreen' });
    }
  }
}

async function getReceivedFiles(): Promise<ReceivedFilePayload[]> {
  const SHARE_URL_PROTOCOL = 'org.dcconsortium';

  return new Promise((resolve, reject) => {
    const onSuccess = (files: ReceivedFilePayload[]) => resolve(files);
    const onFailed = (error: unknown) => {
      console.log('Error in getReceivedFiles:');
      console.log(error);
      reject(error);
    };

    ReceiveSharingIntent.getReceivedFiles(onSuccess, onFailed, SHARE_URL_PROTOCOL);
  });
}
