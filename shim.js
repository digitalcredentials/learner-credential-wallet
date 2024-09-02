import { Platform } from 'react-native';
import 'react-native-quick-crypto';
const bi = require('big-integer');

import * as ExpoCrypto from 'expo-crypto';

// eslint-disable-next-line no-undef
global.crypto = {};

const subtle = {
  digest: (algorithm, data)=>{
    // @digitalcredentials/jsonld-signatures calls this fn with an object
    // rfd-canonize calls this with string
    // both are valid options but expo-crypto only accepts string
    const actualAlgorithm = typeof algorithm === 'string' ? algorithm : algorithm.name;
    return ExpoCrypto.digest(actualAlgorithm.toUpperCase(), data);
  },
  // no other subtle methods appear to be needed
};

crypto.subtle = subtle;

function patchedBigInt(value) {
  if (typeof value === 'string') {
    const match = value.match(/^0([xo])([0-9a-f]+)$/i);
    if (match) {
      return bi(match[2], match[1].toLowerCase() === 'x' ? 16 : 8);
    }
  }
  return bi(value);
}

if (typeof BigInt === 'undefined') {
  if (Platform.OS === 'android') {
    global.BigInt = patchedBigInt;
  } else {
    global.BigInt = bi;
  }
}
