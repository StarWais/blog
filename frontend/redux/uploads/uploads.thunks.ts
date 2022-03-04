import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getMyUploads as apiGetMyUploads,
  uploadFile as apiUploadFile,
  deleteUpload as apiDeleteUpload,
} from '../../api/upload.api';

export const getMyUploads = createAsyncThunk(
  'uploads/getMyUploads',
  apiGetMyUploads
);
export const uploadFile = createAsyncThunk('uploads/upload', apiUploadFile);
export const deleteFile = createAsyncThunk('uploads/delete', apiDeleteUpload);
