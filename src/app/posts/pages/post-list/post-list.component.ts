import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Post } from '../../interfaces/post';
import { Store } from '@ngrx/store';
import { selectAllPosts, selectPostsLoading } from '../../state/posts.selector';
import { loadPosts } from '../../state/posts.actions';
import { RouterModule } from '@angular/router';
import { PostListItemComponent } from "../../components/post-list-item/post-list-item.component";
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [RouterModule, AsyncPipe, PostListItemComponent, SpinnerComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit{
  store = inject(Store);
  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;

  ngOnInit(): void {
    this.posts$ = this.store.select(selectAllPosts);
    this.loading$ = this.store.select(selectPostsLoading);
    this.store.dispatch(loadPosts());
  }
}
