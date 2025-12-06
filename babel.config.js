module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // react-native-reanimated plugin (v3.x doesn't require worklets-core)
      'react-native-reanimated/plugin',
    ],
  };
};

