import React, { useContext } from 'react';
import { View, Text, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { BulletList, NavHeader } from '../../components';
import dynamicStyleSheet from './IssuerInfoScreen.styles';
import { IssuerInfoScreenProps } from './IssuerInfoScreen.d';
import { useDynamicStyles } from '../../hooks';
import { DidRegistryContext } from '../../init/registries';
import {issuerInRegistries} from '../../lib/issuerInRegistries';

const NO_URL = 'None';

export default function IssuerInfoScreen({
  navigation, route
}: IssuerInfoScreenProps): React.ReactElement | null {
  const { styles } = useDynamicStyles(dynamicStyleSheet);
  const { issuerId } = route.params;
  const registries = useContext(DidRegistryContext);

  const issuerInfo = registries.didEntry(issuerId);
  const registryNames = issuerInRegistries({ issuer: issuerId, registries }) || [];

  const { name, url, location } = issuerInfo || {};

  function IssuerLink(): React.ReactElement {
    if (!url || url === NO_URL) {
      return <Text style={styles.dataValue}>{NO_URL}</Text>;
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
          <BulletList items={registryNames} style={styles.bulletList} />
        </View>
      </ScrollView>
    </>
  );
}
