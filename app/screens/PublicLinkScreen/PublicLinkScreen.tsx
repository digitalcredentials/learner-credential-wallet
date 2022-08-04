import React, { useEffect, useState } from 'react';
import { View, ScrollView, Linking } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import { NavHeader } from '../../components';
import { PublicLinkScreenProps } from '../../navigation';
import styles from './PublicLinkScreen.styles';
import { mixins, theme } from '../../styles';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Cache } from '../../lib/cache';
import { IssuerObject } from '../../types/credential';
import moment from 'moment';
import credential from '../../mock/credential';

export const PublicLinkScreen = ({ navigation, route }: PublicLinkScreenProps): JSX.Element => {
  const { rawCredentialRecord } = route.params;
  const [publicLink, setPublicLink] = useState<string | null>(null);

  async function createPublicLink() {
    // TODO go get the link from verifier +
    const link = 'https://web-verifier-plus.vercel.app/vc/1';

    // store link in cache for future use
    await Cache.getInstance().store('publiclink', rawCredentialRecord.credential.id, link);
    setPublicLink(link);
  }

  async function unshareLink() {
    await Cache.getInstance().remove('publiclink', rawCredentialRecord.credential.id);
    setPublicLink(null);
    navigation.popToTop();
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
      const url = await Cache.getInstance().load('publiclink', rawCredentialRecord.credential.id) as string;
      setPublicLink(url);
    } catch(e){
      if ((e as Record<string, string>).name === 'NotFoundError') {
        await createPublicLink();
      }
    }
  }

  async function shareToLinkedIn() {
    let achievement = rawCredentialRecord.credential?.credentialSubject?.hasCredential ??
      rawCredentialRecord.credential?.credentialSubject?.achievement;
    if (!achievement) {
      return;
    }
    if (Array.isArray(achievement)) {
      achievement = achievement[0];
    }
    const title = achievement?.name ?? '';
    const issuer = rawCredentialRecord.credential.issuer as IssuerObject;

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
    const certId = achievement.id ? `&certId=${achievement.id}` : '';
    const url = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME${organizationInfo}${issuance}${expiration}${certUrl}${certId}`;
    await Linking.canOpenURL(url);
    Linking.openURL(url);
  }

  useEffect(() => {
    loadShareUrl();
  }, []);

  function LinkInstructions() {
    return  (
      <>
        <Text style={styles.title}>
          {credential.credentialSubject?.hasCredential?.name || 'Credential'}
        </Text>
        <Text style={styles.instructions}>
          Copy the link to share, or add to you LinkedIn profile.
        </Text>
      </>
    );
  }
  if (publicLink === null) {
    return <></>;
  }

  return (
    <>
      <NavHeader
        title="Public Link"
        goBack={() => navigation.goBack()}
      />

      <View style={styles.outerContainer}>
        <ScrollView
          style={styles.scrollContainer}
          accessible={false}
        >
          <View style={styles.container}>
            <LinkInstructions />
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
              <View style={styles.bottomSection}>
                <Text style={mixins.paragraphText}>
                  You may also share the public link by having another person scan this QR code.
                </Text>
                <View style={styles.qrCodeContainer}>
                  <View style={styles.qrCode}>
                    <QRCode value={publicLink as string} size={200}/>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
