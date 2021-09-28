import React from 'react';
import { useSelector } from 'react-redux';
import { View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';

import { navigationRef } from '../../../App';
import { RootState } from '../../store';
import { PendingCredential } from '../../store/slices/credentialFoyer';
import { CredentialItem } from '../../components';
import { NavHeader, ApprovalControls } from '../../components';
import { ApproveCredentialsScreenProps, RenderItemProps } from './ApproveCredentialsScreen.d';
import styles from './ApproveCredentialsScreen.styles';

export default function ApproveCredentialsScreen({ navigation }: ApproveCredentialsScreenProps): JSX.Element {
  const pendingCredentials = useSelector<RootState, PendingCredential[]>(
    ({ credentialFoyer }) => credentialFoyer.pendingCredentials,
  );

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

  function renderItem({ item: pendingCredential }: RenderItemProps) {
    const { credential } = pendingCredential;
    const { credentialSubject, issuer } = credential;
    const title = credentialSubject.hasCredential?.name ?? '';
    const issuerName = (typeof issuer === 'string' ? '' : issuer?.name) ?? '';
    const onSelect = () => navigation.navigate('ApproveCredentialScreen', { pendingCredential });
    const image = null; // TODO: Decide where to pull image from.

    return (
      <CredentialItem
        title={title}
        subtitle={issuerName}
        image={image}
        onSelect={onSelect}
        bottomElement={<ApprovalControls pendingCredential={pendingCredential} />}
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
        data={pendingCredentials}
        renderItem={renderItem}
        keyExtractor={(_, index) => `credential-${index}`}
      />
    </View>
  );
}
