import { AppState } from '../store';

export const getPosts = (state: AppState) => state.posts.paginatedResults.nodes;
export const getCurrentPost = (state: AppState) => state.posts.currentPost;
export const isFetchingPosts = (state: AppState) =>
  state.posts.loadingPosts === 'pending';
export const getPageInfo = (state: AppState) =>
  state.posts.paginatedResults.pageInfo;
export const isCreatingComment = (state: AppState) =>
  state.posts.creatingComment === 'pending';
