import React, { useEffect, useState } from 'react';
import { View, ScrollView, Linking } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import { ConfirmModal, NavHeader } from '../../components';
import { ShareCredentialScreenProps } from '../../navigation';
import styles from './ShareCredentialScreen.styles';
import { mixins, theme } from '../../styles';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useShareCredentials } from '../../hooks';
import { Cache, CacheKey } from '../../lib/cache';
import { IssuerObject } from '../../types/credential';
import moment from 'moment';

export default function ShareCredentialScreen({ navigation, route }: ShareCredentialScreenProps): JSX.Element {
  const { rawCredentialRecord } = route.params;
  const share = useShareCredentials();
  const [publicLink, setPublicLink] = useState<string | null>(null);
  const [justCreated, setJustCreated] = useState(false);
  const [linkedInConfirmModalOpen, setLinkedInConfirmModalOpen] = useState(false);
  const [createLinkConfirmModalOpen, setCreateLinkConfirmModalOpen] = useState(false);
  const hasPublicLink = publicLink !== null;

  async function createPublicLink() {
    // TODO go get the link from verifier +
    const link = 'https://web-verifier-plus.vercel.app/vc/1';

    // store link in cache for future use
    await Cache.getInstance().store(CacheKey.PublicLink, rawCredentialRecord.credential.id, link);
    setPublicLink(link);
    setJustCreated(true);
  }

  async function unshareLink() {
    await Cache.getInstance().remove(CacheKey.PublicLink, rawCredentialRecord.credential.id);
    setPublicLink(null);
    setJustCreated(false);
  }

  async function openLink () {
    if (hasPublicLink) {
      await Linking.canOpenURL(publicLink);
      Linking.openURL(publicLink);
    }
  }

  function copyToClipboard() {
    if (hasPublicLink) {
      Clipboard.setString(publicLink);
    }
  }

  async function loadShareUrl() {
    try {
      const url = await Cache.getInstance().load(CacheKey.PublicLink, rawCredentialRecord.credential.id) as string;
      console.log(url);
      setPublicLink(url);
    } catch(e) {
      console.log(e);
    }
  }

  async function shareToLinkedIn() {
    let achievement = rawCredentialRecord.credential.credentialSubject.hasCredential ??
      rawCredentialRecord.credential.credentialSubject.achievement;
    if (Array.isArray(achievement)) {
      achievement = achievement[0];
    }
    const title = achievement?.name ?? 'Verifiable Credential';

    const issuer = rawCredentialRecord.credential.issuer as IssuerObject;
    if (!achievement) {
      console.log('No achievement/credential found, not sharing to LI.');
      return;
    }
    const issuanceDate = moment(rawCredentialRecord.credential.issuanceDate);
    const organizationInfo = `&name=${title}&organizationName=${issuer.name}`;
    const issuance = `&issueYear=${issuanceDate.year()}&issueMonth=${issuanceDate.month()}`;
    let expiration = '';
    if (rawCredentialRecord.credential.expirationDate !== undefined) {
      const expirationDate = moment(rawCredentialRecord.credential.expirationDate);
      expiration = `&expirationYear=${expirationDate.year()}&expirationMonth=${expirationDate.month()}`;
    }
    let certUrl = '';
    if (publicLink) {
      certUrl = `&certUrl=${publicLink}`;
    }
    const url = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME${organizationInfo}${issuance}${expiration}${certUrl}`;

    await Linking.canOpenURL(url);
    Linking.openURL(url);
  }

  useEffect(() => {
    loadShareUrl();
  }, []);

  function LinkInstructions() {
    if (!publicLink) {
      return  (
        <Text style={styles.instructions}>
          Create a public link that anyone can use to view this credential, add to your LinkedIn profile, or send a json copy.
        </Text>
      );
    }
    if (justCreated) {
      return (
        <Text style={styles.instructions}>
          Public link created. Copy the link to share, add to your LinkedIn profile, or send a json copy.
        </Text>
      );
    }
    return  (
      <Text style={styles.instructions}>
        Public link already created. Copy the link to share, add to your LinkedIn profile, or send a json copy.
      </Text>
    );
  }

  return (
    <>
      <NavHeader
        title="Share Credential"
        goBack={() => navigation.goBack()}
      />

      <View style={styles.outerContainer}>
        <ScrollView
          style={styles.scrollContainer}
          accessible={false}
        >
          <View style={styles.container}>
            <LinkInstructions />
            {
              hasPublicLink ? (
                <View>
                  <View style={styles.link}>
                    <TextInput
                      style={{...mixins.input, ...styles.linkText}}
                      value={publicLink}
                      theme={{ colors: {
                        placeholder: theme.color.textPrimary,
                        text: theme.color.textPrimary,
                        disabled: theme.color.textPrimary
                      }}}
                      mode="outlined"
                      editable={false}
                    />
                    <Button
                      title="Copy"
                      buttonStyle={{...mixins.buttonPrimary, ...styles.copyButton}}
                      containerStyle={{...mixins.buttonContainer, ...styles.copyButtonContainer}}
                      titleStyle={mixins.buttonTitle}
                      onPress={copyToClipboard}
                    />
                  </View>
                  <View style={styles.actions}>
                    <Button
                      title="Unshare"
                      buttonStyle={{ ...mixins.buttonIcon, ...styles.actionButton }}
                      containerStyle={{...mixins.buttonContainer}}
                      titleStyle={mixins.buttonIconTitle}
                      onPress={unshareLink}
                      icon={
                        <MaterialIcons
                          style={styles.actionIcon}
                          name="link-off"
                          size={theme.iconSize}
                          color={theme.color.iconInactive}
                        />
                      }
                    />
                    <View style={styles.spacer} />
                    <Button
                      title="View Link"
                      buttonStyle={{...mixins.buttonIcon, ...styles.actionButton }}
                      containerStyle={mixins.buttonContainer}
                      titleStyle={mixins.buttonIconTitle}
                      onPress={openLink}
                      icon={
                        <MaterialIcons
                          style={styles.actionIcon}
                          name="launch"
                          size={theme.iconSize}
                          color={theme.color.iconInactive}
                        />
                      }
                    />
                  </View>
                </View>
              ) : (
                <Button
                  title="Create Public Link"
                  buttonStyle={{...mixins.buttonIcon, ...mixins.buttonPrimary }}
                  containerStyle={{...mixins.buttonIconContainer, ...styles.createLinkButtonContainer}}
                  titleStyle={mixins.buttonTitle}
                  iconRight
                  onPress={() => setCreateLinkConfirmModalOpen(true)}
                  icon={
                    <MaterialIcons
                      name="link"
                      size={theme.iconSize}
                      color={theme.color.textPrimaryDark}
                    />
                  }
                />
              )
            }
            <View style={styles.otherOptionsContainer}>
              <Button
                title="Add to LinkedIn Profile"
                buttonStyle={mixins.buttonIcon}
                containerStyle={mixins.buttonIconContainer}
                titleStyle={mixins.buttonIconTitle}
                iconRight
                onPress={() => setLinkedInConfirmModalOpen(true)}
                icon={
                  <Ionicons
                    name="logo-linkedin"
                    size={theme.iconSize}
                    color={theme.color.iconInactive}
                  />
                }
              />
              <Button
                title="Send Credential"
                buttonStyle={mixins.buttonIcon}
                containerStyle={mixins.buttonIconContainer}
                titleStyle={mixins.buttonIconTitle}
                iconRight
                onPress={() => share([rawCredentialRecord])}
                icon={
                  <MaterialIcons
                    name="input"
                    size={theme.iconSize}
                    color={theme.color.iconInactive}
                  />
                }
              />
              {hasPublicLink && (
                <View style={styles.bottomSection}>
                  <Text style={mixins.paragraphText}>
                    You may also share the public link by having another person scan this QR code.
                  </Text>
                  <View style={styles.qrCodeContainer}>
                    <View style={styles.qrCode}>
                      <QRCode value={publicLink} size={200}/>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      <ConfirmModal
        open={createLinkConfirmModalOpen}
        onRequestClose={() => setCreateLinkConfirmModalOpen(false)}
        cancelOnBackgroundPress
        onConfirm={createPublicLink}
        confirmText="Create Link"
        title="Are you sure?"
      >
        <Text style={mixins.modalBodyText}>Creating a public link will allow anyone with the link to view the credential.</Text>
      </ConfirmModal>
      <ConfirmModal
        open={linkedInConfirmModalOpen}
        onRequestClose={() => setLinkedInConfirmModalOpen(false)}
        cancelOnBackgroundPress
        onConfirm={shareToLinkedIn}
        confirmText="Add to LinkedIn"
        title="Are you sure?"
      >
        <Text style={mixins.modalBodyText}>
          {hasPublicLink 
            ? 'This will add the credential to your LinkedIn profile.'
            : 'This will add the credential to your LinkedIn profile and make it publicly visible.'
          }
        </Text>
      </ConfirmModal>
    </>
  );
}
