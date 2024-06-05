import { StackScreenProps } from '@react-navigation/stack';
import { ChapiCredentialRequest } from '../../types/chapi';

export type ExchangeCredentialsNavigationParamList = {
  ExchangeCredentials: { request: ChapiCredentialRequest; };
};

export type ExchangeCredentialsProps = StackScreenProps<ExchangeCredentialsNavigationParamList, 'ExchangeCredentials'>;
