export type IssuerURI = string;
export type IssuerObject = {
  readonly id: IssuerURI;
  readonly type?: string;
  readonly name?: string;
  readonly url?: string;
  readonly image?: string;
}
export type Issuer = IssuerURI | IssuerObject;

export type CreditValue = {
  value?: string;
}

export type CompletionDocument = {
  readonly type?: string;
  readonly identifier?: string;
  readonly name?: string;
  readonly description?: string;
  readonly numberOfCredits?: CreditValue;
  readonly startDate?: string;
  readonly endDate?: string;
}

export type EducationalOperationalCredentialExtensions = {
  readonly type?: string[];
  readonly awardedOnCompletionOf?: CompletionDocument;
}

// https://schema.org/EducationalOccupationalCredential (this doesn't really conform)
export type EducationalOperationalCredential = EducationalOperationalCredentialExtensions & {
  readonly id: string;
  readonly name?: string;
  readonly description?: string;
  readonly competencyRequired?: string;
  readonly credentialCategory?: string;
}

type SubjectExtensions = {
  readonly type?: string;
  readonly name?: string;
  readonly hasCredential?: EducationalOperationalCredential; // https://schema.org/hasCredential
}

export type Subject = SubjectExtensions & {
  readonly id?: string;
}

export type Proof = {
  type: string;
  created: string;
  verificationMethod: string;
  proofPurpose: string;
  proofValue: string;
  challenge?: string;
  jws?: string;
}

// https://digitalcredentials.github.io/dcc/v1/dcc-context-v1.json
export type Credential = {
  readonly '@context': string[];         // https://w3c.github.io/vc-data-model/#contexts
  readonly id: string;                   // https://w3c.github.io/vc-data-model/#identifiers
  readonly type: string[];               // https://w3c.github.io/vc-data-model/#types
  readonly issuer: Issuer;               // https://w3c.github.io/vc-data-model/#issuer
  readonly issuanceDate: string;         // https://w3c.github.io/vc-data-model/#issuance-date
  readonly credentialSubject: Subject;   // https://w3c.github.io/vc-data-model/#credential-subject
  readonly proof?: Proof;                 // https://w3c.github.io/vc-data-model/#proofs-signatures
}

export enum CredentialError {
  IsNotVerified = 'Credential is not verified.',
  CouldNotBeVerified = 'Credential could not be checked for verification and may be malformed.',
  DidNotInRegistry = 'Could not find issuer in registry with given DID.',
}
