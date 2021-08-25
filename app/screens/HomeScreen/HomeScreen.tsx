import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { WalletState } from '../../store/slices/wallet';
import { RootState } from '../../store';
import CredentialItem from '../../components/CredentialItem/CredentialItem';
import AddCredentialView from '../../components/AddCredentialView/AddCredentialView';
import mixins from '../../styles/mixins';
import theme from '../../styles/theme';
import { HomeScreenProps } from '../../navigation/CredentialNavigation/CredentialNavigation.d';

import styles from './HomeScreen.style';
import { RenderItemProps } from './HomeScreen.d';

export default function HomeScreen({ navigation }: HomeScreenProps): JSX.Element {
  const { credentialObjects } = useSelector<RootState, WalletState>(
    ({ wallet }) => wallet,
  );

  function renderItem({ item }: RenderItemProps) {
    const { credential } = item;
    const title = credential.credentialSubject.hasCredential?.name ?? '';
    const subtitle =
      typeof credential.issuer !== 'string' && credential.issuer.name !== undefined
        ? credential.issuer.name
        : '';
    const onPress = () => navigation.navigate('CredentialScreen', { credentialObject: item });
    const image = null; // TODO: Decide where to pull image from.

    return (
      <CredentialItem
        title={title}
        subtitle={subtitle}
        image={image}
        onPress={onPress}
      />
    );
  }

  return (
    <>
      <Header
        centerComponent={{ text: 'Home', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
      />
      {credentialObjects.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.header}>Looks like your wallet is empty.</Text>
          <AddCredentialView />
        </View>
      ) : (
        <FlatList
          style={styles.container}
          data={credentialObjects}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-{item.id}`}
          ListFooterComponent={
            <Button
              title="Add Credential"
              buttonStyle={mixins.buttonIcon}
              titleStyle={mixins.buttonIconTitle}
              iconRight
              icon={
                <MaterialIcons
                  name="add-circle"
                  size={theme.iconSize}
                  color={theme.color.iconInactive}
                />
              }
            />
          }
        />
      )}
    </>
  );
}
