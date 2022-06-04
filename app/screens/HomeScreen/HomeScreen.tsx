import React, { useState } from 'react';
import { Text, View, FlatList, AccessibilityInfo } from 'react-native';
import { Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import Swipeable from 'react-native-swipeable';

import { WalletState } from '../../store/slices/wallet';
import { RootState } from '../../store';
import { CredentialItem, NavHeader, ConfirmModal } from '../../components';
import { theme, mixins } from '../../styles';
import { navigationRef } from '../../navigation';
import { CredentialRecord } from '../../model';
import { getAllCredentials } from '../../store/slices/wallet';

import styles from './HomeScreen.styles';
import { HomeScreenProps, RenderItemProps } from './HomeScreen.d';
import { CredentialRecordRaw } from '../../model';
import { useShareCredentials } from '../../hooks';

export default function HomeScreen({ navigation }: HomeScreenProps): JSX.Element {
  const { rawCredentialRecords } = useSelector<RootState, WalletState>(
    ({ wallet }) => wallet,
  );
  const [itemToDelete, setItemToDelete] = useState<CredentialRecordRaw|null>(null);
  const dispatch = useDispatch();
  const share = useShareCredentials();

  const itemToDeleteName = itemToDelete?.credential.credentialSubject.hasCredential?.name ??
    itemToDelete?.credential.credentialSubject.achievement ?? '';

  function renderItem({ item }: RenderItemProps) {
    const { credential } = item;
    const { issuer } = credential;

    let achievement = credential.credentialSubject.hasCredential ??
      credential.credentialSubject.achievement;
    if (Array.isArray(achievement)) {
      achievement = achievement[0];
    }

    const title = achievement?.name ?? '';
    const issuerName = (typeof issuer === 'string' ? issuer : issuer?.name) ?? '';
    const onSelect = () => navigation.navigate('CredentialScreen', { rawCredentialRecord: item });
    const issuerImage = typeof issuer === 'string' ? null : issuer.image;

    return (
      <Swipeable
        style={styles.swipeItem}
        leftButtons={[
          <Button
            key="share"
            buttonStyle={[styles.swipeButton, mixins.buttonPrimary]}
            containerStyle={mixins.buttonIconContainer}
            titleStyle={mixins.buttonIconTitle}
            style={styles.swipeButtonContainer}
            onPress={() => share([item])}
            iconRight
            icon={
              <MaterialIcons
                name="share"
                size={theme.iconSize}
                color={theme.color.backgroundPrimary}
              />
            }
          />,
        ]}
        rightButtons={[
          <Button
            key="delete"
            buttonStyle={[styles.swipeButton, mixins.buttonError]}
            containerStyle={mixins.buttonIconContainer}
            titleStyle={mixins.buttonIconTitle}
            onPress={() => setItemToDelete(item)}
            style={styles.swipeButtonContainer}
            icon={
              <MaterialIcons
                name="delete"
                size={theme.iconSize}
                color={theme.color.backgroundPrimary}
              />
            }
          />,
        ]}
      >
        <CredentialItem
          title={title}
          subtitle={issuerName}
          image={issuerImage}
          onSelect={onSelect}
          chevron
        />
      </Swipeable>
    );
  }

  function goToCredentialAdd() {
    if (navigationRef.isReady()) {
      navigationRef.navigate('HomeNavigation', {
        screen: 'AddCredentialNavigation',
        params: {
          screen: 'AddScreen',
        },
      });
    }
  }

  function AddCredentialButton(): JSX.Element {
    return (
      <Button
        title="Add Credential"
        buttonStyle={mixins.buttonIcon}
        containerStyle={mixins.buttonIconContainer}
        titleStyle={mixins.buttonIconTitle}
        onPress={goToCredentialAdd}
        iconRight
        icon={
          <MaterialIcons
            name="add-circle"
            size={theme.iconSize}
            color={theme.color.iconInactive}
          />
        }
      />
    );
  }

  async function deleteItem() {
    if (itemToDelete === null) return;
    await CredentialRecord.deleteCredential(itemToDelete);
    dispatch(getAllCredentials());
    setItemToDelete(null);
    AccessibilityInfo.announceForAccessibility('Credential Deleted');
  }

  return (
    <>
      <NavHeader title="Home" />
      {rawCredentialRecords.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.header}>Looks like your wallet is empty.</Text>
          <AddCredentialButton />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={mixins.credentialListContainer}
          data={rawCredentialRecords}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-${item._id}`}
          ListHeaderComponent={<AddCredentialButton />}
        />
      )}
      <ConfirmModal
        open={itemToDelete !== null}
        onRequestClose={() => setItemToDelete(null)}
        onConfirm={deleteItem}
        title="Delete Credential"
        confirmText="Delete"
        accessibilityFocusContent
      >
        <Text style={styles.modalBodyText}>
          Are you sure you want to remove {itemToDeleteName} from your wallet?
        </Text>
      </ConfirmModal>
    </>
  );
}
