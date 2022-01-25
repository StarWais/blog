import { createSlice } from '@reduxjs/toolkit';

import { hydrate } from '../store';
import { User } from '../../types/User';
import { getMe, logIn, signUp } from './auth.thunks';

interface PostsState {
  currentUser: User | null;
  isFetchingUser: boolean;
  isAuthorizing: boolean;
  isError: boolean;
  error: string;
}

const initialState: PostsState = {
  currentUser: null,
  isFetchingUser: false,
  isAuthorizing: false,
  isError: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload[authSlice.name],
        };
      })
      .addCase(logIn.pending, (state) => {
        state.isAuthorizing = true;
      })
      .addCase(signUp.pending, (state) => {
        state.isAuthorizing = true;
      })
      .addCase(getMe.pending, (state) => {
        state.isFetchingUser = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isFetchingUser = false;
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
