import { AppState } from '../store';

export const getCurrentUser = (state: AppState) => state.auth.currentUser;
export const isAuthorizing = (state: AppState) => state.auth.isAuthorizing;
export const isFetchingUser = (state: AppState) => state.auth.isFetchingUser;
