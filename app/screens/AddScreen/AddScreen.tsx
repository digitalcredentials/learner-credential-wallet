import React from 'react';
import { Header } from 'react-native-elements';

import mixins from '../../styles/mixins';
import AddCredentialView from '../../components/AddCredentialView/AddCredentialView';
import styles from './AddScreen.style';
import { AddScreenProps } from '../../navigation/AddCredentialNavigation/AddCredentialNavigation.d';

export default function AddScreen({ navigation }: AddScreenProps): JSX.Element {
  return (
    <>
      <Header
        centerComponent={{ text: 'Add Credential', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
      />
      <AddCredentialView
        style={styles.container}
        /* TODO: If we can turn this into a screen we don't have to pass these */
        goToQR={() => navigation.navigate('QRScreen')}
        goToImport={() => navigation.navigate('ImportScreen')}
      />
    </>
  );
}
