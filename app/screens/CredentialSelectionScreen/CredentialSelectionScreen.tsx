import React, { useMemo, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useSelector } from 'react-redux';

import { CredentialItem, NavHeader } from '../../components';
import dynamicStyleSheet from './CredentialSelectionScreen.styles';
import type { RenderItemProps } from './CredentialSelectionScreen.d';
import type { CredentialSelectionScreenProps } from '../../navigation';
import { selectRawCredentialRecords } from '../../store/slices/credential';
import { useDynamicStyles } from '../../hooks';

export default function CredentialSelectionScreen({
  navigation,
  route
}: CredentialSelectionScreenProps): JSX.Element {
  const { styles, mixins } = useDynamicStyles(dynamicStyleSheet);
  const { title, instructionText, onSelect, singleSelect, confirmModal } = route.params;

  const [selected, setSelected] = useState<number[]>([]);
  const rawCredentialRecords = useSelector(selectRawCredentialRecords);
  const [modalOpen, setModalOpen] = useState(false);

  const selectedCredentials = useMemo(() => selected.map((i) => rawCredentialRecords[i]), [selected, rawCredentialRecords]);
  const ConfirmModalComponent = useMemo(() => confirmModal, [confirmModal]);

  function toggleItem(credentialIndex: number): void {
    if (selected.includes(credentialIndex)) {
      setSelected(selected.filter(i => i !== credentialIndex));
    } else {
      setSelected([...selected, credentialIndex]);
    }
  }

  function renderItem({ item, index }: RenderItemProps): JSX.Element {
    const { credential } = item;
    
    const onSelectItem = () => {
      toggleItem(index);
      if (singleSelect) onFinishSelection();
    };

    return (
      <CredentialItem
        credential={credential}
        onSelect={onSelectItem}
        selected={selected.includes(index)}
        checkable={!singleSelect}
        hideLeft={singleSelect}
        chevron={singleSelect}
      />
    );
  }

  function onFinishSelection() {
    if (ConfirmModalComponent) {
      setModalOpen(true);
    } else {
      onConfirmSelection();
    }
  }

  function onConfirmSelection() {
    onSelect?.(selectedCredentials);
  }

  

  function ShareButton(): JSX.Element | null {
    if (selected.length === 0 || singleSelect) {
      return null;
    }

    return (
      <Button
        title="Send Selected Credentials"
        buttonStyle={styles.shareButton}
        titleStyle={mixins.buttonTitle}
        onPress={onFinishSelection}
      />
    );
  }

  return (
    <>
      <NavHeader
        title={title}
        goBack={navigation.goBack}
      />
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {instructionText}
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
      {ConfirmModalComponent && (
        <ConfirmModalComponent 
          open={modalOpen}
          onRequestClose={() => setModalOpen(false)} 
          onConfirm={onConfirmSelection}
          selectedCredentials={selectedCredentials}
        />
      )}
    </>
  );
}
