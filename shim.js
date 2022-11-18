import { Platform } from 'react-native';

if (typeof __dirname === 'undefined') global.__dirname = '/'
if (typeof __filename === 'undefined') global.__filename = ''
if (typeof process === 'undefined') {
  global.process = require('process')
} else {
  const bProcess = require('process')
  for (var p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p]
    }
  }
}

process.browser = false
if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer

// global.location = global.location || { port: 80 }
const isDev = typeof __DEV__ === 'boolean' && __DEV__
process.env['NODE_ENV'] = isDev ? 'development' : 'production'
if (typeof localStorage !== 'undefined') {
  localStorage.debug = isDev ? '*' : ''
}

// If using the crypto shim, uncomment the following line to ensure
// crypto is loaded first, so it can populate global.crypto
// require('crypto')

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
