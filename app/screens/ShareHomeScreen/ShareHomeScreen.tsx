import React from 'react';
import { Linking, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import { ConfirmModal, NavHeader } from '../../components';
import dynamicStyleSheet from './ShareHomeScreen.styles';
import { ShareHomeScreenProps } from '../../navigation';
import { useDynamicStyles } from '../../hooks';
import { CredentialSelectionConfirmModalProps } from '../../screens';

export default function ShareHomeScreen({ navigation }: ShareHomeScreenProps): JSX.Element {
  const { styles, theme, mixins } = useDynamicStyles(dynamicStyleSheet);

  function goToSendSelect() {
    navigation.navigate('CredentialSelectionScreen', {
      title: 'Send Credentials',
      instructionText: 'Start by selecting which credential(s) you want to share.',
      onSelect: (selectedCredentials) => navigation.navigate('PresentationPreviewScreen', { selectedCredentials }),
    });
  }

  function goToLinkSelect() {
    navigation.navigate('CredentialSelectionScreen', {
      title: 'Create Public Link (Beta)',
      instructionText: 'Select which credential you want to create a public link to.',
      confirmModal: PublicLinkConfirmModal,
      singleSelect: true,
      onSelect: ([rawCredentialRecord]) => navigation.navigate('PublicLinkScreen', { rawCredentialRecord }),
    });
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
      </ScrollView>
    </>
  );
}

function PublicLinkConfirmModal({ open, onRequestClose, onConfirm }: CredentialSelectionConfirmModalProps): JSX.Element {
  const { mixins } = useDynamicStyles();

  return (
    <ConfirmModal
      open={open}
      onRequestClose={onRequestClose}
      onConfirm={onConfirm}
      confirmText="Create Link"
      title="Are you sure?"
    >
      <Text style={mixins.modalBodyText}>Creating a public link will allow anyone with the link to view the credential.</Text>
      <Button
        buttonStyle={mixins.buttonClear}
        titleStyle={[mixins.buttonClearTitle, mixins.modalLinkText]}
        containerStyle={mixins.buttonClearContainer}
        title="What does this mean?"
        onPress={() => Linking.openURL('https://lcw.app/faq.html#public-link')}
      />
    </ConfirmModal>
  );
}
