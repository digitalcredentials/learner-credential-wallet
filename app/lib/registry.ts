import { issuerDidRegistry, IssuerDidEntry } from '../data/issuerDid';
import { issuerAuthRegistry, IssuerAuthEntry } from '../data/issuerAuth';

type RegistryMetadata = {
  created: string;
  updated: string;
}

export type RegistryRecordRaw<Entry> = {
  readonly meta: RegistryMetadata;
  readonly registry: Record<string, Entry>;
}

class RegistryRecord<Entry> implements RegistryRecordRaw<Entry> {
  readonly meta;
  readonly registry;

  constructor(registryRecord: RegistryRecordRaw<Entry>) {
    this.meta = registryRecord.meta;
    this.registry = registryRecord.registry;
  }

  public isInRegistry(key: string): boolean {
    return key in this.registry;
  }

  public entryFor(key: string): Entry {
    if (!this.isInRegistry(key)) {
      throw new Error(`${key} not found in registry.`);
    }

    return this.registry[key];
  }

}

export const registries = {
  issuerDid: new RegistryRecord<IssuerDidEntry>(issuerDidRegistry),
  issuerAuth: new RegistryRecord<IssuerAuthEntry>(issuerAuthRegistry),
};
