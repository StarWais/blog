import { AppState } from '../store';

export const getCurrentUser = (state: AppState) => state.auth.currentUser;
export const isAuthorizing = (state: AppState) => state.auth.isAuthorizing;
export const isFetchingUser = (state: AppState) => state.auth.isFetchingUser;
export const isAuthError = (state: AppState) => state.auth.isError;
export const getAuthError = (state: AppState) => state.auth.error;
