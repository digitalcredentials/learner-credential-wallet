import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, Linking } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';

import { PublicLinkScreenProps } from './PublicLinkScreen.d';
import styles from './PublicLinkScreen.styles';
import { ConfirmModal, NavHeader } from '../../components';
import { mixins, theme } from '../../styles';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Cache, CacheKey } from '../../lib/cache';
import credential from '../../mock/credential';
import { shareToLinkedIn } from '../../lib/share';
import { useShareCredentials } from '../../hooks';

export enum PublicLinkScreenMode {
  Default,
  ShareCredential,
}

export default function PublicLinkScreen ({ navigation, route }: PublicLinkScreenProps): JSX.Element {
  const share = useShareCredentials();
  const { rawCredentialRecord, screenMode = PublicLinkScreenMode.Default } = route.params;
  const [publicLink, setPublicLink] = useState<string | null>(null);
  const [justCreated, setJustCreated] = useState(false);
  const [linkedInConfirmModalOpen, setLinkedInConfirmModalOpen] = useState(false);
  const [createLinkConfirmModalOpen, setCreateLinkConfirmModalOpen] = useState(false);

  const screenTitle = {
    [PublicLinkScreenMode.Default]: 'Public Link (Beta)',
    [PublicLinkScreenMode.ShareCredential]: 'Share Credential (Beta)',
  }[screenMode];

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

    if (screenMode === PublicLinkScreenMode.Default) {
      navigation.popToTop();
    }
  }

  async function openLink () {
    if (publicLink !== null) {
      await Linking.canOpenURL(publicLink);
      Linking.openURL(publicLink);
    }
  }

  function copyToClipboard() {
    if (publicLink !== null) {
      Clipboard.setString(publicLink);
    }
  }

  async function loadShareUrl() {
    try {
      const url = await Cache.getInstance().load(CacheKey.PublicLink, rawCredentialRecord.credential.id) as string;
      setPublicLink(url);
    } catch(e) {
      if ((e as Record<string, string>).name === 'NotFoundError') {
        if (screenMode === PublicLinkScreenMode.Default) {
          await createPublicLink();
        }
      } else {
        console.error(e);
      }
    }
  }


  async function _shareToLinkedIn() {
    if (publicLink === null) {
      await createPublicLink();
    }

    await shareToLinkedIn(rawCredentialRecord);
  }

  useEffect(() => {
    loadShareUrl();
  }, []);

  const instructionsText = useMemo(() => {
    switch (screenMode) {
    case PublicLinkScreenMode.Default:
      return 'Copy the link to share, or add to you LinkedIn profile.';
    case PublicLinkScreenMode.ShareCredential:
      if (!publicLink) return 'Create a public link that anyone can use to view this credential, add to your LinkedIn profile, or send a json copy.';
      if (justCreated) return 'Public link created. Copy the link to share, add to your LinkedIn profile, or send a json copy.';
      return 'Public link already created. Copy the link to share, add to your LinkedIn profile, or send a json copy.';
    }    
  }, [screenMode, publicLink, justCreated]);

  function LinkInstructions() {    
    return (
      <>
        {screenMode === PublicLinkScreenMode.Default && (
          <Text style={styles.title}>
            {credential.credentialSubject?.hasCredential?.name || 'Credential'}
          </Text>
        )}
        <Text style={styles.instructions}>{instructionsText}</Text>
      </>
    );
  }

  return (
    <>
      <NavHeader
        title={screenTitle}
        goBack={() => navigation.goBack()}
      />

      <View style={styles.outerContainer}>
        <ScrollView
          style={styles.scrollContainer}
          accessible={false}
        >
          <View style={styles.container}>
            <LinkInstructions />
            {publicLink !== null ? (
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
                onPress={_shareToLinkedIn}
                icon={
                  <Ionicons
                    name="logo-linkedin"
                    size={theme.iconSize}
                    color={theme.color.iconInactive}
                  />
                }
              />
              {screenMode === PublicLinkScreenMode.ShareCredential && (
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
              )}
              {publicLink !== null && (
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
        <Button
          buttonStyle={mixins.buttonClear}
          titleStyle={[mixins.buttonClearTitle, styles.modalLink]}
          containerStyle={mixins.buttonClearContainer}
          title="What does this mean?"
          onPress={() => Linking.openURL('https://lcw.app/faq.html#public-link')}
        />
      </ConfirmModal>
      <ConfirmModal
        open={linkedInConfirmModalOpen}
        onRequestClose={() => setLinkedInConfirmModalOpen(false)}
        cancelOnBackgroundPress
        onConfirm={() => shareToLinkedIn(rawCredentialRecord)}
        confirmText="Add to LinkedIn"
        title="Are you sure?"
      >
        <Text style={mixins.modalBodyText}>
          {publicLink !== null 
            ? 'This will add the credential to your LinkedIn profile.'
            : 'This will add the credential to your LinkedIn profile and make it publicly visible.'
          }
        </Text>
        <Button
          buttonStyle={mixins.buttonClear}
          titleStyle={[mixins.buttonClearTitle, styles.modalLink]}
          containerStyle={mixins.buttonClearContainer}
          title="What does this mean?"
          onPress={() => Linking.openURL('https://lcw.app/faq.html#add-to-linkedin')}
        />
      </ConfirmModal>
    </>
  );
}
