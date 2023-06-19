import {ExpoConfig} from '@expo/config';

import packageJson from './package.json';

const plugins: ExpoConfig['plugins'] = [];

if (process.env.EAS_BUILD_PROFILE === 'devClient') {
  // exclude Flipper from non-devClient builds
  // to prevent build errors
  plugins.push([
    'expo-community-flipper',
    // match whatever version of react-native-flipper you have installed
    packageJson.devDependencies['react-native-flipper'],
  ]);
}

const getConfig = ({config}: {config: ExpoConfig}) => ({
  ...config,
  plugins,
});

export default getConfig;
