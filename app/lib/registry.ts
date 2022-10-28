/**
 * The registry structure nomenclature is as follows:
 * RegistryCollection > Registry > Entry (e.g. an issuer configuration)
 * 
 * See type definitions for exact data structures.
 */

import { issuerAuthRegistry, IssuerAuthEntry } from '../data/issuerAuth';
import registryCollectionsConfig from '../../config/registryCollections.json';
import { RemoteRegistryConfig, IssuerDidEntry, RegistryRaw } from '../types/registry';

class Registry<Entry> implements RegistryRaw<Entry> {
  entries;
  meta;
  name;

  constructor(registry: RegistryRaw<Entry>) {
    this.entries = registry.entries;
    this.meta = registry.meta;
    this.name = registry.name;
  }

  public isInRegistry(issuerKey: string): boolean {
    return issuerKey in this.entries;
  }

  public entryFor(issuerKey: string): Entry {
    if (!this.isInRegistry(issuerKey)) {
      throw new Error(`${issuerKey} not found in registry.`);
    }

    return this.entries[issuerKey];
  }
}

class RegistryCollection<Entry> {
  configs: RemoteRegistryConfig[];
  registries: Registry<Entry>[] = [];

  constructor(configs: RemoteRegistryConfig[]) {
    this.configs = configs;
  }

  public async fetchRegistries() {
    const allRegistries = await Promise.all(this.configs.map(async ({ url, name }) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Received ${response.status} from ${url}`);

        const data = await response.json();
        return new Registry<Entry>({
          meta: data.meta,
          entries: data.registry,
          name,
        });
      } catch (err) {
        console.log(`Could not fetch registry "${name}" at ${url}`);
        return;
      }
    }));

    this.registries = allRegistries.filter(Boolean) as Registry<Entry>[];
  }

  public isInRegistryCollection(key: string): boolean {
    return this.registries.some(registry => registry.isInRegistry(key));
  }

  public registriesFor(key: string): Registry<Entry>[] {
    return this.registries.filter(registry => registry.isInRegistry(key));
  }
}

export const staticRegistries = {
  issuerAuth: new Registry<IssuerAuthEntry>(issuerAuthRegistry),
};

export const registryCollections = {
  issuerDid: new RegistryCollection<IssuerDidEntry>(registryCollectionsConfig.issuerDid),
};

export async function loadRegistryCollections(): Promise<void> {
  await Promise.all([
    registryCollections.issuerDid.fetchRegistries(),
  ]);
}
