import {createSelector} from '@reduxjs/toolkit';

import type {RootState} from '@src/state/store';

export const authSelectors = {
  isLoggedIn: createSelector(
    (s: RootState) => s.auth,
    auth => auth.isLoggedIn,
  ),
};
