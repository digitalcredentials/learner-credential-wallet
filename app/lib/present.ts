import Share from 'react-native-share';
import * as RNFS from 'react-native-fs';
import uuid from 'react-native-uuid';
import vc from '@digitalcredentials/vc';
import { Ed25519VerificationKey2020 } from '@digitalcredentials/ed25519-verification-key-2020';
import { Ed25519Signature2020 } from '@digitalcredentials/ed25519-signature-2020';

import type { CredentialRecordRaw } from '../model/credential';
import type { DidRecordRaw } from '../model/did';

import { securityLoader } from './documentLoader';

const documentLoader = securityLoader().build();

export async function sharePresentation(rawCredentialRecords: CredentialRecordRaw[], didRecord: DidRecordRaw): Promise<void> {
  const filePath = `${RNFS.DocumentDirectoryPath}/presentation.json`;
  const credentials = rawCredentialRecords.map(({ credential }) => credential);
  const verificationKeyPair = await Ed25519VerificationKey2020.from(didRecord.verificationKey);
  const suite = new Ed25519Signature2020({ key: verificationKeyPair });
  const challenge = uuid.v4();

  const presentation = vc.createPresentation({ verifiableCredential: credentials });

  const signedPresentation = await vc.signPresentation({
    presentation,
    suite,
    challenge,
    documentLoader,
  });

  await RNFS.writeFile(filePath, JSON.stringify(signedPresentation), 'utf8');

  Share.open({
    title: 'Presentation',
    url: `file://${filePath}`,
    type: 'text/plain',
    subject: 'Presentation',
  });
}
