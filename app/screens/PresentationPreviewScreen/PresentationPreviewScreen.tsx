import React from 'react';
import { View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';

import { CredentialItem, NavHeader } from '../../components';
import { credentialRenderInfo } from '../../components/CredentialCard/CredentialCard';
import dynamicStyleSheet from './PresentationPreviewScreen.styles';
import type { PresentationPreviewScreenProps } from '../../navigation';
import type { RenderItemProps } from './PresentationPreviewScreen.d';
import { useDynamicStyles, useShareCredentials } from '../../hooks';

export default function PresentationPreviewScreen({
  navigation,
  route,
}: PresentationPreviewScreenProps): JSX.Element {
  const { styles, mixins } = useDynamicStyles(dynamicStyleSheet);
  const { selectedCredentials } = route.params;
  const share = useShareCredentials();

  function renderItem({ item }: RenderItemProps) {
    const { credential } = item;
    const { issuer } = credential;
    const { title } = credentialRenderInfo(credential);
    const subtitle =
      typeof issuer !== 'string' && issuer.name !== undefined
        ? issuer.name
        : '';
    const onSelect = () => navigation.navigate('CredentialScreen', { rawCredentialRecord: item });
    const issuerImage = typeof issuer === 'string' ? null : issuer.image;

    return (
      <CredentialItem
        title={title}
        subtitle={subtitle}
        image={issuerImage}
        onSelect={onSelect}
        chevron
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
