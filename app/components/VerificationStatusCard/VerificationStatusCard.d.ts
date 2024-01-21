import { Credential } from '../../types/credential';
import type {VerifyPayload} from '../../lib/verificationResultFor';

export type VerificationStatusCardProps = {
  credential: Credential;
  verifyPayload: VerifyPayload;
};

export type StatusItemProps = {
  positiveText: string;
  negativeText: string;
  verified: boolean;
  children?: React.ReactNode;
};
