import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

import { hydrate } from '../store';
import { PaginatedPosts } from '../../types/Post';
import { paginatePublishedPosts } from './post.thunks';

interface PostsState {
  paginatedResults: PaginatedPosts;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: PostsState = {
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
  loading: 'idle',
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
        state.loading = 'pending';
      })
      .addCase(paginatePublishedPosts.fulfilled, (state, action) => {
        state.paginatedResults = {
          nodes: _.uniqBy(
            [...state.paginatedResults.nodes, ...action.payload.nodes],
            'id'
          ),
          pageInfo: action.payload.pageInfo,
        };
        state.loading = 'succeeded';
      })
      .addCase(paginatePublishedPosts.rejected, (state) => {
        state.loading = 'failed';
      });
  },
});

export default postsSlice.reducer;
