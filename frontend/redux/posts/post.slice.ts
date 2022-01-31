import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

import { hydrate } from '../store';
import { PaginatedPosts, Post } from '../../types/Post';
import {
  createComment,
  getPostBySlug,
  paginatePublishedPosts,
} from './post.thunks';

interface PostsState {
  paginatedResults: PaginatedPosts;
  currentPost: Post | null;
  loadingPosts: 'idle' | 'pending' | 'succeeded' | 'failed';
  creatingComment: 'idle' | 'pending' | 'succeeded' | 'failed';
  loadingPost: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: PostsState = {
  currentPost: null,
  paginatedResults: {
    nodes: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      totalPages: 0,
      currentPage: 0,
      totalCount: 0,
    },
  },
  loadingPosts: 'idle',
  loadingPost: 'idle',
  creatingComment: 'idle',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload[postsSlice.name],
        };
      })
      .addCase(paginatePublishedPosts.pending, (state) => {
        state.loadingPosts = 'pending';
      })
      .addCase(paginatePublishedPosts.fulfilled, (state, action) => {
        state.paginatedResults = {
          nodes: _.uniqBy(
            [...state.paginatedResults.nodes, ...action.payload.nodes],
            'id'
          ),
          pageInfo: action.payload.pageInfo,
        };
        state.loadingPosts = 'succeeded';
      })
      .addCase(paginatePublishedPosts.rejected, (state) => {
        state.loadingPosts = 'failed';
      })
      .addCase(getPostBySlug.fulfilled, (state, action) => {
        state.loadingPost = 'succeeded';
        state.currentPost = action.payload;
      })
      .addCase(createComment.pending, (state) => {
        state.creatingComment = 'pending';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.creatingComment = 'succeeded';
        //@ts-ignore
        state.currentPost = {
          ...state.currentPost,
          comments: [action.payload, ...state.currentPost!.comments],
        };
      });
  },
});

export default postsSlice.reducer;
