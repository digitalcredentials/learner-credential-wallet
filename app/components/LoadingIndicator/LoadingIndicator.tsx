import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, Easing } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Svg, Circle, Path } from 'react-native-svg';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import theme from '../../styles/theme';
import styles from './LoadingIndicator.styles';
import useAnimation from '../../hooks/useAnimation';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default ({ loading = false }) => {
  const [percent, setPercent] = useState(25);
  const [color, setColor] = useState(theme.color.textHeader);

  const [rotateAnim, rotateValue] = useAnimation(['0deg', '360deg'], {
    duration: 1000,
  });
  const [pathAnim, pathValue] = useAnimation([35, 0], {
    duration: 300,
    easing: Easing.in(Easing.ease),
  });

  useEffect(() => {
    if (loading) {
      setPercent(25);
      rotateAnim.reset();
      Animated.loop(rotateAnim).start();
      pathAnim.reset();
    } else {
      setPercent(100);
      rotateAnim.stop();
      pathAnim.start();
    }
    return () => {
      rotateAnim.stop();
      pathAnim.stop();
    };
  }, [loading]);

  return (
    <View>
      <Animated.View style={{ transform: [{ rotate: rotateValue }] }}>
        <AnimatedCircularProgress
          size={100}
          width={4}
          fill={percent}
          tintColor={loading ? theme.color.textHeader : theme.color.success}
          backgroundColor={theme.color.backgroundSecondary}
          lineCap="round"
        />
      </Animated.View>
      <View style={styles.checkmarkContainer}>
        <Svg width="52" height="40">
          <AnimatedPath
            stroke={theme.color.success}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            scale="2"
            strokeDashoffset={pathValue}
            strokeDasharray="35"
            d="M1 11.2l7.1 7.2 16.7-16.8"
          />
        </Svg>
      </View>
    </View>
  );
};
