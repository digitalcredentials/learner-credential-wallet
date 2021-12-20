import { issuerDidRegistry, IssuerDidEntry } from '../data/issuerDid';
import { issuerAuthRegistry, IssuerAuthEntry } from '../data/issuerAuth';

type RegistryMetadata = {
  created: string;
  updated: string;
}

export type RegistryRaw<Entry> = {
  readonly meta: RegistryMetadata;
  readonly entries: Record<string, Entry>;
}

class Registry<Entry> implements RegistryRaw<Entry> {
  readonly meta;
  readonly entries;

  constructor(registry: RegistryRaw<Entry>) {
    this.meta = registry.meta;
    this.entries = registry.entries;
  }

  public isInRegistry(key: string): boolean {
    return key in this.entries;
  }

  public entryFor(key: string): Entry {
    if (!this.isInRegistry(key)) {
      throw new Error(`${key} not found in registry.`);
    }

    return this.entries[key];
  }

}

export const registries = {
  issuerDid: new Registry<IssuerDidEntry>(issuerDidRegistry),
  issuerAuth: new Registry<IssuerAuthEntry>(issuerAuthRegistry),
};
