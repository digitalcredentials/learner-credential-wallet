import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import { navigationRef } from '../../navigation';
import { RootState } from '../../store';
import { PendingCredential } from '../../store/slices/credentialFoyer';
import { CredentialItem, NavHeader } from '../../components';
import { credentialRenderInfo } from '../../components/CredentialCard/CredentialCard';
import { ApprovalControls } from '../../components';
import { ApproveCredentialsScreenProps, RenderItemProps } from './ApproveCredentialsScreen.d';
import styles from './ApproveCredentialsScreen.styles';

export default function ApproveCredentialsScreen({ navigation, route }: ApproveCredentialsScreenProps): JSX.Element {
  const { profile } = route.params;
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

  const ListHeader = (
    <View style={styles.listHeader}>
      <Text style={styles.profileText}><Text style={styles.profileTextBold}>Adding To Profile:</Text> {profile.name}</Text>
    </View>
  );

  function renderItem({ item: pendingCredential }: RenderItemProps) {
    const { credential } = pendingCredential;
    const { issuer } = credential;
    const { title } = credentialRenderInfo(credential);
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
        style={styles.container}
        ListHeaderComponent={ListHeader}
        data={pendingCredentials}
        renderItem={renderItem}
        keyExtractor={(_, index) => `credential-${index}`}
      />
    </>
  );
}
