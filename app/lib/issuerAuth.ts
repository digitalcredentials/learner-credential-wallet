import { Platform } from 'react-native';
import { generateIssuerAuthRegistry } from '@digitalcredentials/issuer-registry-client';

/** This check is necessary to narrow the type of `PlatformOS` */
if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
  throw new Error('This application is only supported on Android and iOS');
}

export const issuerAuthRegistry = generateIssuerAuthRegistry({ platform: Platform.OS });
