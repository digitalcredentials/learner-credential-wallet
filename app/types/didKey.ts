export type DidKey = {
  readonly type: string;
  readonly id: string;
  readonly controller: string;
  readonly publicKeyMultibase: string;
  readonly privateKeyMultibase: string;
}
