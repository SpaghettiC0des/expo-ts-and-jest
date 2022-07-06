import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@rneui/themed';
import {Provider} from 'react-redux';

import {RootStackNavigator} from './navigation';
import {store} from './state';

export const Main = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};
