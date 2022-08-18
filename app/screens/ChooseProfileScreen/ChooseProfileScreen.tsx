import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button, ListItem } from 'react-native-elements';

import { mixins } from '../../styles';
import styles from './ChooseProfileScreen.styles';
import { ChooseProfileScreenProps, ProfileButtonProps } from './ChooseProfileScreen.d';
import { NavHeader } from '../../components';

export default function ChooseProfileScreen({ navigation, route }: ChooseProfileScreenProps): JSX.Element {
  const { onSelectProfile } = route?.params ?? { 
    onSelectProfile: (profile) =>
      navigation.navigate('ApproveCredentialsScreen', { profile }),
  };
  
  // PROFILE TODO: Connect to profile store
  const profiles = [
    { name: 'Default', credentials: ['Test 1'] },
    { name: 'School Creds', credentials: ['Test 2', 'Test 3']}
  ];

  useEffect(() => {
    if (profiles.length === 1) {
      onSelectProfile(profiles[0]);
    }
  }, []);

  const ListHeader = (
    <View style={styles.listHeader}>
      <Text style={mixins.paragraphText}>Issue the credential(s) to the selected profile.</Text>
    </View>
  );

  return (
    <>
      <NavHeader title="Choose Profile" goBack={navigation.goBack} />
      <FlatList
        inverted
        ListFooterComponent={ListHeader}
        style={styles.container}
        data={profiles.reverse()}
        renderItem={({ item }) => 
          <ProfileButton 
            profile={item}
            onPress={() => onSelectProfile(item)}
          />
        }
      />
    </>
  );
}

function ProfileButton({ profile, onPress }: ProfileButtonProps) {
  return (
    <Button
      title={profile.name}
      buttonStyle={mixins.buttonIconCompact}
      containerStyle={mixins.buttonContainerVertical}
      titleStyle={mixins.buttonIconTitle}
      iconRight
      onPress={(onPress)}
      icon={
        <ListItem.Chevron />
      }
    />
  );
}
