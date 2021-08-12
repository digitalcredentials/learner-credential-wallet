import Realm from 'realm';

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
  value?: number;
}

export interface CompletionDocument {
  readonly type?: string[];
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

// https://digitalcredentials.github.io/dcc/v1/dcc-context-v1.json
export type Credential = {
  readonly '@context': string[];         // https://w3c.github.io/vc-data-model/#contexts
  readonly id: string;                   // https://w3c.github.io/vc-data-model/#identifiers
  readonly type: string[];               // https://w3c.github.io/vc-data-model/#types
  readonly issuer: Issuer;               // https://w3c.github.io/vc-data-model/#issuer
  readonly issuanceDate: string;         // https://w3c.github.io/vc-data-model/#issuance-date
  readonly credentialSubject: Subject;   // https://w3c.github.io/vc-data-model/#credential-subject
}

/**
 * The DCC VC standard is in flux right now,
 * so we are choosing to store credentials as
 * stringified JSON.
 */
export class CredentialRecord {
  _id!: number;
  createdAt!: Date;
  updatedAt!: Date;
  rawCredential!: string;

  static schema: Realm.ObjectSchema = {
    name: 'CredentialRecord',
    properties: {
      _id: 'int',
      rawCredential: 'string',
      createdAt: 'date',
      updatedAt: 'date',
    },
    primaryKey: '_id',
  };

  get credential(): Credential{
    return JSON.parse(this.rawCredential) as Credential;
  }
}
