import type { CredentialRecordRaw } from '../../model/credential';

export type CredentialCardProps = {
  rawCredentialRecord: CredentialRecordRaw,
}

export type CredentialRenderInfo = {
  component: FunctionComponent<CredentialCardProps>,
  title: string,
}

