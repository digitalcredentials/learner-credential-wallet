import React, { useMemo } from 'react';
import { View, Text, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavHeader } from '../../components';

import styles from './IssuerInfoScreen.styles';
import { BulletListProps, IssuerInfoScreenProps } from './IssuerInfoScreen.d';
import { resolveIssuerRegistriesFor } from '../../lib/issuer';

const NO_URL = 'None';

export default function IssuerInfoScreen({ navigation, route }: IssuerInfoScreenProps): JSX.Element {
  const { issuerId } = route.params;

  const resolvedRegistryConfigs = useMemo(() => resolveIssuerRegistriesFor(issuerId), [issuerId]);

  const registryList = resolvedRegistryConfigs.map(({ name }) => name);
  const firstIssuerEntry = resolvedRegistryConfigs.map(({ issuerEntry }) => issuerEntry)[0];

  const { name, url, location } = firstIssuerEntry;

  function IssuerLink(): JSX.Element {
    if (url === NO_URL) {
      return <Text style={styles.dataValue}>{url}</Text>;
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

  return (
    <>
      <NavHeader goBack={navigation.goBack} title="Issuer Info" />
      <ScrollView style={styles.bodyContainer}>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Issuer Name</Text>
          <Text style={styles.dataValue}>{name}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Location</Text>
          <Text style={styles.dataValue}>{location}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Issuer URL</Text>
          <IssuerLink />
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Registries</Text>
          <BulletList items={registryList} />
        </View>
      </ScrollView>
    </>
  );
}

function BulletList({ items }: BulletListProps): JSX.Element {
  return (
    <View style={styles.bulletListContainer}>
      {items.map((item, i) => (
        <Text key={`${i}-${item}`} style={styles.bulletItem}>
          ●  {item}
        </Text>
      ))}
    </View>
  );
}
