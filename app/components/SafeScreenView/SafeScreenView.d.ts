import React from 'react';
import { NativeSafeAreaViewProps } from 'react-native-safe-area-context';

export interface SafeScreenViewProps extends NativeSafeAreaViewProps {
  children: React.ReactNode;
}
