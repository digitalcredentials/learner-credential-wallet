// Navigation Components
export { default as RootNavigation } from './RootNavigation/RootNavigation';
export { default as AcceptCredentialsNavigation } from './AcceptCredentialsNavigation/AcceptCredentialsNavigation';
export { default as AddNavigation } from './AddNavigation/AddNavigation';
export { default as AppNavigation } from './AppNavigation/AppNavigation';
export { default as CredentialNavigation } from './CredentialNavigation/CredentialNavigation';
export { default as HomeNavigation } from './HomeNavigation/HomeNavigation';
export { default as SettingsNavigation } from './SettingsNavigation/SettingsNavigation';
export { default as SetupNavigation } from './SetupNavigation/SetupNavigation';
export { default as ShareNavigation } from './ShareNavigation/ShareNavigation';
export { default as ExchangeCredentialsNavigation } from './ExchangeCredentialsNavigation/ExchangeCredentialsNavigation';

// Type Definitions
export * from './RootNavigation/RootNavigation.d';
export * from './HomeNavigation/HomeNavigation.d';
export * from './SettingsNavigation/SettingsNavigation.d';
export * from './SetupNavigation/SetupNavigation.d';
export * from './AddNavigation/AddNavigation.d';
export * from './AcceptCredentialsNavigation/AcceptCredentialsNavigation.d';
export * from './CredentialNavigation/CredentialNavigation.d';
export * from './ShareNavigation/ShareNavigation.d';
export * from './ExchangeCredentialsNavigation/ExchangeCredentialsNavigation.d';

export { navigationRef } from './AppNavigation/AppNavigation';

/**
 * If screens are re-used, we need to make union types for their
 * props
 */
import { CredentialScreenHomeProps } from './CredentialNavigation/CredentialNavigation.d';
import { CredentialScreenShareProps } from './ShareNavigation/ShareNavigation.d';
export type CredentialScreenProps = CredentialScreenHomeProps | CredentialScreenShareProps;

import { DetailsScreenSettingsProps } from './SettingsNavigation/SettingsNavigation.d';
import { DetailsScreenSetupProps } from './SetupNavigation/SetupNavigation.d';
export type DetailsScreenProps = DetailsScreenSettingsProps | DetailsScreenSetupProps;

import { PublicLinkScreenCredentialProps } from './CredentialNavigation/CredentialNavigation.d';
import { PublicLinkScreenShareProps } from './ShareNavigation/ShareNavigation.d';
export type PublicLinkScreenProps = PublicLinkScreenCredentialProps | PublicLinkScreenShareProps;

import { IssuerInfoScreenCredentialProps } from './CredentialNavigation/CredentialNavigation.d';
import { IssuerInfoScreenAddProps } from './AcceptCredentialsNavigation/AcceptCredentialsNavigation.d';
export type IssuerInfoScreenProps = IssuerInfoScreenCredentialProps | IssuerInfoScreenAddProps;
