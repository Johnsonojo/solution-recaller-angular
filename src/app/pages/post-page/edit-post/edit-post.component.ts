import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  onePostDetails!: any;
  errorMessage!: string;
  isLoading = false;
  postId = this.route.snapshot.params['postId'];

  editorStyle = {
    height: '300px',
    backgroundColor: '#ffffff',
  };

  editPostForm = this.fb.group({
    problemTitle: ['', [Validators.required, Validators.minLength(5)]],
    problemDescription: ['', [Validators.required, Validators.minLength(10)]],
    problemSolution: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private postService: PostService,
    private toast: ToastrService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.getSinglePost();
    // set form values on init
    this.editPostForm.patchValue({
      problemTitle: this.onePostDetails?.problemTitle,
      problemDescription: this.onePostDetails?.problemDescription,
      problemSolution: this.onePostDetails?.problemSolution,
    });
  }

  get formControls() {
    return this.editPostForm.controls;
  }
  getSinglePost() {
    this.isLoading = true;

    this.postService.getSinglePost(this.postId).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.onePostDetails = res?.data;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message;
      },
    });
  }

  updatePost() {
    this.isLoading = true;
    this.postService
      .updatePost(this.postId, this.editPostForm.value)
      .subscribe({
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
}
