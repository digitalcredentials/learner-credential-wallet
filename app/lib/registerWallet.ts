import {Linking} from 'react-native'

export function registerWallet() {
    Linking.canOpenURL('https://lcw.app/add-wallet').then(supported => {
      if (supported) {
        Linking.openURL('https://lcw.app/add-wallet');
      } else {
        console.log("Unable to register wallet! Failed URL");
      }
    });
}