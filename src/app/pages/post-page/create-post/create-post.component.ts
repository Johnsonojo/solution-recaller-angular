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

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block', 'link'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ color: [] }, { background: [] }],
      [{ align: ['center', 'right', 'justify'] }],
      ['clean'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ],
  };

  postForm = this.fb.group({
    problemTitle: ['', [Validators.required, Validators.minLength(20)]],
    problemDescription: ['', [Validators.required, Validators.minLength(20)]],
    tags: ['', [Validators.required]],
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
          tags: [
            res.data?.tags?.map((tag: any) => tag.name).join(', '),
            [Validators.required],
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
    this.postService
      .createPost({
        ...this.postForm.value,
        tags: this.postForm.value.tags?.split(', '),
      })
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;

          this.toast.success(res.message, '', {
            timeOut: 800,
          });
          setTimeout(() => {
            this.router.navigate(['/posts']);
          }, 1000);
        },
        error: (err) => {
          this.isLoading = false;
          this.toast.error(err.error.message);
        },
      });
  }

  updatePost() {
    this.isLoading = true;
    this.postService
      .updatePost(this.postId, {
        ...this.postForm.value,
        tags: this.postForm.value.tags?.split(', '),
      })
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.toast.success(res.message, '', {
            timeOut: 800,
          });
          setTimeout(() => {
            this.router.navigate([`/posts/${this.postId}`]);
          }, 1000);
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
