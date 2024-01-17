// eslint-disable-next-line no-undef
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            'crypto': 'react-native-quick-crypto',
            'stream': 'stream-browserify',
            'buffer': '@craftzdog/react-native-buffer',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
