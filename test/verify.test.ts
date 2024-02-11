import {securityLoader} from '@digitalcredentials/security-document-loader';
import {Ed25519Signature2020} from '@digitalcredentials/ed25519-signature-2020';
import { checkStatus } from '@digitalcredentials/vc-status-list';
import vc from '@digitalcredentials/vc';

import { mockCredential } from '../app/mock/credential';

const documentLoader = securityLoader({ fetchRemoteContexts: true }).build();
const suite = new Ed25519Signature2020();

describe('Verification', () => {
  it('verifies the mock VC', async () => {
    const result = await vc.verifyCredential({
      credential: mockCredential,
      suite,
      documentLoader,
      checkStatus
    });
    console.log(result);
  });
});
