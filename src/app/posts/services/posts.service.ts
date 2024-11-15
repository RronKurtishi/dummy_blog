import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ALL_POSTS, GET_SINGLE_POST } from '../graphql/blog.queries';
import { map, Observable } from 'rxjs';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  apollo = inject(Apollo);

  getAllPosts(): Observable<Post[]> {
    return this.apollo.query({
      query: GET_ALL_POSTS,
      variables: {
        options: {
          paginate: {
            limit: 20
          }
        }
      }
    })
      .pipe(
        map((res: any) => res.data.posts.data)
      );
  }

  getSinglePost(id: string): Observable<Post> {
    return this.apollo.query({
      query: GET_SINGLE_POST,
      variables: {
        id
      }
    })
      .pipe(
        map((res: any) => res.data.post)
      );
  }
}
