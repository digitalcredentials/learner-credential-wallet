type RegistryMetadata = {
  created: string;
  updated: string;
}

export type RegistryRaw<Entry> = {
  readonly meta: RegistryMetadata;
  readonly entries: Record<string, Entry>;
  readonly name: string;
}

export type RemoteRegistryConfig = {
  name: string;
  url: string;
}

export type IssuerDidEntry = {
  name: string;
  location?: string;
  url: string;
}
