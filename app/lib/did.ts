import * as DidMethodKey from '@digitalcredentials/did-method-key';
import { generateSecureRandom } from 'react-native-securerandom';
import { AddDidRecordParams } from '../model';
import { DidKey } from '../types/did';

const didKeyDriver = DidMethodKey.driver();

export async function mintDid(): Promise<AddDidRecordParams> {
  const { didDocument, keyPairs } = await didKeyDriver.generate({
    randomBytes: await generateSecureRandom(32),
  });

  const expandedMap: [string, DidKey][] = Array.from(keyPairs);

  const [
    verificationKey,
    keyAgreementKey,
  ]: DidKey[] = expandedMap.map(([, pair]): DidKey => pair);

  return { didDocument, verificationKey, keyAgreementKey };
}