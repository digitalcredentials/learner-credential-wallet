import React from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';

import mixins from '../../styles/mixins';
import AddCredentialView from '../../components/AddCredentialView/AddCredentialView';
import styles from './AddScreen.style';

export default function AddScreen(): JSX.Element {
  return (
    <>
      <Header
        centerComponent={{ text: 'Add Credential', style: mixins.headerText}}
        containerStyle={mixins.headerContainer}
      />
      <View style={styles.container}>
        <AddCredentialView />
      </View>
    </>
  );
}
