import type { CredentialRecordRaw } from '../../model/credential';

export type CredentialCardProps = {
  rawCredentialRecord: CredentialRecordRaw,
  onPressIssuer: (issuerId: string) => void,
}

export type CredentialRenderInfo = {
  component: FunctionComponent<CredentialCardProps>,
  title: string,
}

