import React from 'react';
import { View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';

import { mixins } from '../../styles';
import { CredentialItem, NavHeader } from '../../components';
import styles from './PresentationPreviewScreen.styles';
import type { PresentationPreviewScreenProps } from '../../navigation';
import type { RenderItemProps } from './PresentationPreviewScreen.d';
import { useShareCredentials } from '../../hooks';

export default function PresentationPreviewScreen({
  navigation,
  route,
}: PresentationPreviewScreenProps): JSX.Element {
  const { selectedCredentials } = route.params;
  const share = useShareCredentials();

  function renderItem({ item }: RenderItemProps) {
    const { credential } = item;
    const { credentialSubject, issuer } = credential;
    const title = credentialSubject.hasCredential?.name ?? '';
    const subtitle =
      typeof issuer !== 'string' && issuer.name !== undefined
        ? issuer.name
        : '';
    const onSelect = () => navigation.navigate('CredentialScreen', { rawCredentialRecord: item });
    const image = null; // TODO: Decide where to pull image from.

    return (
      <CredentialItem
        title={title}
        subtitle={subtitle}
        image={image}
        onSelect={onSelect}
      />
    );
  }

  return (
    <>
      <NavHeader
        title="Share Preview"
        goBack={() => navigation.navigate('ShareHomeScreen')}
      />
      <View style={styles.container}>
        <FlatList
          style={styles.credentialList}
          data={selectedCredentials}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-${item.credential.id}`}
        />
        <Button
          title="Send"
          buttonStyle={mixins.buttonPrimary}
          titleStyle={mixins.buttonTitle}
          onPress={() => share(selectedCredentials)}
        />
      </View>
    </>
  );
}
