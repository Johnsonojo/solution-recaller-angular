import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  @Input() postId!: string;

  constructor(
    private postService: PostService,
    private toast: ToastrService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {}

  onDeletePost() {
    this.postService.deletePost(this.postId).subscribe({
      next: (res: any) => {
        window.location.href = '/posts';
        // close modal
        this.el.nativeElement.querySelector('#deleteModal').modal('hide');
      },
      error: (err) => {
        this.toast.error(err.error.message);
      },
    });
  }
}
