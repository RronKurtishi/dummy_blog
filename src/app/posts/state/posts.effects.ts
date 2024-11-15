import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { loadPosts, loadPostsSuccess, loadPostsFailure, loadSinglePost, loadSinglePostSuccess, loadSinglePostFailure } from './posts.actions';
import { PostsService } from '../services/posts.service';
import { Post } from '../interfaces/post';
import { Store } from '@ngrx/store';
import { selectAllPosts } from './posts.selector';

@Injectable()
export class PostsEffects {
  actions$ = inject(Actions);
  postsService = inject(PostsService);
  store = inject(Store);

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      switchMap(() => this.postsService.getAllPosts()
        .pipe(
          map((posts: Post[]) => loadPostsSuccess({ posts })),
          catchError(error => of(loadPostsFailure({ error })))
        )
      )
    )
  );

  loadSinglePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSinglePost),
      withLatestFrom(this.store.select(selectAllPosts)),
      switchMap((res) => {
        const [action, posts] = res;
        const post = posts?.find(p => p.id === action.postId);
        if (!posts.length) {
          return this.postsService.getSinglePost(action.postId)
            .pipe(
              map((post: Post) => loadSinglePostSuccess({ post })),
              catchError(error => of(loadSinglePostFailure({ error })))
            )
        }
        if (post) {
          return of(loadSinglePostSuccess({ post }));
        } else {
          return of(loadSinglePostFailure({ error: 'Post not found' }));
        }
      }))
  );
}