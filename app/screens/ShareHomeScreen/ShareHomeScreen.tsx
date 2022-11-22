import React, { useEffect } from 'react';
import { Linking, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import { LoadingIndicatorDots, NavHeader } from '../../components';
import dynamicStyleSheet from './ShareHomeScreen.styles';
import { ShareHomeScreenProps } from '../../navigation';
import { useDynamicStyles } from '../../hooks';
import { queryParamsFrom } from '../../lib/decode';
import { isShareRequestParams, performShareRequest, ShareRequestParams } from '../../lib/shareRequest';
import { HumanReadableError } from '../../lib/error';
import { fmtCredentialCount } from '../../lib/text';
import { registryCollections } from '../../lib/registry';
import { NavigationUtil } from '../../lib/navigationUtil';
import { displayGlobalModal } from '../../lib/globalModal';

export default function ShareHomeScreen({ navigation, route }: ShareHomeScreenProps): JSX.Element {
  const { styles, theme, mixins } = useDynamicStyles(dynamicStyleSheet);
  const { shareRequestParams } = route.params || {};

  useEffect(() => {
    if (isShareRequestParams(shareRequestParams)) {
      startShareRequest(shareRequestParams);
    }
  }, [shareRequestParams]);

  async function startShareRequest(params: ShareRequestParams) {
    const issuerName = issuerNameFor(params.client_id);

    const confirmedShare = await displayGlobalModal({
      title: 'Share Credentials?',
      confirmText: 'Continue',
      body: (
        <Text style={mixins.modalBodyText}>
          <Text style={[mixins.modalBodyText, mixins.boldText]}>
            {issuerName}
          </Text>{' '}
          is requesting you share credentials. If you trust this requester,
          continue to select the credentials to share.
        </Text>
      ),
    });
    if (!confirmedShare) return goToShareHome();

    const rawCredentialRecords = await NavigationUtil.selectCredentials({
      title: 'Share Credentials',
      instructionText: `Select the credential(s) you want to share with ${issuerName}.`,
      goBack: goToShareHome,
    });
    const rawProfileRecord = await NavigationUtil.selectProfile({
      instructionText: 'Select a profile to associate with the credential(s).',
      goBack: goToShareHome,
    });

    const confirmedSelection = await displayGlobalModal({
      title: 'Are You Sure?',
      confirmText: 'Share',
      body: (
        <Text style={mixins.modalBodyText}>
          You will be sharing {fmtCredentialCount(rawCredentialRecords.length)}{' '}
          with{' '}
          <Text style={[mixins.modalBodyText, mixins.boldText]}>
            {issuerName}
          </Text>
          .
        </Text>
      ),
    });
    if (!confirmedSelection) return goToShareHome();

    try {
      displayGlobalModal({
        title: 'Sharing Credentials',
        confirmButton: false,
        cancelButton: false,
        body: <LoadingIndicatorDots />,
      });

      await performShareRequest(params, rawCredentialRecords, rawProfileRecord);
      await displayGlobalModal({
        title: 'Share Successful',
        confirmText: 'Done',
        body: (
          <Text style={mixins.modalBodyText}>
            You have successfully shared{' '}
            {fmtCredentialCount(rawCredentialRecords.length)} with{' '}
            <Text style={[mixins.modalBodyText, mixins.boldText]}>
              {issuerName}
            </Text>
            .
          </Text>
        ),
      });
    } catch (err) {
      console.error(err);
      await displayGlobalModal({
        title: 'Share Failed',
        confirmText: 'Done',
        body: (
          <Text style={mixins.modalBodyText}>
            There was an error sharing credentials with{' '}
            <Text style={[mixins.modalBodyText, mixins.boldText]}>
              {issuerName}
            </Text>
            .
          </Text>
        ),
      });
    }

    goToShareHome();
  }

  async function goToSendSelect() {
    const selectedCredentials = await NavigationUtil.selectCredentials({
      title: 'Send Credentials',
      instructionText: 'Start by selecting which credential(s) you want to share.',
    });

    navigation.navigate('PresentationPreviewScreen', { selectedCredentials });
  }

  async function goToLinkSelect(): Promise<void> {
    const [rawCredentialRecord] = await NavigationUtil.selectCredentials({
      title: 'Create Public Link (Beta)',
      instructionText: 'Select which credential you want to create a public link to.',
      singleSelect: true,
    });

    const confirmedShare = await displayGlobalModal({
      title: 'Are you sure?',
      confirmText: 'Create Link',
      body: (
        <>
          <Text style={mixins.modalBodyText}>Creating a public link will allow anyone with the link to view the credential.</Text>
          <Button
            buttonStyle={mixins.buttonClear}
            titleStyle={[mixins.buttonClearTitle, mixins.modalLinkText]}
            containerStyle={mixins.buttonClearContainer}
            title="What does this mean?"
            onPress={() => Linking.openURL('https://lcw.app/faq.html#public-link')}
          />
        </>
      ),
    });

    if (!confirmedShare) return goToShareHome();
    navigation.navigate('PublicLinkScreen', { rawCredentialRecord });
  }

  async function scanShareRequestQRCode() {
    const text = await NavigationUtil.scanQRCode({ instructionText: 'Scan a share QR code to continue.' });
    const params = queryParamsFrom(text);

    if (!isShareRequestParams(params)) {
      throw new HumanReadableError('Invalid QR code. Make sure you are scanning a share request QR code.');
    }

    startShareRequest(params);
  }

  function goToShareHome() {
    navigation.navigate('ShareHomeScreen');
  }

  return (
    <>
      <NavHeader title="Share" />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Button
          title="Create a public link"
          buttonStyle={mixins.buttonIcon}
          containerStyle={mixins.buttonIconContainer}
          titleStyle={mixins.buttonIconTitle}
          onPress={goToLinkSelect}
          iconRight
          icon={
            <MaterialIcons
              name="link"
              size={theme.iconSize}
              color={theme.color.textSecondary}
            />
          }
        />
        <Text style={styles.paragraph}>
            Allows publicly sharing one credential at a time. (Beta)
        </Text>
        <Button
          title="Send a credential"
          buttonStyle={mixins.buttonIcon}
          containerStyle={[mixins.buttonIconContainer, styles.sendButton]}
          titleStyle={mixins.buttonIconTitle}
          onPress={goToSendSelect}
          iconRight
          icon={
            <MaterialIcons
              name="input"
              size={theme.iconSize}
              color={theme.color.textSecondary}
            />
          }
        />
        <Text style={styles.paragraph}>
            Allows sending one or more credentials
        </Text>
        <Button
          title="Scan a shared QR code"
          buttonStyle={mixins.buttonIcon}
          containerStyle={[mixins.buttonIconContainer, styles.sendButton]}
          titleStyle={mixins.buttonIconTitle}
          onPress={scanShareRequestQRCode}
          iconRight
          icon={
            <MaterialIcons
              name="qr-code-scanner"
              size={theme.iconSize}
              color={theme.color.textSecondary}
            />
          }
        />
      </ScrollView>
    </>
  );
}

function issuerNameFor(did: string) {
  return registryCollections.issuerDid.registriesFor(did)[0].entryFor(did).name;
}
