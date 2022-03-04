import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  logIn as apiLogIn,
  signUp as apiSignUp,
  getMe as apiGetMe,
  updateAvatar as apiUpdateAvatar,
  updateMe as apiUpdateMe,
  emailExists as apiEmailExists,
  changePassword as apiChangePassword,
} from '../../api/auth.api';

export const logIn = createAsyncThunk('auth/logIn', apiLogIn);
export const signUp = createAsyncThunk('auth/signUp', apiSignUp);
export const getMe = createAsyncThunk('auth/getMe', apiGetMe);
export const updateAvatar = createAsyncThunk(
  'auth/updateAvatar',
  apiUpdateAvatar
);
export const updateMe = createAsyncThunk('auth/updateMe', apiUpdateMe);
export const checkEmailExists = createAsyncThunk(
  'auth/emailExists',
  apiEmailExists
);
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  apiChangePassword
);
