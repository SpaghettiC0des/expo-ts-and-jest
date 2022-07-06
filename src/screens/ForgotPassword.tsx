import React from 'react';

import {View, Text} from 'react-native';

import {Screens} from '@src/constants';
import {AuthStackScreenProps} from '@src/navigation/types';

export const ForgotPasswordScreen = (
  _: AuthStackScreenProps<Screens.ForgotPassword>,
) => {
  return (
    <View>
      <Text>ForgotPasswordScreen</Text>
    </View>
  );
};
