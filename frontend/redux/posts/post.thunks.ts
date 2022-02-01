import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  paginatePublishedPosts as apiPaginatePublishedPosts,
  getPostBySlug as apiGetPostBySlug,
  createComment as apiCreateComment,
  replyToComment as apiReplyToComment,
  likeComment as apiLikeComment,
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

export const replyToComment = createAsyncThunk(
  'posts/replyToComment',
  apiReplyToComment
);

export const likeComment = createAsyncThunk(
  'posts/likeComment',
  apiLikeComment
);
