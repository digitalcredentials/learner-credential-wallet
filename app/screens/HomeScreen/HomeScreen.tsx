import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { WalletState } from '../../store/slices/wallet';
import { RootState } from '../../store';
import CredentialItem from '../../components/CredentialItem/CredentialItem';
import mixins from '../../styles/mixins';
import theme from '../../styles/theme';

import styles from './HomeScreen.style';
import { RenderItemProps } from './HomeScreen.d';

export default function HomeScreen(): JSX.Element {
  const { credentials } = useSelector<RootState, WalletState>(
    ({ wallet }) => wallet,
  );

  function renderItem({ item }: RenderItemProps) {
    const title = item.credentialSubject.hasCredential?.name ?? '';
    const subtitle =
      typeof item.issuer !== 'string' && item.issuer.name !== undefined
        ? item.issuer.name
        : '';
    const onPress = () => void null;
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
        centerComponent={{ text: 'My Wallet', style: mixins.headerText }}
        containerStyle={mixins.headerContainer}
      />
      {credentials.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.header}>Looks like your wallet is empty.</Text>
          <Text style={styles.paragraph}>
            To add credentials, follow an approved link from an issuer (most
            often a University) or use the options below.
          </Text>
          <Button
            title="Scan QR code"
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            iconRight
            icon={
              <MaterialIcons
                name="qr-code-scanner"
                size={theme.iconSize}
                color={theme.color.iconInactive}
              />
            }
          />
          <Button
            title="Restore from a file"
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            iconRight
            icon={
              <MaterialCommunityIcons
                name="file-upload"
                size={theme.iconSize}
                color={theme.color.iconInactive}
              />
            }
          />
        </View>
      ) : (
        <FlatList
          style={styles.container}
          data={credentials}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-{item.id}`}
          ListFooterComponent={
            <Button
              title="Add Credential"
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
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
