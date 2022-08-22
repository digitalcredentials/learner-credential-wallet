import React, { useCallback, useState } from 'react';
import { View } from 'react-native';

import { CredentialStatusBadgesProps } from './CredentialStatusBadges.d';
import { CredentialRecordRaw } from '../../model';
import { Cache } from '../../lib/cache';
import { theme } from '../../styles';
import { StatusBadge } from '../';
import styles from './CredentialStatusBadges.styles';
import { useFocusEffect } from '@react-navigation/native';

type BadgeValues = {
  public: boolean;
}

export default function CredentialStatusBadges({ rawCredentialRecord, badgeBackgroundColor }: CredentialStatusBadgesProps): JSX.Element {
  const [badgeValues, setBadgeValues] = useState<BadgeValues>();

  useFocusEffect(useCallback(() => {
    getBadgeValues(rawCredentialRecord).then(setBadgeValues);
  }, []));

  return (
    <View style={styles.container}>
      {badgeValues?.public && (
        <StatusBadge 
          label="Public" 
          color={theme.color.textSecondary}
          backgroundColor={badgeBackgroundColor}
        />
      )}
    </View>
  );
}

async function getBadgeValues(rawCredentialRecord: CredentialRecordRaw): Promise<BadgeValues> {
  return {
    public: await hasPublicLink(rawCredentialRecord),
  };
}

async function hasPublicLink(rawCredentialRecord: CredentialRecordRaw): Promise<boolean> {
  return Cache.getInstance()
    .load('publiclink', rawCredentialRecord.credential.id)
    .then((s) => s !== undefined)
    .catch(() => false);
}
