import { Credential } from '../../types/credential';
import { CredentialCardProps } from '../../components';

export { CredentialCardProps };

export type ResolvedCredentialItemProps = {
  title: string | null,
  subtitle: string | null,
  image: string | null,
}

export type CredentialDisplayConfig = {
  credentialType: string,
  cardComponent: React.ComponentType<CredentialCardProps>,
  itemPropsResolver: (credential: Credential) => ResolvedCredentialItemProps,
}