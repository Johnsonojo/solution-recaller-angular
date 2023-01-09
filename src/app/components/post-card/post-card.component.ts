import { Component, Input, OnInit } from '@angular/core';

export interface Post {
  id: string;
  problemTitle: string;
  problemDescription: string;
  problemSolution: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() post!: Post;
}
