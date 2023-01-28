import { Component, Input, OnInit } from '@angular/core';

export interface Tag {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  problemTitle: string;
  problemDescription: string;
  problemSolution: string;
  tags: Tag[];
  imageUrl?: string;
}

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  cardTheme = {
    backgroundColor: '#bc9ec1',
    textColor: '#000000',
    buttonColor: '#000000',
    buttonTextColor: '#ffffff',
    tagBackgroundColor: '#ffffff',
    tagTextColor: '#000000',
  };
  constructor() {}

  ngOnInit(): void {}

  @Input() post!: Post;
  @Input() cardColor: any;
  @Input() canChangeTheme!: boolean;
}
