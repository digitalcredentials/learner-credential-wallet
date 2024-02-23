// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('cjs');
// this will be the default in the future, so let's be future-proof
defaultConfig.resolver.enablePackageExports = true;
defaultConfig.resolver.unstable_enablePackageExports = true;

module.exports = defaultConfig;
