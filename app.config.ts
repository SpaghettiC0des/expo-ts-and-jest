import {ExpoConfig} from '@expo/config';

const plugins: ExpoConfig['plugins'] = [
  [
    'expo-build-properties',
    {
      ios: {
        flipper: process.env.EAS_BUILD_PROFILE === 'devClient',
      },
    },
  ],
];

const getConfig = ({config}: {config: ExpoConfig}) => ({
  ...config,
  plugins,
});

export default getConfig;
