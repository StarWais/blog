import { AppState } from '../store';

export const getPosts = (state: AppState) => state.posts.paginatedResults.nodes;
export const isFetchingPosts = (state: AppState) =>
  state.posts.loading === 'pending';
export const getPageInfo = (state: AppState) =>
  state.posts.paginatedResults.pageInfo;
