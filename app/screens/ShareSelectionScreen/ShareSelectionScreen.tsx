import React, { useState, useEffect } from 'react';
import { View, FlatList, Linking } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useSelector } from 'react-redux';

import { ConfirmModal, CredentialItem, NavHeader } from '../../components';
import dynamicStyleSheet from './ShareSelectionScreen.styles';
import type { RenderItemProps } from './ShareSelectionScreen.d';
import type { ShareSelectionScreenProps } from '../../navigation';
import { CredentialRecordRaw } from '../../model';
import { selectRawCredentialRecords } from '../../store/slices/credential';
import { useDynamicStyles } from '../../hooks';

export default function ShareSelectionScreen({
  navigation,
  route
}: ShareSelectionScreenProps): JSX.Element {
  const { styles, mixins } = useDynamicStyles(dynamicStyleSheet);

  const send = route.params.method === 'send';
  const [selected, setSelected] = useState<number[]>([]);
  const rawCredentialRecords = useSelector(selectRawCredentialRecords);
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

  function goToPublicLink() {
    if (singleSelectedCredential !== null) {
      navigation.navigate('PublicLinkScreen', { rawCredentialRecord: singleSelectedCredential });
    }
  }

  function renderItem({ item, index }: RenderItemProps): JSX.Element {
    const { credential } = item;

    return (
      <CredentialItem
        credential={credential}
        onSelect={() => toggle(index)}
        selected={selected.includes(index)}
        checkable
      />
    );
  }

  function renderShareItem({item}: RenderItemProps): JSX.Element {
    const { credential } = item;
    const onSelect = () => {
      setSingleSelectedCredential(item);
      setModalOpen(true);
    };

    return (
      <CredentialItem
        credential={credential}
        onSelect={onSelect}
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
        title={send ? 'Send' : 'Create Public Link (Beta)'}
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
        onConfirm={goToPublicLink}
        confirmText="Create Link"
        title="Are you sure?"
      >
        <Text style={styles.modalText}>Creating a public link will allow anyone with the link to view the credential.</Text>
        <Button
          buttonStyle={mixins.buttonClear}
          titleStyle={[mixins.buttonClearTitle, styles.modalLink]}
          containerStyle={mixins.buttonClearContainer}
          title="What does this mean?"
          onPress={() => Linking.openURL('https://lcw.app/faq.html#public-link')}
        />
      </ConfirmModal>
    </>
  );
}
