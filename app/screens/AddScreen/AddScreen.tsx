import React from 'react';
import { View } from 'react-native';
import { Header, Text, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import { theme, mixins } from '../../styles';
import styles from './AddScreen.styles';
import { AddScreenProps } from './AddScreen.d';

export default function AddScreen({ navigation }: AddScreenProps): JSX.Element {
  return (
    <>
      <Header
        centerComponent={{ text: 'Add Credential', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
      />
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          To add credentials, follow an approved link from an issuer (most often a
          University) or use the options below.
        </Text>
        <Button
          title="Scan QR code"
          buttonStyle={mixins.buttonIcon}
          containerStyle={mixins.buttonIconContainer}
          titleStyle={mixins.buttonIconTitle}
          iconRight
          onPress={() => navigation.navigate('QRScreen')}
          icon={
            <MaterialIcons
              name="qr-code-scanner"
              size={theme.iconSize}
              color={theme.color.iconInactive}
            />
          }
        />
      </View>
    </>
  );
}
