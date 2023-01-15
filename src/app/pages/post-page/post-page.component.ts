import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  postData!: any[];
  errorMessage!: string;
  isLoading = false;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.isLoading = true;
    this.postService.getAllPosts().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.postData = res.data.paginatedUserPosts;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.error.message;
        this.postData = err.error.data;
      },
    });
  }

  openCreatePage() {
    this.router.navigate(['posts/create-post'], {
      queryParams: { type: 'create' },
    });
  }
}
