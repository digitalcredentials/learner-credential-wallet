import React from 'react';
import { useDispatch } from 'react-redux';
import { View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';

import { navigationRef } from '../../../App';
import { getAllCredentials } from '../../store/slices/wallet';
import type { Credential } from '../../types/credential';
import { CredentialRecord } from '../../model';
import { CredentialItem } from '../../components';
import { NavHeader, ApprovalControls } from '../../components';
import { ApproveCredentialsScreenProps, RenderItemProps } from './ApproveCredentialsScreen.d';
import styles from './ApproveCredentialsScreen.styles';

export default function ApproveCredentialsScreen({ route, navigation }: ApproveCredentialsScreenProps): JSX.Element {
  const dispatch = useDispatch();
  const { credentials } = route.params;

  async function add(credential: Credential): Promise<void> {
    await CredentialRecord.addCredential(CredentialRecord.rawFrom(credential));
    dispatch(getAllCredentials());
  }

  function goToHome() {
    if (navigationRef.isReady()) {
      navigationRef.navigate('CredentialNavigation', { screen: 'HomeScreen' });
    }
  }

  function Done(): JSX.Element {
    return (
      <Button
        buttonStyle={styles.doneButton}
        titleStyle={styles.doneButtonTitle}
        onPress={goToHome}
        title="Done"
      />
    );
  }

  function renderItem({ item: credential }: RenderItemProps) {
    const { credentialSubject, issuer } = credential;
    const title = credentialSubject.hasCredential?.name ?? '';
    const issuerName = (typeof issuer === 'string' ? '' : issuer?.name) ?? '';
    const onSelect = () => navigation.navigate('ApproveCredentialScreen', { credential });
    const image = null; // TODO: Decide where to pull image from.

    return (
      <CredentialItem
        title={title}
        subtitle={issuerName}
        image={image}
        onSelect={onSelect}
        bottomElement={<ApprovalControls add={() => add(credential)} />}
      />
    );
  }

  return (
    <View>
      <NavHeader
        title="Available Credentials"
        goBack={() => navigation.goBack()}
        rightComponent={<Done />}
      />
      <FlatList
        style={styles.approveCredentialContainer}
        data={credentials}
        renderItem={renderItem}
        keyExtractor={(_, index) => `credential-${index}`}
      />
    </View>
  );
}
