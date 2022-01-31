import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  paginatePublishedPosts as apiPaginatePublishedPosts,
  getPostBySlug as apiGetPostBySlug,
  createComment as apiCreateComment,
} from '../../services/posts.api';

export const paginatePublishedPosts = createAsyncThunk(
  'posts/paginatePublishedPosts',
  apiPaginatePublishedPosts
);

export const getPostBySlug = createAsyncThunk(
  'posts/getPostBySlug',
  apiGetPostBySlug
);

export const createComment = createAsyncThunk(
  'posts/createComment',
  apiCreateComment
);
