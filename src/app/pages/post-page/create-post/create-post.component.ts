import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  createPostForm = this.fb.group({
    problemTitle: ['', [Validators.required, Validators.minLength(5)]],
    problemDescription: ['', [Validators.required, Validators.minLength(10)]],
    problemSolution: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get formControls() {
    return this.createPostForm.controls;
  }

  createPost() {
    if (this.createPostForm.invalid) {
      return;
    }
    this.postService.createPost(this.createPostForm.value).subscribe({
      next: (res: any) => {
        this.toast.success(res.message);
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        this.toast.error(err.error.message);
      },
    });
  }
}
