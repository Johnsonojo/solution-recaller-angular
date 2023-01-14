import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  placeholder = 'Write your solution here...';
  isLoading = false;
  isUpdate = false;
  postId: any;
  errorMessage!: string;

  editorStyle = {
    height: '300px',
    backgroundColor: '#ffffff',
  };

  postForm = this.fb.group({
    problemTitle: ['', [Validators.required, Validators.minLength(20)]],
    problemDescription: ['', [Validators.required, Validators.minLength(20)]],
    problemSolution: ['', [Validators.required, Validators.minLength(20)]],
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((param) => {
      let type = param.get('type');
      if (type === 'edit') {
        this.postId = param.get('postId');
        this.isUpdate = true;

        this.getSinglePost();
      } else {
        this.isLoading = false;
        this.isUpdate = false;
      }
    });
  }

  get formControls() {
    return this.postForm.controls;
  }

  getSinglePost() {
    this.isLoading = true;

    this.postService.getSinglePost(this.postId).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.postForm = this.fb.group({
          problemTitle: [
            res.data.problemTitle,
            [Validators.required, Validators.minLength(5)],
          ],
          problemDescription: [
            res.data.problemDescription,
            [Validators.required, Validators.minLength(10)],
          ],
          problemSolution: [
            res.data.problemSolution,
            [Validators.required, Validators.minLength(10)],
          ],
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message;
      },
    });
  }

  createPost() {
    if (this.postForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.postService.createPost(this.postForm.value).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.toast.success(res.message);
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        this.isLoading = false;
        this.toast.error(err.error.message);
      },
    });
  }

  updatePost() {
    this.isLoading = true;
    this.postService.updatePost(this.postId, this.postForm.value).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.toast.success(res.message);
        this.router.navigate([`/posts/${this.postId}`]);
      },
      error: (err) => {
        this.isLoading = false;
        this.toast.error(err.error.message);
      },
    });
  }

  onSubmitPost() {
    if (this.isUpdate) {
      this.updatePost();
    } else {
      this.createPost();
    }
  }
}
