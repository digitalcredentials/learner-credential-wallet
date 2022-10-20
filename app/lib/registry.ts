import { IssuerDidEntry } from '../data/issuerDid';
import { issuerAuthRegistry, IssuerAuthEntry } from '../data/issuerAuth';
import store from '../store';
import { displayGlobalError } from '../store/slices/wallet';

type RegistryMetadata = {
  created: string;
  updated: string;
}

export type RegistryRaw<Entry> = {
  readonly meta: RegistryMetadata;
  readonly entries: Record<string, Entry>;
}

class Registry<Entry> {
  entries?: Record<string, Entry>;

  constructor(registry?: RegistryRaw<Entry>) {
    if (registry) {
      this.entries = registry.entries;
    }
  }

  public isInRegistry(key: string): boolean {
    if (this.entries === undefined) {
      throw new Error('Registry not initialized.');
    }

    return key in this.entries;
  }

  public entryFor(key: string): Entry {
    if (this.entries === undefined) {
      throw new Error('Registry not initialized.');
    }

    if (!this.isInRegistry(key)) {
      throw new Error(`${key} not found in registry.`);
    }

    return this.entries[key];
  }
}

class RemoteRegistry<Entry> extends Registry<Entry> {
  readonly registryUrl;

  constructor(url: string) {
    super();
    this.registryUrl = url;
  }

  public async fetchRegistry() {
    const response = await fetch(this.registryUrl);
    if (!response.ok) {
      throw Error('Unable to fetch remote registry');
    }

    const data = await response.json();
    this.entries = data.registry;
  }
}

export const registries = {
  issuerDid: new RemoteRegistry<IssuerDidEntry>('https://raw.githubusercontent.com/digitalcredentials/issuer-registry/main/registry.json'),
  issuerAuth: new Registry<IssuerAuthEntry>(issuerAuthRegistry),
};

export async function loadRemoteRegistries(): Promise<void> {
  try {
    await Promise.all([
      registries.issuerDid.fetchRegistry(),
    ]);
  } catch (err) {
    store.dispatch(displayGlobalError({ 
      title: 'Unable to Load Remote Registries', 
      message: 'Please check your network connection and try again.',
      fatal: true,
    }));
  }
}
