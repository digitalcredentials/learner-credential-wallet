import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Header, Text, Button } from 'react-native-elements';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { WalletState } from '../../store/slices/wallet';
import { CredentialItem } from '../../components';
import { mixins } from '../../styles';
import styles from './ShareHomeScreen.styles';
import type { RenderItemProps } from './ShareHomeScreen.d';
import type { ShareHomeScreenProps } from '../../navigation';

export default function ShareHomeScreen({
  navigation,
}: ShareHomeScreenProps): JSX.Element {
  const [selected, setSelected] = useState<number[]>([]);
  const { credentials } = useSelector<RootState, WalletState>(
    ({ wallet }) => wallet,
  );

  function toggle(credentialIndex: number): void {
    if (selected.includes(credentialIndex)) {
      setSelected(selected.filter(i => i !== credentialIndex));
    } else {
      setSelected([...selected, credentialIndex]);
    }
  }

  function renderItem({ item, index }: RenderItemProps): JSX.Element {
    const { credentialSubject, issuer } = item;
    const title = credentialSubject.hasCredential?.name ?? '';
    const subtitle =
      typeof issuer !== 'string' && issuer.name !== undefined
        ? issuer.name
        : '';

    return (
      <CredentialItem
        title={title}
        subtitle={subtitle}
        onSelect={() => toggle(index)}
        selected={selected.includes(index)}
        checkable
      />
    );
  }

  function goToPreview() {
    navigation.navigate('PresentationPreviewScreen', {
      selectedCredentials: selected.map(
        (index) => credentials[index],
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
        buttonStyle={mixins.buttonPrimary}
        titleStyle={mixins.buttonTitle}
        onPress={goToPreview}
      />
    );
  }

  return (
    <>
      <Header
        centerComponent={{ text: 'Share', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
      />
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Start by selecting which credential(s) you want to share.
        </Text>
        <FlatList
          style={styles.credentialList}
          data={credentials}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-${item.id}`}
        />
        <ShareButton />
      </View>
    </>
  );
}
