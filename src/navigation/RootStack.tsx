import {createStackNavigator} from '@react-navigation/stack';

import {Navigators} from '@src/constants';
import {useAppSelector} from '@src/state';
import {authSelectors} from '@src/state/slices';

import {AuthStackNavigator} from './AuthStack';
import {MainStackNavigator} from './MainStack';
import type {RootStackParamList} from './types';

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  const isLoggedIn = useAppSelector(authSelectors.isLoggedIn);
  return (
    <Navigator id={Navigators.RootStack} screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <Screen component={MainStackNavigator} name={Navigators.MainStack} />
      ) : (
        <Screen component={AuthStackNavigator} name={Navigators.AuthStack} />
      )}
    </Navigator>
  );
};
