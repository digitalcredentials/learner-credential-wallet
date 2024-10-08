import React, { useCallback } from 'react';
import { View } from 'react-native';

import { CredentialStatusBadgesProps } from './CredentialStatusBadges.d';
import { StatusBadge } from '../';
import dynamicStyleSheet from './CredentialStatusBadges.styles';
import { useAsyncCallback } from 'react-async-hook';
import { useDynamicStyles, useVerifyCredential } from '../../hooks';
import { useFocusEffect } from '@react-navigation/native';
import { hasPublicLink } from '../../lib/publicLink';


export default function CredentialStatusBadges({ rawCredentialRecord, badgeBackgroundColor }: CredentialStatusBadgesProps): React.ReactElement {
  const { styles, theme } = useDynamicStyles(dynamicStyleSheet);
  const checkPublicLink = useAsyncCallback<boolean>(hasPublicLink);
  const verifyCredential = useVerifyCredential(rawCredentialRecord);

  useFocusEffect(
    useCallback(() => {
      checkPublicLink.execute(rawCredentialRecord);
    }, [])
  );

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
      color={theme.color.errorLight}
      label="Not Verified"
    />
  );

  return (
    <View style={styles.container}>
      {verifyBadge}
      {checkPublicLink.result && (
        <StatusBadge
          label="Public"
          color={theme.color.textSecondary}
          backgroundColor={badgeBackgroundColor}
        />
      )}
    </View>
  );
}
