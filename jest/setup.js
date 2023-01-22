import 'react-native-gesture-handler/jestSetup';
// import fetchMock from 'jest-fetch-mock';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-opi
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Uncomment this if you want to mock redux-persist
// jest.mock('redux-persist', () => {
//   const real = jest.requireActual('redux-persist');
//   return {
//     ...real,
//     persistReducer: jest
//       .fn()
//       .mockImplementation((config, reducers) => reducers),
//   };
// });

// Uncomment this if you want to mock redux-toolkit
// jest.mock('@reduxjs/toolkit', () => {
//   const real = jest.requireActual('@reduxjs/toolkit');
//   return {
//     ...real,
//     configureStore: jest.fn().mockImplementation(() => ({
//       dispatch: jest.fn(),
//       getState: jest.fn(),
//       subscribe: jest.fn(),
//     })),
//   };
// });

jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      BUILD_MODE: process.env.BUILD_MODE,
    },
  },
}));

// uncomment this if you want to mock expo-auth-session
// jest.mock('expo-auth-session', () => {
//   const real = jest.requireActual('expo-auth-session');
//   return {
//     ...real,
//     useAuthRequest: jest.fn(() => [jest.fn(), null, jest.fn()]),
//     useAutoDiscovery: jest.fn(),
//     makeRedirectUri: jest.fn(),
//   };
// });

// Uncomment this if you want to mock react-native-keyboard-aware-scroll-view
// jest.mock('react-native-keyboard-aware-scroll-view', () => {
//   const rn = require('react-native');
//   return {
//     KeyboardAwareScrollView: rn.ScrollView,
//   };
// });

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const fs = require('fs');
  const json = JSON.parse(
    fs.readFileSync('node_modules/react-native/package.json', 'utf8'),
  );
  const platform = jest.requireActual(
    'react-native/Libraries/Utilities/Platform',
  );
  const [major, minor, patch] = json.version.toString().split('.');
  return {
    ...platform,
    constants: {
      ...platform.constants,
      reactNativeVersion: {
        major,
        minor,
        patch,
      },
    },
  };
});

// fetchMock.enableMocks();
