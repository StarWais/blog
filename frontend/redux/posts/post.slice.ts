import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit';
import _ from 'lodash';

import { hydrate } from '../store';
import { Post } from '../../types/Post';
import {
  createPost,
  deletePost,
  getPostBySlug,
  paginateAllPosts,
  paginateMyPosts,
  paginatePublishedPosts,
  publishPost,
  updatePost,
} from './post.thunks';
import { LoadingState } from './../store';
import { Paginated } from '../../types/Pagination';

interface PostsState {
  paginatedResults: Paginated<Post>;
  currentPost: Post | null;
  loadingPosts: LoadingState;
  loadingPost: LoadingState;
  editablePost: Post | null;
  creatingUpdatingPost: LoadingState;
  publishingPost: LoadingState;
  publishingPostId: number | null;
  deletingPostId: number | null;
  deletingPost: LoadingState;
}

const initialState: PostsState = {
  currentPost: null,
  editablePost: null,
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
  publishingPost: 'idle',
  publishingPostId: null,
  creatingUpdatingPost: 'idle',
  deletingPost: 'idle',
  deletingPostId: null,
};

const isLoadingPosts = isPending(
  paginatePublishedPosts,
  paginateMyPosts,
  paginateAllPosts
);
const isCreatingUpdatingPost = isPending(createPost, updatePost);

const isFetchedPosts = isFulfilled(
  paginatePublishedPosts,
  paginateMyPosts,
  paginateAllPosts
);
const isCreatedUpdatedPost = isFulfilled(createPost, updatePost);

const isRejectedPosts = isRejected(
  paginatePublishedPosts,
  paginateMyPosts,
  paginateAllPosts
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state) => {
      state.paginatedResults = {
        nodes: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          totalPages: 0,
          currentPage: 0,
          totalCount: 0,
        },
      };
    },
    setEditblePost: (state, action: PayloadAction<Post | null>) => {
      state.editablePost = action.payload;
    },
    resetLoadingState: (state) => {
      state.creatingUpdatingPost = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload[postsSlice.name],
        };
      })
      .addCase(getPostBySlug.fulfilled, (state, action) => {
        state.loadingPost = 'succeeded';
        state.currentPost = action.payload;
      })
      .addCase(publishPost.pending, (state, action) => {
        state.publishingPost = 'pending';
        state.publishingPostId = action.meta.arg;
      })
      .addCase(deletePost.pending, (state, action) => {
        state.deletingPost = 'pending';
        state.deletingPostId = action.meta.arg;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.paginatedResults.nodes = state.paginatedResults.nodes.filter(
          (post) => post.id !== action.payload.id
        );
        state.deletingPost = 'succeeded';
        state.deletingPostId = null;
      })
      .addCase(publishPost.fulfilled, (state, action) => {
        state.paginatedResults.nodes = state.paginatedResults.nodes.map(
          (post) => {
            if (post.id === action.payload.id) {
              return {
                ...post,
                published: true,
              };
            }
            return post;
          }
        );
        state.publishingPost = 'succeeded';
        state.publishingPostId = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.paginatedResults.nodes = [
          action.payload,
          ...state.paginatedResults.nodes,
        ];
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.paginatedResults.nodes = state.paginatedResults.nodes.map(
          (post) => {
            if (post.id === action.payload.id) {
              return action.payload;
            }
            return post;
          }
        );
      })
      .addMatcher(isLoadingPosts, (state) => {
        state.loadingPosts = 'pending';
      })
      .addMatcher(isFetchedPosts, (state, action) => {
        state.paginatedResults = {
          nodes: _.uniqBy(
            [...state.paginatedResults.nodes, ...action.payload.nodes],
            'id'
          ),
          pageInfo: action.payload.pageInfo,
        };
        state.loadingPosts = 'succeeded';
      })
      .addMatcher(isRejectedPosts, (state) => {
        state.loadingPosts = 'failed';
      })
      .addMatcher(isCreatingUpdatingPost, (state) => {
        state.creatingUpdatingPost = 'pending';
      })
      .addMatcher(isCreatedUpdatedPost, (state) => {
        state.creatingUpdatingPost = 'succeeded';
        state.editablePost = null;
      });
  },
});

export const { reset, setEditblePost, resetLoadingState } = postsSlice.actions;

export default postsSlice.reducer;
