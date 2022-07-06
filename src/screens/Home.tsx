import React from 'react';

import {Button} from '@rneui/themed';
import {View, Text} from 'react-native';

import {Screens} from '@src/constants';
import {MainStackScreenProps} from '@src/navigation/types';
import {useAppDispatch} from '@src/state';
import {authActions} from '@src/state/slices';

export const HomeScreen = (_: MainStackScreenProps<Screens.Home>) => {
  const dispatch = useAppDispatch();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="Simulate sign out"
        onPress={() => dispatch(authActions.toggleLogin())}
      />
    </View>
  );
};
