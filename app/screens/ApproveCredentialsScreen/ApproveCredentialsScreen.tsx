import React from 'react';
import { View, FlatList } from 'react-native';

import { CredentialItem } from '../../components';
import { NavHeader } from '../../components';
import { ApproveCredentialsScreenProps, RenderItemProps } from './ApproveCredentialsScreen.d';
import styles from './ApproveCredentialsScreen.styles';

export default function ApproveCredentialsScreen({ route, navigation }: ApproveCredentialsScreenProps): JSX.Element {
  const { rawCredentialRecords } = route.params;

  function renderItem({ item }: RenderItemProps) {
    const { credential } = item;
    const { credentialSubject, issuer } = credential;
    const title = credentialSubject.hasCredential?.name ?? '';
    const issuerName = (typeof issuer === 'string' ? '' : issuer?.name) ?? '';
    const onSelect = () => navigation.navigate('ApproveCredentialScreen', { rawCredentialRecord: item });
    const image = null; // TODO: Decide where to pull image from.

    return (
      <CredentialItem
        title={title}
        subtitle={issuerName}
        image={image}
        onSelect={onSelect}
      />
    );
  }

  return (
    <View>
      <NavHeader title="Available Credentials" goBack={() => navigation.goBack()} />
      <FlatList
        style={styles.approveCredentialContainer}
        data={rawCredentialRecords}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}-${item._id}`}
      />
    </View>
  );
}
