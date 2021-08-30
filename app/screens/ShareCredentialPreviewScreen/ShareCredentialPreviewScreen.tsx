import React from 'react';
import { View } from 'react-native';
import { Header, Text } from 'react-native-elements';

import { mixins } from '../../styles';
import styles from './ShareCredentialPreviewScreen.styles';

export default function ShareCredentialPreviewScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: 'Credential Preview', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
      />
      <Text>Credential Preview</Text>
    </View>
  );
}
