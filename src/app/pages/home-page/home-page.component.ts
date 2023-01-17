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
      details:
        'Login if you have an account or register if you do not have one.',
    },
    {
      id: 2,
      imageUrl: '../../../assets/images/create-button.png',
      altText: 'create',
      stepNumber: 'Step 2',
      details:
        ' Click the create button on the top right corner to create a new post.',
    },
    {
      id: 3,
      imageUrl: '../../../assets/images/create.png',
      altText: 'create post',
      stepNumber: 'Step 3',
      details:
        'Fill in the details of the problem, such as title, description and solution and click the create button. You can format your solution using the in-built text editor.',
    },
    {
      id: 4,
      imageUrl: '../../../assets/images/search.png',
      altText: 'Search',
      stepNumber: 'Step 4',
      details:
        'Navigate to the search page to search for the saved problem. Enter your in the input field, click the recall button and see a list of post matching your search keyword.',
    },
    {
      id: 5,
      imageUrl: '../../../assets/images/single.png',
      altText: 'Single post',
      stepNumber: 'Step 5',
      details:
        'Once the desired solved problem has been found, click on the title of the post to see the details of a problem. you can choose to edit the problem details or delete it. If a problem more than one solution, you can just edit the problem and add the multiple solutions in the text editor and format it as you like.',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
