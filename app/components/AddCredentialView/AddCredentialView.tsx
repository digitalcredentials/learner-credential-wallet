import React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import theme from '../../styles/theme';
import mixins from '../../styles/mixins';
import styles from './AddCredentialView.style';

export interface AddCredentialViewProps {
  style?: StyleProp<ViewStyle>;
  goToQR: () => void;
  goToImport: () => void;
}

export default function AddCredentialView({ style, goToQR, goToImport }: AddCredentialViewProps): JSX.Element {
  return (
    <View style={style}>
      <Text style={styles.paragraph}>
        To add credentials, follow an approved link from an issuer (most often a
        University) or use the options below.
      </Text>
      <Button
        title="Scan QR code"
        buttonStyle={mixins.buttonIcon}
        titleStyle={mixins.buttonIconTitle}
        iconRight
        onPress={() => goToQR()}
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
        buttonStyle={mixins.buttonIcon}
        titleStyle={mixins.buttonIconTitle}
        iconRight
        onPress={() => goToImport()}
        icon={
          <MaterialCommunityIcons
            name="file-upload"
            size={theme.iconSize}
            color={theme.color.iconInactive}
          />
        }
      />
    </View>
  );
}
