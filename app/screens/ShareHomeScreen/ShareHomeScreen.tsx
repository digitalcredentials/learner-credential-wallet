import React, { useState, useEffect } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { WalletState } from '../../store/slices/wallet';
import { CredentialItem, NavHeader } from '../../components';
import { credentialRenderInfo } from '../../components/CredentialCard/CredentialCard';
import { mixins, theme } from '../../styles';
import styles from './ShareHomeScreen.styles';
import type { RenderItemProps } from './ShareHomeScreen';
import type { ShareHomeScreenProps } from '../../navigation';
import { MaterialIcons } from '@expo/vector-icons';

export default function ShareHomeScreen({
  navigation,
}: ShareHomeScreenProps): JSX.Element {

  return (
    <>
      <NavHeader title="Share" />
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <Button
            title="Create a public link"
            buttonStyle={{ ...mixins.buttonIcon }}
            containerStyle={{...mixins.buttonContainer}}
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
            buttonStyle={{ ...mixins.buttonIcon, ...styles.sendButton }}
            containerStyle={{...mixins.buttonContainer}}
            titleStyle={mixins.buttonIconTitle}
            onPress={() => navigation.navigate('ShareSelectionScreen', { method: 'send' })}
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
            Allows sending one or more credentials
          </Text>
        </ScrollView>
      </View>
    </>
  );
}
