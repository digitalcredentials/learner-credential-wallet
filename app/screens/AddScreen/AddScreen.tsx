import React from 'react';
import { Header } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

import mixins from '../../styles/mixins';
import AddCredentialView from '../../components/AddCredentialView/AddCredentialView';
import QRScreen from '../QRScreen/QRScreen';
import ImportScreen from '../ImportScreen/ImportScreen';
import styles from './AddScreen.style';
import type { StackParamList, AddCredentialHomeProps } from './AddScreen.d';

const Stack = createStackNavigator<StackParamList>();

function AddCredentialHome({ navigation }: AddCredentialHomeProps): JSX.Element {
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

export default function AddScreen(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddCredentialHome" component={AddCredentialHome} />
      <Stack.Screen name="QRScreen" component={QRScreen} />
      <Stack.Screen name="ImportScreen" component={ImportScreen} />
    </Stack.Navigator>
  );
}
