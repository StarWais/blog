import { createAsyncThunk } from '@reduxjs/toolkit';
import { paginatePublishedPosts as apiPaginatePublishedPosts } from '../../services/posts.api';

export const paginatePublishedPosts = createAsyncThunk(
  'posts/paginatePublishedPosts',
  apiPaginatePublishedPosts
);
