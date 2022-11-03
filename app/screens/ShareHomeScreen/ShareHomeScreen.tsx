import React from 'react';
import { ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { NavHeader } from '../../components';

import dynamicStyleSheet from './ShareHomeScreen.styles';
import type { ShareHomeScreenProps } from '../../navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { useDynamicStyles } from '../../hooks';

export default function ShareHomeScreen({
  navigation,
}: ShareHomeScreenProps): JSX.Element {
  const { styles, theme, mixins } = useDynamicStyles(dynamicStyleSheet);

  return (
    <>
      <NavHeader title="Share" />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Button
          title="Create a public link"
          buttonStyle={mixins.buttonIcon}
          containerStyle={mixins.buttonIconContainer}
          titleStyle={mixins.buttonIconTitle}
          onPress={() => navigation.navigate('ShareSelectionScreen', { method: 'link' })}
          iconRight
          icon={
            <MaterialIcons
              // style={styles.actionIcon}
              name="link"
              size={theme.iconSize}
              color={theme.color.iconInactive}
            />
          }
        />
        <Text style={styles.paragraph}>
            Allows publicly sharing one credential at a time. (Beta)
        </Text>

        <Button
          title="Send a credential"
          buttonStyle={mixins.buttonIcon}
          containerStyle={[mixins.buttonIconContainer, styles.sendButton]}
          titleStyle={mixins.buttonIconTitle}
          onPress={() => navigation.navigate('ShareSelectionScreen', { method: 'send' })}
          iconRight
          icon={
            <MaterialIcons
              name="input"
              size={theme.iconSize}
              color={theme.color.iconInactive}
            />
          }
        />
        <Text style={styles.paragraph}>
            Allows sending one or more credentials
        </Text>
      </ScrollView>
    </>
  );
}
