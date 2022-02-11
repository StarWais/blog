import {
  Action,
  AsyncThunk,
  configureStore,
  createAction,
  ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import { postCommentsSlice } from './comments/post/post-comments.slice';
import { authSlice } from './auth/auth.slice';
import { postsSlice } from './posts/post.slice';
import { uploadsSlice } from './uploads/uploads.slice';

const makeStore = () =>
  configureStore({
    reducer: {
      posts: postsSlice.reducer,
      auth: authSlice.reducer,
      postComments: postCommentsSlice.reducer,
      uploads: uploadsSlice.reducer,
    },
    devTools: true,
  });

export const hydrate = createAction<AppState>(HYDRATE);
export const wrapper = createWrapper(makeStore, { debug: false });
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export type LoadingState = 'idle' | 'pending' | 'succeeded' | 'failed';
