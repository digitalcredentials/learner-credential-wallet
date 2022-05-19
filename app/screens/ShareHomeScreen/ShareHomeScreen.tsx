import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { WalletState } from '../../store/slices/wallet';
import { CredentialItem, NavHeader } from '../../components';
import { credentialRenderInfo } from '../../components/CredentialCard/CredentialCard';
import { mixins } from '../../styles';
import styles from './ShareHomeScreen.styles';
import type { RenderItemProps } from './ShareHomeScreen.d';
import type { ShareHomeScreenProps } from '../../navigation';

export default function ShareHomeScreen({
  navigation,
}: ShareHomeScreenProps): JSX.Element {
  const [selected, setSelected] = useState<number[]>([]);
  const { rawCredentialRecords } = useSelector<RootState, WalletState>(
    ({ wallet }) => wallet,
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelected([]);
    });

    return unsubscribe;
  }, [navigation]);

  function toggle(credentialIndex: number): void {
    if (selected.includes(credentialIndex)) {
      setSelected(selected.filter(i => i !== credentialIndex));
    } else {
      setSelected([...selected, credentialIndex]);
    }
  }

  function renderItem({ item, index }: RenderItemProps): JSX.Element {
    const { credential } = item;
    const { issuer } = credential;
    const { title } = credentialRenderInfo(credential);
    const issuerName = (typeof issuer === 'string' ? issuer : issuer?.name) ?? '';

    return (
      <CredentialItem
        title={title}
        subtitle={issuerName}
        onSelect={() => toggle(index)}
        selected={selected.includes(index)}
        checkable
      />
    );
  }

  function goToPreview() {
    navigation.navigate('PresentationPreviewScreen', {
      selectedCredentials: selected.map(
        (index) => rawCredentialRecords[index],
      ),
    });
  }

  function ShareButton(): JSX.Element | null {
    if (selected.length === 0) {
      return null;
    }

    return (
      <Button
        title="Share Selected Credentials"
        buttonStyle={styles.shareButton}
        titleStyle={mixins.buttonTitle}
        onPress={goToPreview}
      />
    );
  }

  return (
    <>
      <NavHeader title="Share" />
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Start by selecting which credential(s) you want to share.
        </Text>
        <FlatList
          indicatorStyle="white"
          style={styles.credentialList}
          data={rawCredentialRecords}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-${item.credential.id}`}
        />
        <ShareButton />
      </View>
    </>
  );
}
