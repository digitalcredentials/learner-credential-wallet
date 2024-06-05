import type { Subject } from '../app/types/credential'; 
import { extractNameFromOBV3Identifier } from '../app/lib/extractNameFromOBV3Identifier';

describe('extractNameFromOBV3Identifier', () => {
  it('should return null when there is no identifier object', async () => {
    expect(extractNameFromOBV3Identifier({id : '123'})).toEqual(null);
  });

  it('should return null when the identifier object is empty', async () => {
    expect(extractNameFromOBV3Identifier({  identifier: {} })).toEqual(null);
  });

  it('should return null when the identityType is invalid', async () => {
    expect(extractNameFromOBV3Identifier({ identifier: { identityType: 'something'} })).toEqual(null);
  });

 it('should return name from a valid OBV3 identifier object', async () => {
 	const credentialSubject: Subject = { identifier: { identityType: 'name', identityHash: 'Jane Doe' }};
	
  expect(extractNameFromOBV3Identifier(credentialSubject)).toEqual('Jane Doe');
 });

 it('should return name from a valid OBV3 array of identifiers', async () => {
  const credentialSubject: Subject = { identifier: [{ identityType: 'name', identityHash: 'Jane Doe'}] }

  expect(extractNameFromOBV3Identifier(credentialSubject)).toEqual('Jane Doe');
 });
});
