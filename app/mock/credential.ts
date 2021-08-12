import { Credential } from '../types/credential';

const credential: Credential = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://w3id.org/security/suites/ed25519-2020/v1',
    'https://w3id.org/dcc/v1',
  ],
  id: 'https://digitalcredentials.github.io/samples/certificate/1fe91f0f-4c64-48c8-bfc8-7132f75776fe/',
  type: [
    'VerifiableCredential',
    'LearningCredential',
  ],
  issuer: {
    type: 'Issuer',
    id: 'did:web:digitalcredentials.github.io',
    name: 'Sample Issuer',
    url: 'https://digitalcredentials.github.io/samples/',
  },
  issuanceDate: '2021-01-19T18:22:34.772810+00:00',
  credentialSubject: {
    type: 'Person',
    id: 'did:example:456',
    name: 'Percy',
    hasCredential: {
      type: [
        'EducationalOccupationalCredential',
        'ProgramCompletionCredential',
      ],
      name: 'DCC Program Completion Credential',
      description: 'Awarded on completion of the digital credential program',
      awardedOnCompletionOf: {
        type: 'EducationalOccupationalProgram',
        identifier: 'program-v1:Sample',
        name: 'Digital Credential Program',
        description: 'Educational program teaching how work with digital credentials',
        numberOfCredits: {
          value: '1',
        },
        startDate: '',
        endDate: '',
      },
    },
  },
};

export default credential;
