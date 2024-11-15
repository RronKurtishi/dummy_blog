import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Post } from '../../interfaces/post';
import { Observable } from 'rxjs';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { ParagraphCasePipe } from '../../../shared/pipes/paragraph-case.pipe';
import { Store } from '@ngrx/store';
import { selectPostById, selectSinglePostLoading } from '../../state/posts.selector';
import { loadSinglePost } from '../../state/posts.actions';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [RouterModule, AsyncPipe, TitleCasePipe, ParagraphCasePipe, SpinnerComponent],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss'
})
export class SinglePostComponent implements OnInit{
  store = inject(Store);
  activatedRoute = inject(ActivatedRoute);
  post$: Observable<Post>;
  loading$: Observable<boolean>;
  title = inject(Title);
  destroyRef = inject(DestroyRef);
  
  ngOnInit() {
    const postId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.post$ = this.store.select(selectPostById(postId));
    this.loading$ = this.store.select(selectSinglePostLoading);
    this.store.dispatch(loadSinglePost({ postId }));
    this.post$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((post: Post) => {
      if (post) {
        this.title.setTitle(`${post.title} - Cool Blog About Stuff`);
      }
    });
  }
}

