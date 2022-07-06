import {AnyAction, configureStore, EnhancedStore} from '@reduxjs/toolkit';
import type {ThunkMiddlewareFor} from '@reduxjs/toolkit/dist/getDefaultMiddleware';

import {rootReducer} from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = EnhancedStore<
  RootState,
  AnyAction,
  [ThunkMiddlewareFor<RootState>]
>['dispatch'];
