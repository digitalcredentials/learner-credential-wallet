import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import { Button } from 'react-native-elements';

import { navigationRef } from '../../navigation';
import { RootState } from '../../store';
import { PendingCredential } from '../../store/slices/credentialFoyer';
import { CredentialItem, NavHeader } from '../../components';
import { credentialRenderInfo } from '../../components/CredentialCard/CredentialCard';
import { ApprovalControls } from '../../components';
import { ApproveCredentialsScreenProps, RenderItemProps } from './ApproveCredentialsScreen.d';
import { mixins } from '../../styles';
import styles from './ApproveCredentialsScreen.styles';

export default function ApproveCredentialsScreen({ navigation }: ApproveCredentialsScreenProps): JSX.Element {
  const pendingCredentials = useSelector<RootState, PendingCredential[]>(
    ({ credentialFoyer }) => credentialFoyer.pendingCredentials,
  );

  function goToHome() {
    if (navigationRef.isReady()) {
      navigationRef.navigate('HomeNavigation', { 
        screen: 'CredentialNavigation',
        params: {
          screen: 'HomeScreen',
        }, 
      });
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
    const title = credentialRenderInfo(item).title;
    const issuerName = (typeof issuer === 'string' ? '' : issuer?.name) ?? '';
    const issuerImage = typeof issuer === 'string' ? null : issuer?.image;
    const onSelect = () => navigation.navigate(
      'ApproveCredentialScreen',
      {
        pendingCredentialId: pendingCredential.id,
      },
    );

    return (
      <CredentialItem
        title={title}
        subtitle={issuerName}
        image={issuerImage}
        onSelect={onSelect}
        bottomElement={<ApprovalControls pendingCredential={pendingCredential} />}
        chevron
      />
    );
  }

  return (
    <>
      <NavHeader 
        title="Available Credentials" 
        rightComponent={<Done />}
      />
      <FlatList
        contentContainerStyle={mixins.credentialListContainer}
        data={pendingCredentials}
        renderItem={renderItem}
        keyExtractor={(_, index) => `credential-${index}`}
      />
    </>
  );
}
