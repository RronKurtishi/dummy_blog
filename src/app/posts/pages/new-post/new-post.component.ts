import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addPost } from '../../state/posts.actions';
import { Router, RouterLink } from '@angular/router';

@Component({
   selector: 'app-new-post',
   standalone: true,
   imports: [RouterLink, ReactiveFormsModule],
   templateUrl: './new-post.component.html',
   styleUrl: './new-post.component.scss'
})
export class NewPostComponent {
   store = inject(Store);
   router = inject(Router);
   newPostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
   })

   onSubmit() {
      this.newPostForm.markAllAsTouched();
      if (this.newPostForm.valid) {
         const post = {
            id: Date.now().toString(),
            user: { id: 'john', name: 'John Doe' },
            title: this.newPostForm.value.title,
            body: this.newPostForm.value.body
         };
         this.store.dispatch(addPost({ post }));
         this.router.navigate(['/']);
      }
   }
}
