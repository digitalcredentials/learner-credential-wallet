import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { WalletState } from '../../store/slices/wallet';
import { ConfirmModal, CredentialItem, NavHeader } from '../../components';
import { credentialRenderInfo } from '../../components/CredentialCard/CredentialCard';
import { mixins } from '../../styles';
import styles from './ShareSelectionScreen.styles';
import type { RenderItemProps } from './ShareSelectionScreen.d';
import type { ShareSelectionScreenProps } from '../../navigation';
import { CredentialRecordRaw } from '../../model';

export default function ShareSelectionScreen({
  navigation,
  route
}: ShareSelectionScreenProps): JSX.Element {
  const send = route.params.method === 'send';
  const [selected, setSelected] = useState<number[]>([]);
  const { rawCredentialRecords } = useSelector<RootState, WalletState>(
    ({ wallet }) => wallet,
  );
  const [singleSelectedCredential, setSingleSelectedCredential] = useState<CredentialRecordRaw | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  function renderShareItem({item}: RenderItemProps): JSX.Element {
    const { credential } = item;
    const { issuer } = credential;
    const { title } = credentialRenderInfo(credential);
    const issuerName = (typeof issuer === 'string' ? issuer : issuer?.name) ?? '';

    return (
      <CredentialItem
        title={title}
        subtitle={issuerName}
        onSelect={() => {
          setSingleSelectedCredential(item);
          setModalOpen(true);
        }}
        hideLeft
        chevron
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
        title="Send Selected Credentials"
        buttonStyle={styles.shareButton}
        titleStyle={mixins.buttonTitle}
        onPress={goToPreview}
      />
    );
  }

  return (
    <>
      <NavHeader
        title={send ? 'Send' : 'Create Public Link'}
        goBack={navigation.goBack}
      />
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {send ? (
            'Start by selecting which credential(s) you want to share.'
          ) : (
            'Select which credential you want to create a public link to.'
          )}
        </Text>
        <FlatList
          indicatorStyle="white"
          style={styles.credentialList}
          data={rawCredentialRecords}
          renderItem={send ? renderItem : renderShareItem}
          keyExtractor={(item, index) => `${index}-${item.credential.id}`}
        />
        <ShareButton />
      </View>
      <ConfirmModal
        open={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        onConfirm={() => navigation.navigate('PublicLinkScreen', { rawCredentialRecord: singleSelectedCredential as CredentialRecordRaw })}
        confirmText="Create Link"
        title="Are you sure?"
      >
        <Text style={styles.modalText}>Creating a public link will allow anyone with the link to view the credential.</Text>
      </ConfirmModal>
    </>
  );
}
