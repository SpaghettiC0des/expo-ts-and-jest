import React from 'react';

import {View, Text} from 'react-native';

import {Screens} from '@src/constants';
import {AuthStackScreenProps} from '@src/navigation/types';

export const SignUpScreen = (_: AuthStackScreenProps<Screens.SignUp>) => {
  return (
    <View>
      <Text>SignUpScreen</Text>
    </View>
  );
};
