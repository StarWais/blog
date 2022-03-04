import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

import { deleteFile, getMyUploads, uploadFile } from './uploads.thunks';
import { LoadingState } from '../store';
import { Picture } from '../../types/Picture';

interface PostsState {
  myUploads: Picture[];
  loadingUploads: LoadingState;
  uploading: LoadingState;
  selectedUpload: Picture | null;
  deletingUpload: LoadingState;
  deletingUploadId: number | null;
}

const initialState: PostsState = {
  myUploads: [],
  selectedUpload: null,
  loadingUploads: 'idle',
  uploading: 'idle',
  deletingUpload: 'idle',
  deletingUploadId: null,
};

export const uploadsSlice = createSlice({
  name: 'uploads',
  initialState,
  reducers: {
    setCurrentUpload: (state, action: PayloadAction<Picture>) => {
      state.selectedUpload = action.payload;
    },

    reset: (state) => {
      state.selectedUpload = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyUploads.pending, (state) => {
        state.loadingUploads = 'pending';
      })
      .addCase(uploadFile.pending, (state) => {
        state.uploading = 'pending';
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.uploading = 'succeeded';
        state.myUploads = [action.payload, ...state.myUploads];
      })
      .addCase(getMyUploads.fulfilled, (state, action) => {
        state.myUploads = action.payload;
        state.loadingUploads = 'succeeded';
      })
      .addCase(deleteFile.pending, (state, action) => {
        state.deletingUploadId = action.meta.arg;
        state.deletingUpload = 'pending';
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        if (state.selectedUpload?.id === action.payload.id) {
          state.selectedUpload = null;
        }
        state.deletingUpload = 'succeeded';
        state.deletingUploadId = null;
        state.myUploads = state.myUploads.filter(
          (upload) => upload.id !== action.payload.id
        );
      });
  },
});

export const { setCurrentUpload, reset } = uploadsSlice.actions;

export default uploadsSlice.reducer;
