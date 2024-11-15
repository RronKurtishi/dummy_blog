import { createReducer, on } from '@ngrx/store';
import { loadPosts, loadPostsSuccess, loadPostsFailure, addPost, loadSinglePost, loadSinglePostSuccess } from './posts.actions';
import { Post } from '../interfaces/post';

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string;
}

export const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const postsReducer = createReducer(
  initialState,
  on(loadPosts, (state) => ({
    ...state,
    loading: true
  })),
  on(loadPostsSuccess, (state, { posts }) => ({
    ...state,
    posts: [
      ...state.posts, 
      ...posts.filter((post: Post) => !state.posts.find(p => p.id === post.id))
    ].sort((a, b) => Number(b.id) - Number(a.id)),
    loading: false,
    error: null
  })),
  on(loadPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(loadSinglePost, (state) => ({
    ...state,
    loading: true
  })),
  on(loadSinglePostSuccess, (state, { post }) => ({
    ...state,
    posts: [...state.posts, post],
    loading: false,
    error: null
  })),
  on(loadPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(addPost, (state, { post }) => ({
    ...state,
    posts: [...state.posts, post],
  })),
);