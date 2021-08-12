export type IssuerURI = string;
export interface IssuerObject {
  readonly id: IssuerURI;
  readonly type?: string;
  readonly name?: string;
  readonly url?: string;
  readonly image?: string;
}
export type Issuer = IssuerURI | IssuerObject;

export interface CreditValue {
  value?: string;
}

export interface CompletionDocument {
  readonly type?: string;
  readonly identifier?: string;
  readonly name?: string;
  readonly description?: string;
  readonly numberOfCredits?: CreditValue;
  readonly startDate?: string;
  readonly endDate?: string;
}

export interface EducationalOperationalCredentialExtensions {
  readonly type?: string[];
  readonly awardedOnCompletionOf?: CompletionDocument;
}

// https://schema.org/EducationalOccupationalCredential (this doesn't really conform)
export interface EducationalOperationalCredential extends EducationalOperationalCredentialExtensions {
  readonly name?: string;
  readonly description?: string;
}

interface SubjectExtensions {
  readonly type?: string;
  readonly name?: string;
  readonly hasCredential?: EducationalOperationalCredential; // https://schema.org/hasCredential
}

export interface Subject extends SubjectExtensions {
  readonly id?: string;
}

export interface Proof {
  type: string;
  created: string;
  verificationMethod: string;
  proofPurpose: string;
  proofValue: string;
}

// https://digitalcredentials.github.io/dcc/v1/dcc-context-v1.json
export type Credential = {
  readonly '@context': string[];         // https://w3c.github.io/vc-data-model/#contexts
  readonly id: string;                   // https://w3c.github.io/vc-data-model/#identifiers
  readonly type: string[];               // https://w3c.github.io/vc-data-model/#types
  readonly issuer: Issuer;               // https://w3c.github.io/vc-data-model/#issuer
  readonly issuanceDate: string;         // https://w3c.github.io/vc-data-model/#issuance-date
  readonly credentialSubject: Subject;   // https://w3c.github.io/vc-data-model/#credential-subject
  readonly proof: Proof;                 // https://w3c.github.io/vc-data-model/#proofs-signatures
}
