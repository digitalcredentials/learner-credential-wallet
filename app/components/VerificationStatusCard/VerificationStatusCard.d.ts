import type { VerifyPayload } from '../../hooks';
import { Credential } from '../../types/credential';

export type VerificationStatusCardProps = {
  credential: Credential;
  verifyPayload: VerifyPayload;
};

export type StatusItemProps = {
  text: string;
};
