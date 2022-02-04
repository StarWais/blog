import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  paginatePublishedPosts as apiPaginatePublishedPosts,
  getPostBySlug as apiGetPostBySlug,
} from '../../api/posts.api';

export const paginatePublishedPosts = createAsyncThunk(
  'posts/paginatePublishedPosts',
  apiPaginatePublishedPosts
);

export const getPostBySlug = createAsyncThunk(
  'posts/getPostBySlug',
  apiGetPostBySlug
);
