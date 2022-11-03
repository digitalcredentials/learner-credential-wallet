import React, { useMemo } from 'react';
import { View, Text, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BulletList, NavHeader } from '../../components';

import dynamicStyleSheet from './IssuerInfoScreen.styles';
import { IssuerInfoScreenProps } from './IssuerInfoScreen.d';
import { useDynamicStyles } from '../../hooks';
import { registryCollections } from '../../lib/registry';

const NO_URL = 'None';

export default function IssuerInfoScreen({ navigation, route }: IssuerInfoScreenProps): JSX.Element | null {
  const { styles } = useDynamicStyles(dynamicStyleSheet);
  const { issuerId } = route.params;

  const resolvedRegistryConfigs = useMemo(() => registryCollections.issuerDid.registriesFor(issuerId), [issuerId]);

  const registryList = resolvedRegistryConfigs.map(({ name }) => name);
  const firstIssuerEntry = resolvedRegistryConfigs[0].entryFor(issuerId);

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
          <BulletList items={registryList} style={styles.bulletList} />
        </View>
      </ScrollView>
    </>
  );
}
