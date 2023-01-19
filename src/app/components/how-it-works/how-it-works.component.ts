import { Component, Input, OnInit } from '@angular/core';

export interface HowItWorks {
  id: number;
  imageUrl: string;
  altText: string;
  stepNumber: string;
  subTitleText: string;
  details: string;
}

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
})
export class HowItWorksComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() howItWorks!: HowItWorks;
}
