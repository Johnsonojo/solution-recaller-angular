import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  singlePost: any;
  errorMessage!: string;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.getSinglePost();
  }

  getSinglePost() {
    this.isLoading = true;
    const postId = this.route.snapshot.params['postId'];

    this.postService.getSinglePost(postId).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.singlePost = res?.data;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message;
      },
    });
  }

  OpenEditPage(postId: any) {
    this.router.navigate(['posts/create-post'], {
      queryParams: { type: 'edit', postId },
    });
  }
}
