import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { VerificationCard } from '../../components';
import { CredentialCard } from '../../components';
import { mixins } from '../../styles';
import { deleteCredential } from '../../store/slices/wallet';
import { MenuItem, NavHeader, ConfirmModal } from '../../components';

import type { CredentialScreenProps } from './CredentialScreen.d';
import styles from './CredentialScreen.styles';

export default function CredentialScreen({ navigation, route }: CredentialScreenProps): JSX.Element {
  const dispatch = useDispatch();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { rawCredentialRecord, noShishKabob = false } = route.params;
  const { credential } = rawCredentialRecord;
  const { credentialSubject } = credential;
  const title = credentialSubject.hasCredential?.name ?? '';

  function HeaderRightComponent(): JSX.Element | null {
    if (noShishKabob) {
      return null;
    }

    return (
      <>
        <MaterialIcons
          name="more-vert"
          style={mixins.headerIcon}
          onPress={() => setMenuIsOpen(!menuIsOpen)}
        />
        {menuIsOpen ? (
          <View style={styles.menuContainer}>
            <MenuItem icon="share" title="Share" onPress={() => null} />
            <MenuItem icon="bug-report" title="Debug" onPress={() => null} />
            <MenuItem icon="delete" title="Delete" onPress={() => {
              setMenuIsOpen(false);
              setModalIsOpen(true);
            }}/>
          </View>
        ) : null}
      </>
    );
  }

  return (
    <>
      <NavHeader
        title="Credential Preview"
        goBack={() => navigation.goBack()}
        rightComponent={<HeaderRightComponent />}
      />
      <ConfirmModal
        open={modalIsOpen}
        onRequestClose={() => setModalIsOpen(!modalIsOpen)}
        onConfirm={() => {
          dispatch(deleteCredential(rawCredentialRecord));
          navigation.goBack();
        }}
        title="Delete Credential"
        confirmText="Delete"
      >
        <Text style={styles.modalBodyText}>
          Are you sure you want to remove {'\n'}
          {title} {'\n'}
          from your wallet?
        </Text>
      </ConfirmModal>
      <ScrollView onScrollEndDrag={() => setMenuIsOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setMenuIsOpen(false)}>
          <View style={styles.container}>
            <CredentialCard rawCredentialRecord={rawCredentialRecord} />
            <VerificationCard verified />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
}
