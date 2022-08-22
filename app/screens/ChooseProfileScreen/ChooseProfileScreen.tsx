import React, { useEffect, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button, ListItem } from 'react-native-elements';

import { mixins } from '../../styles';
import styles from './ChooseProfileScreen.styles';
import { ChooseProfileScreenProps, ProfileButtonProps } from './ChooseProfileScreen.d';
import { NavHeader } from '../../components';
import { useSelector } from 'react-redux';
import { selectRawProfileRecords } from '../../store/slices/profile';

export default function ChooseProfileScreen({ navigation, route }: ChooseProfileScreenProps): JSX.Element {
  const { onSelectProfile } = route?.params ?? { 
    onSelectProfile: (rawProfileRecord) =>
      navigation.navigate('ApproveCredentialsScreen', { rawProfileRecord }),
  };

  const rawProfileRecords = useSelector(selectRawProfileRecords);
  const flatListData = useMemo(() => [...rawProfileRecords].reverse(), [rawProfileRecords]);

  useEffect(() => {
    if (rawProfileRecords.length === 1) {
      onSelectProfile(rawProfileRecords[0]);
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
        data={flatListData}
        renderItem={({ item }) => 
          <ProfileButton 
            rawProfileRecord={item}
            onPress={() => onSelectProfile(item)}
          />
        }
      />
    </>
  );
}

function ProfileButton({ rawProfileRecord, onPress }: ProfileButtonProps) {
  return (
    <Button
      title={rawProfileRecord.profileName}
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
