import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';

import {Navigators, Screens} from '@src/constants';

// __PARAMS_LIST__
export type AuthStackParamList = {
  // __AUTH_STACK__
  [Screens.Welcome]: undefined;
  [Screens.SignIn]: undefined;
  [Screens.SignUp]: undefined;
  [Screens.ForgotPassword]: {email: string};
};

export type MainStackParamList = {
  // __MAIN_STACK__
  [Screens.Home]: undefined;
};

export type RootStackParamList = {
  // __ROOT_STACK__
  [Navigators.AuthStack]?: NavigatorScreenParams<AuthStackParamList>;
  [Navigators.MainStack]?: NavigatorScreenParams<MainStackParamList>;
};

// __STACK_SCREEN_PROPS__
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<
    StackScreenProps<AuthStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  CompositeScreenProps<
    StackScreenProps<MainStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
