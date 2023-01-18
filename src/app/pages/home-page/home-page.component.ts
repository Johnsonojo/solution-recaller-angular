import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  howItWorks = [
    {
      id: 1,
      imageUrl: '../../../assets/images/login.png',
      altText: 'login',
      stepNumber: 'Step 1',
      subTitleText: 'Register or Login',
      details:
        'Login if you have an account or register if you do not have one.',
    },
    {
      id: 2,
      imageUrl: '../../../assets/images/create-button.png',
      altText: 'create',
      stepNumber: 'Step 2',
      subTitleText: 'View all solutions',
      details:
        ' Click the create button on the top right corner to create a new post.',
    },
    {
      id: 3,
      imageUrl: '../../../assets/images/create-form.png',
      altText: 'create post',
      stepNumber: 'Step 3',
      subTitleText: 'Post a solution',
      details:
        'Fill in the details of the problem, such as title, description and solution(s) and click the create button.',
    },
    {
      id: 4,
      imageUrl: '../../../assets/images/search.png',
      altText: 'Search',
      stepNumber: 'Step 4',
      subTitleText: 'Recall a solution by keyword',
      details:
        'On the search page,  enter your keyword and click the recall button. Click on the "View Details" button to see the details of a problem.',
    },
    {
      id: 5,
      imageUrl: '../../../assets/images/single.png',
      altText: 'Single post',
      stepNumber: 'Step 5',
      subTitleText: 'View a single solution',
      details:
        'On the post details page, you can choose to edit or delete the post.',
    },
    {
      id: 6,
      imageUrl: '../../../assets/images/edit.png',
      altText: 'Edit',
      stepNumber: 'Step 6',
      subTitleText: 'Edit a solution',
      details:
        'You can add multiple solutions to a problem in the text editor and format it as you like.',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
