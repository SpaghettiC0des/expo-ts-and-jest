// By default, all files inside `node_modules` are not transformed. But some 3rd party
// modules are published as un-transpiled, Jest will not understand the code in these modules.
// To overcome this, exclude these modules in the ignore pattern.
const untranspiledModulePatterns = [
  '((jest-)?react-native',
  '@react-native(-community)?)',
  'expo(nent)?',
  '@expo(nent)?/.*',
  '@expo-google-fonts/.*',
  'react-navigation',
  '@react-navigation/.*',
  '@unimodules/.*',
  'unimodules',
  'sentry-expo',
  'native-base',
  'react-native-svg',
  '@rneui',
];

module.exports = {
  preset: 'jest-expo',
  setupFiles: [
    '<rootDir>/jest/setup.js',
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  transformIgnorePatterns: [
    `node_modules/(?!${untranspiledModulePatterns.join('|')})`,
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
