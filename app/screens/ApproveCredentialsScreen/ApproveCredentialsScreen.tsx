import React from 'react';
import { useSelector } from 'react-redux';
import { View, FlatList } from 'react-native';
import { Button, Header } from 'react-native-elements';

import { mixins } from '../../styles';
import { navigationRef } from '../../../App';
import { RootState } from '../../store';
import { PendingCredential } from '../../store/slices/credentialFoyer';
import { CredentialItem } from '../../components';
import { ApprovalControls } from '../../components';
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
      />
    );
  }

  return (
    <View>
      <Header
        centerComponent={{ text: 'Available Credentials', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
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
