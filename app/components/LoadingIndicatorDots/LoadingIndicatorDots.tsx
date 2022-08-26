import React from 'react';
import { View } from 'react-native';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

import styles from './LoadingIndicatorDots.styles';

export default function LoadingIndicatorDots(): JSX.Element {
  return (
    <View style={styles.loadingContainer}>
      <AnimatedEllipsis style={styles.loadingDots} minOpacity={0.4} animationDelay={200}/>
    </View>
  );
}