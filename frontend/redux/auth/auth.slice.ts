import { createAction, createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/User';
import { LoadingState } from '../store';
import {
  changePassword,
  checkEmailExists,
  getMe,
  logIn,
  signUp,
  updateAvatar,
  updateMe,
} from './auth.thunks';

interface AuthState {
  currentUser: User | null;
  isFetchingUser: boolean;
  isAuthorizing: boolean;
  isUpdatingAvatar: LoadingState;
  isUpdatingUser: LoadingState;
  isChangingPassword: LoadingState;
  changingPasswordError: string;
  isAuthError: boolean;
  authError: string;
  emailExists: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  isFetchingUser: true,
  isAuthorizing: false,
  isUpdatingAvatar: 'idle',
  isAuthError: false,
  isUpdatingUser: 'idle',
  authError: '',
  emailExists: false,
  isChangingPassword: 'idle',
  changingPasswordError: '',
};
export const logOut = createAction('auth/logout');
export const cleanAuthError = createAction('auth/cleanAuthError');

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logOut, (state) => {
        if (window !== undefined) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
        state.currentUser = null;
        state.isAuthorizing = false;
        state.isAuthError = false;
        state.authError = '';
        state.isFetchingUser = false;
        state.emailExists = false;
        state.isChangingPassword = 'idle';
        state.isUpdatingUser = 'idle';
        state.isUpdatingAvatar = 'idle';
        state.changingPasswordError = '';
      })
      .addCase(cleanAuthError, (state) => {
        state.isAuthError = false;
        state.authError = '';
      })
      .addCase(logIn.pending, (state) => {
        state.isAuthorizing = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isAuthorizing = false;
        state.isAuthError = true;
        state.authError = action.error.message || 'Something went wrong';
      })
      .addCase(logIn.fulfilled, (state, action) => {
        if (window !== undefined) {
          localStorage.setItem('accessToken', action.payload.accessToken);
          localStorage.setItem('refreshToken', action.payload.refreshToken);
        }
        state.currentUser = action.payload.user;
        state.isAuthorizing = false;
        state.isAuthError = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isAuthorizing = false;
        state.isAuthError = true;
        state.authError = action.error.message || 'Something went wrong';
      })
      .addCase(signUp.pending, (state) => {
        state.isAuthorizing = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        if (window !== undefined) {
          localStorage.setItem('accessToken', action.payload.accessToken);
          localStorage.setItem('refreshToken', action.payload.refreshToken);
        }
        state.currentUser = action.payload.user;
        state.isAuthorizing = false;
        state.isAuthError = false;
      })
      .addCase(getMe.pending, (state) => {
        state.isFetchingUser = true;
      })
      .addCase(getMe.rejected, (state) => {
        state.isFetchingUser = false;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isFetchingUser = false;
      })
      .addCase(updateAvatar.pending, (state) => {
        state.isUpdatingAvatar = 'pending';
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.isUpdatingAvatar = 'succeeded';
        state.currentUser = {
          ...(state.currentUser as User),
          picture: action.payload,
        };
      })
      .addCase(updateMe.pending, (state) => {
        state.isUpdatingUser = 'pending';
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.isUpdatingUser = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(checkEmailExists.fulfilled, (state, action) => {
        state.emailExists = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.isChangingPassword = 'pending';
        state.changingPasswordError = '';
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isChangingPassword = 'failed';
        state.changingPasswordError =
          action.error.message || 'Something went wrong';
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isChangingPassword = 'succeeded';
        state.changingPasswordError = '';
      });
  },
});

export default authSlice.reducer;
