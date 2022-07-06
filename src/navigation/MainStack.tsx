import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {Navigators, Screens} from '@src/constants';
import {HomeScreen} from '@src/screens';

import type {MainStackParamList} from './types';

const {Navigator, Screen} = createStackNavigator<MainStackParamList>();

export const MainStackNavigator = () => (
  <Navigator id={Navigators.AuthStack}>
    <Screen component={HomeScreen} name={Screens.Home} />
  </Navigator>
);
