import {ExpoConfig} from '@expo/config';

const plugins: ExpoConfig['plugins'] = [
  [
    'expo-build-properties',
    {
      ios: {
        flipper: false,
      },
    },
  ],
];

const getConfig = ({config}: {config: ExpoConfig}) => ({
  ...config,
  plugins,
});

export default getConfig;
