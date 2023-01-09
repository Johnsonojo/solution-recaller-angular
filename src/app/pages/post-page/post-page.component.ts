import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  postData = [
    {
      id: 'iDOne',
      problemTitle: 'Problem Title 1',
      problemDescription: 'Problem Description 1',
      problemSolution: 'Problem Solution 1',
    },
    {
      id: 'iDTwo',
      problemTitle: 'Problem Title 2',
      problemDescription: 'Problem Description 2',
      problemSolution: 'Problem Solution 2',
    },
    {
      id: 'iDThree',
      problemTitle: 'Problem Title 3',
      problemDescription: 'Problem Description 3',
      problemSolution: 'Problem Solution 3',
    },
    {
      id: 'iDFour',
      problemTitle: 'Problem Title 4',
      problemDescription: 'Problem Description 4',
      problemSolution: 'Problem Solution 4',
    },
    {
      id: 'iDFive',
      problemTitle: 'Problem Title 5',
      problemDescription: 'Problem Description 5',
      problemSolution: 'Problem Solution 5',
    },
  ];
}
