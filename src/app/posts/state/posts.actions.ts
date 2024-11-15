import { createAction, props } from '@ngrx/store';
import { Post } from '../interfaces/post';

export const loadPosts = createAction(
  '[Posts Page] Load Posts'
);

export const loadPostsSuccess = createAction(
  '[Posts API] Load Posts Success',
  props<{ posts: Post[] }>()
);

export const loadPostsFailure = createAction(
  '[Posts API] Load Posts Failure',
  props<{ error: string }>()
);

export const loadSinglePost = createAction(
  '[Post Page] Load Post',
  props<{ postId: string }>()
);

export const loadSinglePostSuccess = createAction(
  '[Post API] Load Post Success',
  props<{ post: Post }>()
);

export const loadSinglePostFailure = createAction(
  '[Post API] Load Post Failure',
  props<{ error: string }>()
);

export const addPost = createAction(
  '[New Post] Add Post',
  props<{ post: Post }>()
);