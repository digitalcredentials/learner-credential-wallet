import { IssuerDidEntry } from '../data/issuerDid';
import { registries } from './registry';

type IssuerRegistryConfig = {
  name: string;
  issuerResolver: (id: string) => IssuerDidEntry | null,
};

type ResolvedIssuerRegistryConfig = IssuerRegistryConfig & {
  issuerEntry: IssuerDidEntry
};

const issuerRegistryConfigs: IssuerRegistryConfig[] = [
  {
    name: 'DCC Registry',
    issuerResolver: (id) => registries.issuerDid.entryFor(id),
  }
];

export function resolveIssuerRegistriesFor(issuerId: string): ResolvedIssuerRegistryConfig[] {
  return issuerRegistryConfigs
    .map(({ issuerResolver, ...rest }) => {
      let issuerEntry: IssuerDidEntry | null;

      try {
        issuerEntry = issuerResolver(issuerId);
      } catch (err) {
        issuerEntry = null;
      }

      return { ...rest, issuerEntry };
    })
    .filter(({ issuerEntry }) => issuerEntry !== null) as ResolvedIssuerRegistryConfig[];
}
