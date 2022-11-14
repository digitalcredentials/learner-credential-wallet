import React, { useEffect, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { Ed25519Signature2020 } from '@digitalcredentials/ed25519-signature-2020';
import { Ed25519VerificationKey2020 } from '@digitalcredentials/ed25519-verification-key-2020';

import dynamicStyleSheet from './ChooseProfileScreen.styles';
import { ChooseProfileScreenProps, ProfileButtonProps } from './ChooseProfileScreen.d';
import { NavHeader } from '../../components';
import { useSelector } from 'react-redux';
import { selectRawProfileRecords } from '../../store/slices/profile';
import { CredentialRequestParams, DidAuthRequestParams } from '../../lib/request';
import { useAppDispatch, useDynamicStyles, useSelectorFactory } from '../../hooks';
import { constructExchangeRequest, handleVcApiExchange } from '../../lib/exchanges';
import { makeSelectProfileForPendingCredentials } from '../../store/selectorFactories/makeSelectProfileForPendingCredentials';
import { stageCredentials } from '../../store/slices/credentialFoyer';
import { DidRecord, ProfileRecordRaw } from '../../model';

export default function ChooseProfileScreen({ navigation, route }: ChooseProfileScreenProps): JSX.Element {
  const { styles, mixins } = useDynamicStyles(dynamicStyleSheet);
  const rawProfileRecords = useSelector(selectRawProfileRecords);
  const associatedProfile = useSelectorFactory(makeSelectProfileForPendingCredentials);

  const flatListData = useMemo(() => [...rawProfileRecords].reverse(), [rawProfileRecords]);

  const dispatch = useAppDispatch();

  async function onSelectProfile(rawProfileRecord: ProfileRecordRaw) {
    const params = route?.params as any;
    if (Object.keys(params).includes('did_auth_request')) {
      const didAuthRequest = (params as DidAuthRequestParams).did_auth_request;
      const didRecordId = rawProfileRecord.didRecordId;
      const didRecords = await DidRecord.getAllDidRecords();
      const didRecord = didRecords.find((record) => record._id.equals(didRecordId));
      const holder = didRecord?.didDocument.authentication[0].split('#')[0] as string;
      const key = await Ed25519VerificationKey2020.from(didRecord?.verificationKey);
      const suite = new Ed25519Signature2020({ key });
      const { challenge, domain } = didAuthRequest;
      const request = await constructExchangeRequest({
        challenge,
        domain,
        holder,
        suite
      });
      const url = didAuthRequest.interact?.service[0]?.serviceEndpoint as string;
      const response = await handleVcApiExchange({ url, request });
      const presentation = response.verifiablePresentation;
      const credential = presentation.verifiableCredential[0];
      await dispatch(stageCredentials([credential]));
    }
    navigation.navigate('ApproveCredentialsScreen', {
      rawProfileRecord,
      credentialRequestParams: params
    });
  }

  useEffect(() => {
    if (rawProfileRecords.length === 1) {
      onSelectProfile(rawProfileRecords[0]);
    } else if (associatedProfile){
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
      buttonStyle={mixins.buttonIconCompact}
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
