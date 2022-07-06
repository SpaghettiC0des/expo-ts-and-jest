import React from 'react';

import {Button} from '@rneui/themed';
import {View, Text} from 'react-native';

import {Screens} from '@src/constants';
import {AuthStackScreenProps} from '@src/navigation/types';

export const WelcomeScreen = ({
  navigation,
}: AuthStackScreenProps<Screens.Welcome>) => {
  return (
    <View>
      <Text>WelcomeScreen</Text>

      <Button
        title="Sign in"
        onPress={() => navigation.navigate(Screens.SignIn)}
      />
      <Button
        title="Sign up"
        onPress={() => navigation.navigate(Screens.SignUp)}
      />
      <Button
        title="Forgot password"
        onPress={() =>
          navigation.navigate(Screens.ForgotPassword, {
            email: 'foo@bar.com',
          })
        }
      />
    </View>
  );
};
