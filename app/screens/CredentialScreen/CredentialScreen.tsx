import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableWithoutFeedback, Linking } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { theme, mixins } from '../../styles';
import { deleteCredential } from '../../store/slices/wallet';
import { MenuItem, NavHeader, ConfirmModal } from '../../components';

import type { CredentialScreenProps } from './CredentialScreen.d';
import styles from './CredentialScreen.styles';

const NO_URL = 'None';

export default function CredentialScreen({ navigation, route }: CredentialScreenProps): JSX.Element {
  const dispatch = useDispatch();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { rawCredentialRecord, noShishKabob = false } = route.params;
  const { credential } = rawCredentialRecord;
  const { issuer, credentialSubject, issuanceDate } = credential;

  const title = credentialSubject.hasCredential?.name ?? '';
  const description = credentialSubject.hasCredential?.description ?? '';
  const formattedIssuanceDate = moment(issuanceDate).format('MMM D, YYYY');
  const subjectName = credentialSubject.name;
  const numberOfCredits = credentialSubject.hasCredential?.awardedOnCompletionOf?.numberOfCredits?.value ?? '';
  const startDate = credentialSubject.hasCredential?.awardedOnCompletionOf?.startDate ?? '';
  const endDate = credentialSubject.hasCredential?.awardedOnCompletionOf?.endDate ?? '';
  const issuerName = (typeof issuer === 'string' ? issuer : issuer?.name) ?? '';
  const issuerUrl = (typeof issuer === 'string' ? null : issuer?.url) ?? NO_URL;
  const issuerImage = typeof issuer === 'string' ? null : issuer?.image;

  const verified = true; // TODO: Add logic for verifying credential.

  function IssuerLink(): JSX.Element {
    if (issuerUrl === NO_URL) {
      return <Text style={styles.dataValue}>{issuerUrl}</Text>;
    }

    return (
      <Text
        style={styles.link}
        onPress={() => Linking.openURL(issuerUrl)}
      >
        {issuerUrl}
      </Text>
    );
  }

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
            <View style={styles.credentialContainer}>
              <View style={styles.dataContainer}>
                <Text style={styles.header}>{title}</Text>
                <Text style={styles.dataLabel}>Issuer</Text>
                <View style={styles.flexRow}>
                  {issuerImage ? (
                    <Image source={{ uri: issuerImage }} style={styles.dataImage} />
                  ) : (
                    <View style={styles.dataImage}>
                      <MaterialCommunityIcons
                        name="certificate"
                        size={styles.dataImage.width}
                        color={theme.color.iconActive}
                      />
                    </View>
                  )}
                  <Text style={styles.dataValue}>{issuerName}</Text>
                </View>
              </View>
              <View style={styles.dataContainer}>
                <Text style={styles.dataLabel}>Issuer URL</Text>
                <IssuerLink />
              </View>
              <View style={styles.dataContainer}>
                <Text style={styles.dataLabel}>Issuance Date</Text>
                <Text style={styles.dataValue}>{formattedIssuanceDate}</Text>
              </View>
              <View style={styles.dataContainer}>
                <Text style={styles.dataLabel}>Subject Name</Text>
                <Text style={styles.dataValue}>{subjectName}</Text>
              </View>
              {numberOfCredits ? (
                <View style={styles.dataContainer}>
                  <Text style={styles.dataLabel}>Number of Credits</Text>
                  <Text style={styles.dataValue}>{numberOfCredits}</Text>
                </View>
              ) : null}
              <View style={styles.flexRow}>
                {startDate ? (
                  <View style={styles.dataContainer}>
                    <Text style={styles.dataLabel}>Start Date</Text>
                    <Text style={styles.dataValue}>{startDate}</Text>
                  </View>
                ) : null}
                {endDate ? (
                  <View style={styles.dataContainer}>
                    <Text style={styles.dataLabel}>End Date</Text>
                    <Text style={styles.dataValue}>{endDate}</Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.dataContainer}>
                <Text style={styles.dataLabel}>Description</Text>
                <Text style={styles.dataValue}>{description}</Text>
              </View>
            </View>
            {verified ? (
              <View style={[styles.flexRow, styles.proofContainer]}>
                <MaterialIcons
                  name="check-circle"
                  size={theme.iconSize}
                  color={theme.color.success}
                />
                <Text style={[styles.dataValue, styles.proofText]}>
                Credential Verified
                </Text>
              </View>
            ) : (
              <View style={[styles.flexRow, styles.proofContainer]}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={theme.iconSize}
                  color={theme.color.error}
                />
                <Text style={[styles.dataValue, styles.proofText]}>
                Invalid Credential
                </Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
}
