import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Image, ImageStyle, StyleProp, View } from 'react-native';
import { useDynamicStyles } from '../../../../hooks';
import { Color } from '../../../../styles';
import { createDynamicStyleSheet } from '../../../dynamicStyles';

type CardImageProps = {
  source: string | null,
  accessibilityLabel?: string | null,
  defaultIcon?: ComponentProps<typeof MaterialCommunityIcons>['name'];
  size?: number,
};

export default function CardImage({ source, accessibilityLabel, defaultIcon = 'certificate', size }: CardImageProps): JSX.Element | null {
  const { styles, theme } = useDynamicStyles(dynamicStyleSheet);
  
  if (size === undefined) {
    size = theme.issuerIconSize;
  }

  const containerStyle = { width: size, height: size };

  if (source === null) {
    return (
      <View style={[styles.imageContainer, containerStyle]}>
        <MaterialCommunityIcons
          name={defaultIcon}
          size={size}
          color={Color.Gray800}
        />
      </View>
    );
  }

  return (
    <View style={[styles.imageContainer, containerStyle]}>
      <Image
        source={{ uri: source }}
        style={styles.image as StyleProp<ImageStyle>}
        accessible={true}
        accessibilityLabel={accessibilityLabel || 'issuer'}
        accessibilityRole="image"
      />
    </View>
  );
}

const dynamicStyleSheet = createDynamicStyleSheet(({ theme }) => ({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    width: theme.issuerIconSize,
    height: theme.issuerIconSize,
    backgroundColor: Color.White, 
    borderRadius: 3,
    marginRight: 12,
    padding: 2,
  },
}));
