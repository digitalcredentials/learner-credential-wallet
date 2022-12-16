import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, ScrollView, Linking, TextInput as RNTextInput, Platform } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import OutsidePressHandler from 'react-native-outside-press';

import { PublicLinkScreenProps } from './PublicLinkScreen.d';
import dynamicStyleSheet from './PublicLinkScreen.styles';
import { ConfirmModal, NavHeader } from '../../components';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import credential from '../../mock/credential';
import { createPublicLinkFor, getPublicViewLink, linkedinUrlFrom, unshareCredential } from '../../lib/publicLink';
import { useDynamicStyles, useShareCredentials } from '../../hooks';
import { displayGlobalModal } from '../../lib/globalModal';

export enum PublicLinkScreenMode {
  Default,
  ShareCredential
}

export default function PublicLinkScreen ({ navigation, route }: PublicLinkScreenProps): JSX.Element {
  const { styles, mixins, theme } = useDynamicStyles(dynamicStyleSheet);

  const share = useShareCredentials();
  const { rawCredentialRecord, screenMode = PublicLinkScreenMode.Default } = route.params;
  const [publicLink, setPublicLink] = useState<string | null>(null);
  const [justCreated, setJustCreated] = useState(false);

  const inputRef = useRef<RNTextInput | null>(null);
  const disableOutsidePressHandler = inputRef.current?.isFocused() ?? false;
  const selectionColor = Platform.select({ ios: theme.color.brightAccent, android: theme.color.highlightAndroid });

  const screenTitle = {
    [PublicLinkScreenMode.Default]: 'Public Link (Beta)',
    [PublicLinkScreenMode.ShareCredential]: 'Share Credential (Beta)',
  }[screenMode];

  async function createPublicLink() {
    const publicLink = await createPublicLinkFor(rawCredentialRecord);

    setPublicLink(publicLink);
    setJustCreated(true);
  }

  async function confirmCreatePublicLink() {
    const confirmed = await displayGlobalModal({
      title: 'Are you sure?',
      confirmText: 'Create Link',
      body: (
        <>
          <Text style={mixins.modalBodyText}>Creating a public link will allow anyone with the link to view the credential.</Text>
          <Button
            buttonStyle={mixins.buttonClear}
            titleStyle={[mixins.buttonClearTitle, styles.modalLink]}
            containerStyle={mixins.buttonClearContainer}
            title="What does this mean?"
            onPress={() => Linking.openURL('https://lcw.app/faq.html#public-link')}
          />
        </>
      )
    });

    if (!confirmed) return;
    await createPublicLink();
  }

  async function unshareLink() {
    try {
      await unshareCredential(rawCredentialRecord);
    } catch (err) {
      console.log('Error unsharing credential:', err);
    }

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
    const url = await getPublicViewLink(rawCredentialRecord);
    if (url === null && screenMode === PublicLinkScreenMode.Default) {
      await createPublicLink();
    } else if (url !== null) {
      setPublicLink(url);
    }
  }

  async function shareToLinkedIn() {
    const confirmed = await displayGlobalModal({
      title: 'Are you sure?',
      confirmText: 'Add to LinkedIn',
      cancelOnBackgroundPress: true,
      body: (
        <>
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
        </>
      )
    });

    if (!confirmed) return;
    if (!publicLink) {
      await createPublicLink();
    }

    const url = await linkedinUrlFrom(rawCredentialRecord);
    await Linking.canOpenURL(url);
    Linking.openURL(url);
  }

  function onFocusInput() {
    inputRef.current?.setNativeProps({ selection: { start: 0, end: publicLink?.length } });
  }

  function blurInput() {
    inputRef.current?.blur();
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
                  <OutsidePressHandler
                    style={mixins.flex}
                    onOutsidePress={blurInput}
                    disabled={disableOutsidePressHandler}
                  >
                    <TextInput
                      ref={inputRef}
                      style={{...mixins.input, ...styles.linkText}}
                      value={publicLink}
                      selectionColor={selectionColor}
                      theme={{ colors: {
                        placeholder: theme.color.textPrimary,
                        text: theme.color.textPrimary,
                        disabled: theme.color.textPrimary,
                        primary: theme.color.brightAccent,
                      }}}
                      autoCorrect={false}
                      spellCheck={false}
                      mode="outlined"
                      onFocus={onFocusInput}
                      showSoftInputOnFocus={false}
                    />
                  </OutsidePressHandler>
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
                onPress={confirmCreatePublicLink}
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
                onPress={shareToLinkedIn}
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
    </>
  );
}
