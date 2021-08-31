import React from 'react';
import { View, FlatList } from 'react-native';
import { Header, Button } from 'react-native-elements';

import { mixins } from '../../styles';
import { CredentialItem } from '../../components';
import styles from './PresentationPreviewScreen.styles';
import type { PresentationPreviewScreenProps } from '../../navigation';
import type { RenderItemProps } from './PresentationPreviewScreen.d';

export default function PresentationPreviewScreen({
  navigation,
  route,
}: PresentationPreviewScreenProps): JSX.Element {
  const { selectedCredentials } = route.params;

  function renderItem({ item }: RenderItemProps) {
    const title = item.credentialSubject.hasCredential?.name ?? '';
    const subtitle =
      typeof item.issuer !== 'string' && item.issuer.name !== undefined
        ? item.issuer.name
        : '';
    const onSelect = () => navigation.navigate('CredentialScreen', { credential: item });
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
      <Header
        centerComponent={{ text: 'Share Preview', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
      />
      <View style={styles.container}>
        <FlatList
          style={styles.credentialList}
          data={selectedCredentials}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-${item.id}`}
        />
        <Button
          title="Share Selected Credentials"
          buttonStyle={mixins.buttonPrimary}
          titleStyle={mixins.buttonTitle}
          onPress={() => console.log('next')}
        />
      </View>
    </>
  );
}
