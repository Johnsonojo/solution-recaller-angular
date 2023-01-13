import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  errorMessage!: string;
  isLoading = false;
  postId = this.route.snapshot.params['postId'];

  editorStyle = {
    height: '300px',
    backgroundColor: '#ffffff',
  };

  editPostForm = this.fb.group({
    problemTitle: '',
    problemDescription: '',
    problemSolution: '',
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
  }

  get formControls() {
    return this.editPostForm.controls;
  }
  getSinglePost() {
    this.isLoading = true;

    this.postService.getSinglePost(this.postId).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.editPostForm = this.fb.group({
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
