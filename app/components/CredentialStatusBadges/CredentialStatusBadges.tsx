import React from 'react';
import { View } from 'react-native';

import { CredentialStatusBadgesProps } from './CredentialStatusBadges.d';
import { CredentialRecordRaw } from '../../model';
import { Cache, CacheKey } from '../../lib/cache';
import { theme } from '../../styles';
import { StatusBadge } from '../';
import styles from './CredentialStatusBadges.styles';
import { useAsync } from 'react-async-hook';
import { useVerifyCredential } from '../../hooks';


export default function CredentialStatusBadges({ rawCredentialRecord, badgeBackgroundColor }: CredentialStatusBadgesProps): JSX.Element {
  const showPublicBadge = useAsync<boolean>(hasPublicLink, [rawCredentialRecord]).result;
  const verifyCredential = useVerifyCredential(rawCredentialRecord);

  const verifyBadge = verifyCredential?.loading ? (
    <StatusBadge 
      backgroundColor={badgeBackgroundColor}
      color={theme.color.textSecondary}
      label="Verifying"
      icon="rotate-right"
    />
  ) : verifyCredential?.result?.verified ? (
    <StatusBadge 
      backgroundColor={badgeBackgroundColor}
      color={theme.color.success}
      label="Verified"
      icon="check-circle"
    />
  ) : (
    <StatusBadge 
      backgroundColor={badgeBackgroundColor}
      color={theme.color.error}
      label="Not Verified"
    />
  );

  return (
    <View style={styles.container}>
      {verifyBadge}
      {showPublicBadge && (
        <StatusBadge 
          label="Public" 
          color={theme.color.textSecondary}
          backgroundColor={badgeBackgroundColor}
        />
      )}
    </View>
  );
}

async function hasPublicLink(rawCredentialRecord: CredentialRecordRaw): Promise<boolean> {
  return Cache.getInstance()
    .load(CacheKey.PublicLink, rawCredentialRecord.credential.id)
    .then((s) => s !== undefined)
    .catch(() => false);
}
