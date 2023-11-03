import { StackScreenProps } from '@react-navigation/stack';
import { ChapiCredentialRequest } from '../../lib/chapi';

export type ExchangeCredentialsNavigationParamList = {
  ExchangeCredentials: { request: ChapiCredentialRequest; };
};

export type ExchangeCredentialsProps = StackScreenProps<ExchangeCredentialsNavigationParamList, 'ExchangeCredentials'>;
