import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  postData!: any[];
  errorMessage!: string;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe({
      next: (res: any) => {
        this.postData = res.data.paginatedUserPosts;
      },
      error: (err: any) => {
        this.errorMessage = err.error.message;
        this.postData = err.error.data;
      },
    });
  }
}
