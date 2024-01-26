import { Platform } from 'react-native';

const bi = require('big-integer');

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
