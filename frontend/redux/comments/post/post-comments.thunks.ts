import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createComment as apiCreatePostComment,
  replyToComment as apiReplyToPostComment,
  deleteComment as apiDeletePostComment,
  likeComment as apiLikePostComment,
  paginateComments as apiPaginatePostComments,
} from '../../../api/comments/post/post-comments.api';

export const createPostComment = createAsyncThunk(
  'post-comments/create',
  apiCreatePostComment
);

export const paginatePostComments = createAsyncThunk(
  'post-comments/get',
  apiPaginatePostComments
);

export const replyToPostComment = createAsyncThunk(
  'post-comments/reply',
  apiReplyToPostComment
);

export const likePostComment = createAsyncThunk(
  'post-comments/like',
  apiLikePostComment
);
export const dislikePostComment = createAsyncThunk(
  'post-comments/dislike',
  apiLikePostComment
);
export const deletePostComment = createAsyncThunk(
  'post-comments/delete',
  apiDeletePostComment
);
