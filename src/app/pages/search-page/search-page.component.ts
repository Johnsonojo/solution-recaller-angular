import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';
import { allCardColors, pickRandomColor } from '../../shared/cardThemer';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  isKeywordSearchLoading = false;
  keywordSearchResult!: any[];
  keywordSearchErrorMessage!: string;

  isTagLoading = false;
  isTagSearchLoading = false;
  allTags!: any[];
  tagSearchErrorMessage!: string;
  cardColors = allCardColors;

  searchForm = this.fb.group({
    searchKeyword: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit(): void {
    this.fetchAllTags();
  }

  get formControls() {
    return this.searchForm.controls;
  }

  searchPost() {
    if (this.searchForm.invalid) {
      return;
    }
    this.isKeywordSearchLoading = true;
    this.postService.searchPost(this.searchForm.value).subscribe({
      next: (res: any) => {
        this.isKeywordSearchLoading = false;
        this.keywordSearchResult = res.userPostsResult;
        this.keywordSearchErrorMessage = '';
      },
      error: (err) => {
        this.isKeywordSearchLoading = false;
        this.keywordSearchErrorMessage = err.error.message;
      },
    });
  }

  getCardColor() {
    return pickRandomColor();
  }

  fetchAllTags() {
    this.isTagLoading = true;
    this.postService.getAllTags().subscribe({
      next: (res: any) => {
        this.isTagLoading = false;
        this.allTags = res.data;
      },
      error: (err) => {
        this.isTagLoading = false;
        this.tagSearchErrorMessage = err.error.message;
      },
    });
  }

  searchByTag(tagName: string) {
    this.isTagSearchLoading = true;
    this.postService.getAllPostsByTag(tagName).subscribe({
      next: (res: any) => {
        this.isTagSearchLoading = false;
        this.keywordSearchResult = res.data.posts;
        this.keywordSearchErrorMessage = '';
      },
      error: (err) => {
        this.isTagSearchLoading = false;
        this.keywordSearchErrorMessage = err.error.message;
      },
    });
  }
}
