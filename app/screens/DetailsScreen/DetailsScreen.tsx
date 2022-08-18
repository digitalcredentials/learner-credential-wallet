import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavHeader } from '../../components';

import styles from './DetailsScreen.styles';
import { DetailsScreenProps } from './DetailsScreen.d';

export default function DetailsScreen({ navigation, route }: DetailsScreenProps): JSX.Element {
  const { header, details } = route.params;

  return (
    <>
      <NavHeader goBack={navigation.goBack} title={header} />
      <ScrollView style={styles.bodyContainer}>
        {Object.entries(details).map(([sectionTitle, items]) => (
          <View style={styles.sectionContainer} key={sectionTitle}>
            <Text style={styles.header}>{sectionTitle}</Text>
            {items.map((item, i) => (
              <Text key={`${i}-${item}`} style={styles.bulletItem}>
                ●  {item}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </>
  );
}