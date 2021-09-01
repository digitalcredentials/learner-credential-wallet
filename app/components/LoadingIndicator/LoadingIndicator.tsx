import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  withRepeat,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';

import theme from '../../styles/theme';
import styles from './LoadingIndicator.styles';
import type { LoadingIndicatorProps } from './LoadingIndicator.d';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function ({ loading }: LoadingIndicatorProps): JSX.Element {
  const [percent, setPercent] = useState(25);

  const rotate = useSharedValue(0);
  const path = useSharedValue(0);

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value * 360}deg` }],
  }));
  const animatedPathProps = useAnimatedProps(() => ({
    strokeDashoffset: (1 - path.value) * 35,
  }));

  useEffect(() => {
    if (loading) {
      setPercent(25);
      rotate.value = withRepeat(
        withTiming(1, {
          duration: 1000,
          easing: Easing.linear,
        }),
        -1,
      );
      path.value = 0;
    } else {
      setPercent(100);
      cancelAnimation(rotate);
      path.value = withTiming(1, {
        duration: 300,
        easing: Easing.in(Easing.ease),
      });
    }
  }, [loading]);

  return (
    <View>
      <Animated.View style={animatedCircleStyle}>
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
            animatedProps={animatedPathProps}
            stroke={theme.color.success}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            scale="2"
            strokeDasharray="35"
            d="M1 11.2l7.1 7.2 16.7-16.8"
          />
        </Svg>
      </View>
    </View>
  );
}
