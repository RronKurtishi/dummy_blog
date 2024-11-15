import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post';
import { TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-list-item',
  standalone: true,
  imports: [RouterModule, TitleCasePipe],
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss'
})
export class PostListItemComponent {
  @Input() post: Post;
}
