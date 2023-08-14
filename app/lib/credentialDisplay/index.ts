import { Credential } from '../../types/credential';
import { CredentialDisplayConfig, ResolvedCredentialItemProps } from './index.d';
import { openBadgeCredentialDisplayConfig } from './openBadgeCredential';

import { studentIdDisplayConfig } from './studentId';
import { universityDegreeCredentialDisplayConfig } from './universityDegreeCredential';
import { verifiableCredentialDisplayConfig } from './verifiableCredential';

export * from './index.d';

const credentialDisplayConfigs: CredentialDisplayConfig[] = [
  studentIdDisplayConfig,
  universityDegreeCredentialDisplayConfig,
  openBadgeCredentialDisplayConfig,

  verifiableCredentialDisplayConfig,
];

export function credentialDisplayConfigFor(credential: Credential): CredentialDisplayConfig {
  let config = credentialDisplayConfigs.find(({ credentialType }) => credential.type.includes(credentialType));
  if (credential.type.includes('AchievementCredential')) config = openBadgeCredentialDisplayConfig;
  if (!config) throw new Error('Unrecognized credential type');
  
  const { credentialType, cardComponent, itemPropsResolver } = config;
  
  return {
    credentialType,
    cardComponent,
    itemPropsResolver,
  };
}

export function credentialItemPropsFor(credential: Credential): ResolvedCredentialItemProps {
  const { itemPropsResolver } = credentialDisplayConfigFor(credential);
  return itemPropsResolver(credential);
}
