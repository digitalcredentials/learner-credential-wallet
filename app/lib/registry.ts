type IssuerDIDEntry = {
  name: string;
  location: string;
  url: string;
}

type IssuerRegistryMetadata = {
  created: string;
  updated: string;
}

export type IssuerRegistry = {
  meta: IssuerRegistryMetadata;
  registry: Record<string, IssuerDIDEntry>;
}

// TODO: Import this from the DCC module once it is published
const issuerRegistry: IssuerRegistry = {
  meta: {
    created: '2020-12-02T02:32:16+0000',
    updated: '2021-09-20T01:06:23+0000',
  },
  registry: {
    'did:key:z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv': {
      name: 'Example University 1 (DCC test-only issuer)',
      location: 'Cambridge, MA, USA',
      url: 'https://openlearning.mit.edu',
    },
    'did:web:digitalcredentials.odl.mit.edu': {
      name: 'MIT xPRO',
      location: 'Cambridge, MA, USA',
      url: 'https://xpro.mit.edu',
    },
    'did:web:c21u.gatech.edu': {
      name: 'Georgia Tech Center for 21st Century Universities',
      location: 'Atlanta, GA, USA',
      url: 'https://c21u.gatech.edu',
    },
  },
};

export function isInRegistry(did: string): boolean {
  return did in issuerRegistry.registry;
}

export function registryEntryFor(did: string): IssuerDIDEntry {
  if (!isInRegistry(did)) {
    throw new Error(`Did ${did} not found in registry.`);
  }

  return issuerRegistry.registry[did];
}
