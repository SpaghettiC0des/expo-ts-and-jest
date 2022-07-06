import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

export const {actions: authActions, reducer: authReducer} = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleLogin(state) {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});
