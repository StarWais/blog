import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

import { hydrate } from '../store';
import { Post } from '../../types/Post';
import { getPostBySlug, paginatePublishedPosts } from './post.thunks';
import { LoadingState } from './../store';
import { Paginated } from '../../types/Pagination';

interface PostsState {
  paginatedResults: Paginated<Post>;
  currentPost: Post | null;
  loadingPosts: LoadingState;
  loadingPost: LoadingState;
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
      });
  },
});

export default postsSlice.reducer;
