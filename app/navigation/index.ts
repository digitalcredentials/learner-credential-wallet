export { default as AddCredentialNavigation } from './AddCredentialNavigation/AddCredentialNavigation';
export { default as AppNavigation } from './AppNavigation/AppNavigation';
export { default as CredentialNavigation } from './CredentialNavigation/CredentialNavigation';
export { default as HomeNavigation } from './HomeNavigation/HomeNavigation';
export { default as SettingsNavigation } from './SettingsNavigation/SettingsNavigation';
export { default as SetupNavigation } from './SetupNavigation/SetupNavigation';
export { default as ShareNavigation } from './ShareNavigation/ShareNavigation';

export * from './HomeNavigation/HomeNavigation.d';
export * from './SettingsNavigation/SettingsNavigation.d';
export * from './SetupNavigation/SetupNavigation.d';
export * from './AddCredentialNavigation/AddCredentialNavigation.d';
export * from './CredentialNavigation/CredentialNavigation.d';
export * from './ShareNavigation/ShareNavigation.d';

/**
 * If screens are re-used, we need to make union types for their
 * props
 */
import { CredentialScreenHomeProps } from './CredentialNavigation/CredentialNavigation.d';
import { CredentialScreenShareProps } from './ShareNavigation/ShareNavigation.d';

export type CredentialScreenProps = CredentialScreenHomeProps | CredentialScreenShareProps;
