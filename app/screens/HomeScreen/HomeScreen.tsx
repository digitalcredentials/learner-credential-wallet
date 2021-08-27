import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { WalletState } from '../../store/slices/wallet';
import { RootState } from '../../store';
import CredentialItem from '../../components/CredentialItem/CredentialItem';
import mixins from '../../styles/mixins';
import theme from '../../styles/theme';
import { navigationRef } from '../../../App';

import styles from './HomeScreen.styles';
import { HomeScreenProps, RenderItemProps } from './HomeScreen.d';

export default function HomeScreen({ navigation }: HomeScreenProps): JSX.Element {
  const { credentials } = useSelector<RootState, WalletState>(
    ({ wallet }) => wallet,
  );

  function renderItem({ item }: RenderItemProps) {
    const title = item.credentialSubject.hasCredential?.name ?? '';
    const subtitle =
      typeof item.issuer !== 'string' && item.issuer.name !== undefined
        ? item.issuer.name
        : '';
    const onPress = () => navigation.navigate('CredentialScreen', { credential: item });
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

  function goToCredentialAdd() {
    if (navigationRef.isReady()) {
      navigationRef.navigate('AddCredentialNavigation', { screen: 'AddScreen' });
    }
  }

  function AddCredentialButton(): JSX.Element {
    return (
      <Button
        title="Add Credential"
        buttonStyle={mixins.buttonIcon}
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
      {credentials.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.header}>Looks like your wallet is empty.</Text>
          <AddCredentialButton />
        </View>
      ) : (
        <FlatList
          style={styles.container}
          data={credentials}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-${item.id}`}
          ListFooterComponent={<AddCredentialButton />}
        />
      )}
    </>
  );
}
