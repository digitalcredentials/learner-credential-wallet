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

class RemoteRegistry<Entry> implements RegistryRaw<Entry> {
  readonly meta;
  readonly entries;

  constructor(url: string) {
    this.registryUrl = url;
  }

  private async fetchRegistry(){
    console.log(`RemoteRegistry.fetchRegistry(url=${this.registryUrl})`);
    const response = await fetch(this.registryUrl);
    if (!response.ok) {
      console.log(`RemoteRegistry.fetchRegistry(url=${this.registryUrl}) failed`);
      throw Error('Unable to fetch remote registry')
    }
    const data = await response.json();
    console.log(JSON.stringify(data));
    this.meta = data.meta;
    this.entries = data.registry;
  }

  public async isInRegistry(key: string): boolean {
    await this.fetchRegistry();
    return key in this.entries;
  }

  public async entryFor(key: string): boolean {
    await this.fetchRegistry();
    if (!this.isInRegistry(key)) {
      throw new Error(`${key} not found in registry.`);
    }

    return this.entries[key];
  }
}

export const registries = {
  issuerDid: new RemoteRegistry<IssuerDidEntry>('https://raw.githubusercontent.com/digitalcredentials/issuer-registry/main/registry.json'),
  issuerAuth: new Registry<IssuerAuthEntry>(issuerAuthRegistry),
};
