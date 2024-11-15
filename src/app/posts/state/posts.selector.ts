import { createSelector } from '@ngrx/store';
import { AppState } from '../../core/state/app.state';
import { PostsState } from './posts.reducer';

export const selectPostsState = (state: AppState) => state.posts;

export const selectAllPosts = createSelector(
  selectPostsState,
  (state: PostsState) => state.posts
);

export const selectPostsLoading = createSelector(
  selectPostsState,
  (state: PostsState) => state.loading
);

export const selectPostById = (postId: string) => createSelector(
  selectPostsState,
  (state: PostsState) => state.posts?.find(post => post.id === postId)
);

export const selectSinglePostLoading = createSelector(
  selectPostsState,
  (state: PostsState) => state.loading
);