import React from 'react';
import { View } from 'react-native';
import { Header, Text } from 'react-native-elements';

import { mixins } from '../../styles';
import styles from './PresentationPreviewScreen.styles';

export default function PresentationPreviewScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: 'Share Preview', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
      />
      <Text>Share Preview</Text>
    </View>
  );
}
