import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  logIn as apiLogIn,
  signUp as apiSignUp,
  getMe as apiGetMe,
} from '../../api/auth.api';

export const logIn = createAsyncThunk('auth/logIn', apiLogIn);
export const signUp = createAsyncThunk('auth/signUp', apiSignUp);
export const getMe = createAsyncThunk('auth/getMe', apiGetMe);
