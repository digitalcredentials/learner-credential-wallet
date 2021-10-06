import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { WalletState } from '../../store/slices/wallet';
import { RootState } from '../../store';
import { CredentialItem } from '../../components';
import { theme, mixins } from '../../styles';
import { navigationRef } from '../../../App';

import styles from './HomeScreen.styles';
import { HomeScreenProps, RenderItemProps } from './HomeScreen.d';

export default function HomeScreen({ navigation }: HomeScreenProps): JSX.Element {
  const { rawCredentialRecords } = useSelector<RootState, WalletState>(
    ({ wallet }) => wallet,
  );

  function renderItem({ item }: RenderItemProps) {
    const { credential } = item;
    const { issuer } = credential;
    const title = credential.credentialSubject.hasCredential?.name ?? '';
    const issuerName = (typeof issuer === 'string' ? issuer : issuer?.name) ?? '';
    const onSelect = () => navigation.navigate('CredentialScreen', { rawCredentialRecord: item });
    const issuerImage = typeof issuer === 'string' ? null : issuer.image;

    return (
      <CredentialItem
        title={title}
        subtitle={issuerName}
        image={issuerImage}
        onSelect={onSelect}
      />
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

  return (
    <>
      <Header
        centerComponent={{ text: 'Home', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
      />
      {rawCredentialRecords.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.header}>Looks like your wallet is empty.</Text>
          <AddCredentialButton />
        </View>
      ) : (
        <FlatList
          style={styles.container}
          data={rawCredentialRecords}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-${item._id}`}
          ListHeaderComponent={<AddCredentialButton />}
        />
      )}
    </>
  );
}
