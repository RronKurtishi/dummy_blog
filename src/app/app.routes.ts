import { Routes } from '@angular/router';
import { PostListComponent } from './posts/pages/post-list/post-list.component';
import { SinglePostComponent } from './posts/pages/single-post/single-post.component';
import { NewPostComponent } from './posts/pages/new-post/new-post.component';

export const routes: Routes = [{
  path: '',
  component: PostListComponent,
  title: 'All Posts - Cool Blog About Stuff'
}, {
  path: 'post/:id',
  component: SinglePostComponent
}, { 
  path: 'new',
  component: NewPostComponent
} ,{
  path: '**',
  redirectTo: ''
}];
