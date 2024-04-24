import { Linking } from 'react-native';
import { LinkConfig } from '../config';

export async function registerWallet(): void {
  Linking.openURL(LinkConfig.registerWalletUrl);

  // Issue a warning in case canOpenURL() is reporting as false
  // See RN issue #32311 however -- this can be a false signal.
  if(!(await Linking.canOpenURL(LinkConfig.registerWalletUrl))) {
    console.log(`WARNING: Opening browser to register wallet, Linking.canOpenURL(${LinkConfig.registerWalletUrl}) is reporting 'false'.`)
  }
}
