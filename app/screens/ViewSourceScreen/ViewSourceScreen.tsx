import React from 'react';
import { Text, ScrollView } from 'react-native';

import { NavHeader } from '../../components';
import dynamicStyleSheet from './ViewSourceScreen.styles';
import { ViewSourceScreenProps } from './ViewSourceScreen.d';
import { useDynamicStyles } from '../../hooks';

export default function ViewSourceScreen({ navigation, route }: ViewSourceScreenProps): JSX.Element {
  const { styles } = useDynamicStyles(dynamicStyleSheet);
  const { data } = route.params;

  return (
    <>
      <NavHeader title="View Source" goBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.codeBlock} selectable>
          {JSON.stringify(data, null, 2)}
        </Text>
      </ScrollView>
    </>
  );
}
