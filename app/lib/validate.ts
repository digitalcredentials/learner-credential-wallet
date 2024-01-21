import { Credential, CredentialError } from '../types/credential';

export type ResultLog = {
  id: string,
  valid: boolean
}

export type Result = {
  verified: boolean;
  credential: Credential;
  error: CredentialError;
  log: ResultLog[];
}

export type VerifyResponse = {
  verified: boolean;
  results: Result[];
}

