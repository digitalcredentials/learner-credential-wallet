import { LinkingOptions } from '@react-navigation/native';
import { Linking } from 'react-native';
import { RootNavigationParamsList } from '../navigation';
import { encodeQueryParams } from './encode';
import { onShareIntent } from './shareIntent';

function onDeepLink(url: string): void {
  if (url.includes('ReceiveSharingIntent')) {
    onShareIntent();
  }
}

function transformDeepLink(url: string): string {
  return encodeQueryParams(url);
}

/**
 * In order to support OAuth redirects, the Android intent filter was set
 * specific to the scheme `dccrequest` and path `request`. If new paths are
 * added here, they must also be added to `android/app/src/main/AndroidManifest.xml`.
 */
export const deepLinkConfig: LinkingOptions<RootNavigationParamsList> = {
  prefixes: ['dccrequest://', 'org.dcconsortium://'],
  config: {
    screens: {
      AcceptCredentialsNavigation: {
        screens: {
          ChooseProfileScreen: 'request',
        },
      },
    },
  },
  subscribe: (listener: (url: string) => void) => {
    const onReceiveURL = ({ url }: { url: string }) => {
      onDeepLink(url);
      return listener(transformDeepLink(url));
    };

    const subscription = Linking.addEventListener('url', onReceiveURL);
    return () => subscription.remove();
  },
  getInitialURL: async () => {
    const url = await Linking.getInitialURL();
    if (url !== null) {
      onDeepLink(url);
      return transformDeepLink(url);  
    }
  },
};
