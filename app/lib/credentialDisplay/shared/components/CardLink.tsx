import React from 'react';
import { Linking, Text } from 'react-native';
import { useDynamicStyles } from '../../../../hooks';
import { createDynamicStyleSheet } from '../../../dynamicStyles';

type CardLinkProps = {
  url: string | null,
}

export default function CardLink({ url }: CardLinkProps): JSX.Element | null {
  const { styles } = useDynamicStyles(dynamicStyleSheet);

  if (url === null) {
    return null;
  }

  return (
    <Text
      style={styles.link}
      accessibilityRole="link"
      onPress={() => Linking.openURL(url)}
    >
      {url}
    </Text>
  );
}

const dynamicStyleSheet = createDynamicStyleSheet(({ theme }) => ({
  link: {
    fontFamily: theme.fontFamily.regular,
    color: theme.color.linkColor,
    textDecorationLine: 'underline',
  },
}));
