import type {Config} from 'jest';

const packagesToTransformWithBabel = [
  '@react-native',
  '@digitalbazaar/http-client'
];

const transformIgnorePatterns = [
  `/node_modules/(?!(${packagesToTransformWithBabel.join('|')}))`,
];

// https://github.com/facebook/react-native/blob/main/packages/react-native/jest-preset.js
const config: Config = {
  preset: 'react-native',
  transformIgnorePatterns
};


export default config;
