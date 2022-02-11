import { createAction, createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/User';
import { LoadingState } from '../store';
import { getMe, logIn, signUp, updateAvatar } from './auth.thunks';

interface AuthState {
  currentUser: User | null;
  isFetchingUser: boolean;
  isAuthorizing: boolean;
  isUpdatingAvatar: LoadingState;
  isError: boolean;
  error: string;
}

const initialState: AuthState = {
  currentUser: null,
  isFetchingUser: false,
  isAuthorizing: false,
  isUpdatingAvatar: 'idle',
  isError: false,
  error: '',
};
export const logOut = createAction('auth/logout');
export const cleanError = createAction('auth/cleanError');

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
        state.isError = false;
        state.error = '';
        state.isFetchingUser = false;
      })
      .addCase(cleanError, (state) => {
        state.isError = false;
        state.error = '';
      })
      .addCase(logIn.pending, (state) => {
        state.isAuthorizing = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isAuthorizing = false;
        state.isError = true;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isAuthorizing = false;
        state.isError = true;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(signUp.pending, (state) => {
        state.isAuthorizing = true;
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
          ...state.currentUser,
          picture: action.payload,
        };
      })
      .addCase(logIn.fulfilled, (state, action) => {
        if (window !== undefined) {
          localStorage.setItem('accessToken', action.payload.accessToken);
          localStorage.setItem('refreshToken', action.payload.refreshToken);
        }
        state.currentUser = action.payload.user;
        state.isAuthorizing = false;
        state.isError = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        if (window !== undefined) {
          localStorage.setItem('accessToken', action.payload.accessToken);
          localStorage.setItem('refreshToken', action.payload.refreshToken);
        }
        state.currentUser = action.payload.user;
        state.isAuthorizing = false;
        state.isError = false;
      });
  },
});

export default authSlice.reducer;
