import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { Paginated } from '../../../types/Pagination';

import { Comment } from '../../../types/Comment';
import { LoadingState } from '../../store';
import {
  createPostComment,
  deletePostComment,
  dislikePostComment,
  likePostComment,
  paginatePostComments,
  replyToPostComment,
} from './post-comments.thunks';

interface PostCommentsState {
  paginatedResults: Paginated<Comment>;
  loadingComments: LoadingState;
  creatingComment: LoadingState;
  replyingToComment: LoadingState;
  deletingComment: LoadingState;
  replyingTo: number | null;
}

const initialState: PostCommentsState = {
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
  loadingComments: 'idle',
  replyingToComment: 'idle',
  creatingComment: 'idle',
  deletingComment: 'idle',
  replyingTo: null,
};

export const postCommentsSlice = createSlice({
  name: 'post-comments',
  initialState,
  reducers: {
    setReplyingComment: (state, action) => {
      state.replyingTo = action.payload;
    },
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(paginatePostComments.pending, (state) => {
        state.loadingComments = 'pending';
      })
      .addCase(paginatePostComments.fulfilled, (state, action) => {
        state.paginatedResults = {
          nodes: _.uniqBy(
            [...state.paginatedResults.nodes, ...action.payload.nodes],
            'id'
          ),
          pageInfo: action.payload.pageInfo,
        };
        state.loadingComments = 'succeeded';
      })
      .addCase(paginatePostComments.rejected, (state) => {
        state.loadingComments = 'failed';
      })
      .addCase(createPostComment.pending, (state) => {
        state.creatingComment = 'pending';
      })
      .addCase(replyToPostComment.pending, (state) => {
        state.creatingComment = 'pending';
      })
      .addCase(likePostComment.fulfilled, (state, action) => {
        //@ts-ignore
        state.paginatedResults = {
          ...state.paginatedResults,
          nodes: state.paginatedResults.nodes.map((comment) => ({
            ...comment,
            likes:
              comment.id === action.payload.commentId
                ? [action.payload, ...comment.likes]
                : comment.likes,
            children: comment.children.map((child) => ({
              ...child,
              likes:
                child.id === action.payload.commentId
                  ? [action.payload, ...child.likes]
                  : child.likes,
            })),
          })),
        };
      })
      .addCase(dislikePostComment.fulfilled, (state, action) => {
        //@ts-ignore
        state.paginatedResults = {
          ...state.paginatedResults,
          nodes: state.paginatedResults.nodes.map((comment) => ({
            ...comment,
            likes: comment.likes.filter(
              (like) => like.commentId !== action.payload.commentId
            ),
            children: comment.children.map((child) => ({
              ...child,
              likes: child.likes.filter(
                (like) => like.commentId !== action.payload.commentId
              ),
            })),
          })),
        };
      })
      .addCase(createPostComment.fulfilled, (state, action) => {
        state.creatingComment = 'succeeded';
        //@ts-ignore
        state.paginatedResults = {
          ...state.paginatedResults,
          nodes: [action.payload, ...state.paginatedResults.nodes],
        };
      })
      .addCase(replyToPostComment.fulfilled, (state, action) => {
        state.creatingComment = 'succeeded';
        //@ts-ignore
        state.paginatedResults = {
          ...state.paginatedResults,
          nodes: state.paginatedResults.nodes.map((comment) => ({
            ...comment,
            children:
              action.payload.parent === comment.id
                ? [...comment.children, action.payload]
                : comment.children,
          })),
        };
      })
      .addCase(deletePostComment.pending, (state) => {
        state.deletingComment = 'pending';
      })
      .addCase(deletePostComment.fulfilled, (state, action) => {
        state.deletingComment = 'succeeded';
        //@ts-ignore
        state.paginatedResults = {
          ...state.paginatedResults,
          nodes: state
            .paginatedResults!.nodes.filter(
              (comment) => comment.id !== action.payload.id
            )
            .map((comment) => ({
              ...comment,
              children: comment.children.filter(
                (child) => child.id !== action.payload.id
              ),
            })),
        };
      });
  },
});

export const { setReplyingComment, reset } = postCommentsSlice.actions;

export default postCommentsSlice.reducer;
