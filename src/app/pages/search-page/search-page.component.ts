import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  isLoading = false;
  searchResult!: any[];
  errorMessage!: string;

  searchForm = this.fb.group({
    searchKeyword: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit(): void {}

  get formControls() {
    return this.searchForm.controls;
  }

  searchPost() {
    if (this.searchForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.postService.searchPost(this.searchForm.value).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.searchResult = res.userPostsResult;
        this.errorMessage = '';
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message;
      },
    });
  }
}
