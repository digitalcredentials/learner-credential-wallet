import React, { useEffect, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button, ListItem } from 'react-native-elements';

import dynamicStyleSheet from './ChooseProfileScreen.styles';
import { ChooseProfileScreenProps, ProfileButtonProps } from './ChooseProfileScreen.d';
import { NavHeader } from '../../components';
import { useSelector } from 'react-redux';
import { selectRawProfileRecords } from '../../store/slices/profile';
import { useDynamicStyles, useSelectorFactory } from '../../hooks';
import { makeSelectProfileForPendingCredentials } from '../../store/selectorFactories/makeSelectProfileForPendingCredentials';
import { ProfileRecordRaw } from '../../model';

export default function ChooseProfileScreen({ navigation, route }: ChooseProfileScreenProps): JSX.Element {
  const { styles, mixins } = useDynamicStyles(dynamicStyleSheet);
  const rawProfileRecords = useSelector(selectRawProfileRecords);
  const associatedProfile = useSelectorFactory(makeSelectProfileForPendingCredentials);

  const flatListData = useMemo(() => [...rawProfileRecords].reverse(), [rawProfileRecords]);

  function onSelectProfile(rawProfileRecord: ProfileRecordRaw) {
    navigation.navigate('ApproveCredentialsScreen', { 
      rawProfileRecord, 
      credentialRequestParams: route?.params,
    });
  }

  useEffect(() => {
    if (rawProfileRecords.length === 1) {
      return onSelectProfile(rawProfileRecords[0]);
    }

    if (associatedProfile){
      onSelectProfile(associatedProfile);
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
  const { mixins } = useDynamicStyles();

  return (
    <Button
      title={rawProfileRecord.profileName}
      buttonStyle={mixins.buttonIcon}
      containerStyle={mixins.buttonContainerVertical}
      titleStyle={mixins.buttonIconTitle}
      iconRight
      onPress={(onPress)}
      icon={
        <ListItem.Chevron 
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
        />
      }
    />
  );
}
