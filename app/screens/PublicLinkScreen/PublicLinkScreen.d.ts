import { PublicLinkScreenMode } from './PublicLinkScreen';
export { PublicLinkScreenProps } from '../../navigation';

export type PublicLinkScreenParams = {
  rawCredentialRecord: CredentialRecordRaw;
  screenMode?: PublicLinkScreenMode;
};
