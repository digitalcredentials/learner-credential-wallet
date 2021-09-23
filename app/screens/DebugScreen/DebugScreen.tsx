import React, { useMemo } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Header, Button } from 'react-native-elements';

import { mixins } from '../../styles';

import styles from './DebugScreen.styles';
import { DebugScreenProps } from '../../navigation/HomeNavigation/HomeNavigation.d';

export default function DebugScreen({ navigation, route }: DebugScreenProps): JSX.Element {
  const { rawCredentialRecord } = route.params;
  const formattedCredential = useMemo(() => {
    return JSON.stringify(rawCredentialRecord.credential, null, 2);
  }, [rawCredentialRecord]);

  function goBack() {
    navigation.goBack();
  }

  function Exit(): JSX.Element {
    return (
      <Button onPress={goBack}>
        Exit
      </Button>
    );
  }

  return (
    <>
      <Header
        centerComponent={{ text: 'Home', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
        rightComponent={<Exit />}
      />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.paragraph}>Credential:</Text>
          <Text style={styles.codeBlock} selectable>
            {formattedCredential}
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
