import { Credential } from '../types/credential';

const credential: Credential = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://w3id.org/security/suites/ed25519-2020/v1',
    'https://w3id.org/dcc/v1',
  ],
  id: 'https://cred.127.0.0.1.nip.io/api/issuance/12',
  type: [
    'VerifiableCredential',
    'Assertion',
  ],
  issuer: {
    id: 'did:key:z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv',
    name: 'Example University',
    url: 'https://example.com',
  },
  issuanceDate: '2021-09-06T00:00:00.000Z',
  expirationDate: '2022-03-02T21:18:45+00:00',
  credentialSubject: {
    id: 'did:example:abc123',
    name: 'Ian Malcom',
    hasCredential: {
      id: 'https://cred.127.0.0.1.nip.io/api/claim/9c38ea72-b791-4510-9f01-9b91bab8c748',
      name: 'GT Guide',
      type: [
        'EducationalOccupationalCredential',
      ],
      description: 'Demonstrated.',
    },
  },
  proof: {
    type: 'Ed25519Signature2020',
    created: '2021-09-16T03:02:08Z',
    verificationMethod: 'did:key:z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv#z6Mktpn6cXks1PBKLMgZH2VaahvCtBMF6K8eCa7HzrnuYLZv',
    proofPurpose: 'assertionMethod',
    proofValue: 'zxFfvBhwcFa99uLFaJgJ3VYFfomD5qQgpb6vvKR2TgRjHbB4WcCS8mLfvNdu9WrDUTt1m6xZHVc7Cjux5RkNynfc',
  },
};

export default credential;
