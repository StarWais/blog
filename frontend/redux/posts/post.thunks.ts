import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  paginatePublishedPosts as apiPaginatePublishedPosts,
  getPostBySlug as apiGetPostBySlug,
  paginateMyPosts as apiPaginateMyPosts,
  createPost as apiCreatePost,
  updatePost as apiUpdatePost,
  publishPost as apiPublishPost,
  deletePost as apiDeletePost,
} from '../../api/posts.api';

export const paginatePublishedPosts = createAsyncThunk(
  'posts/paginatePublishedPosts',
  apiPaginatePublishedPosts
);

export const paginateMyPosts = createAsyncThunk(
  'posts/paginateMyPosts',
  apiPaginateMyPosts
);

export const getPostBySlug = createAsyncThunk(
  'posts/getPostBySlug',
  apiGetPostBySlug
);

export const createPost = createAsyncThunk('posts/create', apiCreatePost);
export const updatePost = createAsyncThunk('posts/update', apiUpdatePost);
export const publishPost = createAsyncThunk('posts/publish', apiPublishPost);
export const deletePost = createAsyncThunk('posts/delete', apiDeletePost);
