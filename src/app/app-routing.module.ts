import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CreatePostComponent } from './pages/post-page/create-post/create-post.component';
import { EditPostComponent } from './pages/post-page/edit-post/edit-post.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { SinglePostComponent } from './pages/post-page/single-post/single-post.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'post', component: PostPageComponent },
  { path: 'post/:postId', component: SinglePostComponent },
  { path: 'post/edit-post/:postId', component: EditPostComponent },
  { path: 'post/create-post', component: CreatePostComponent },
  { path: 'search', component: SearchPageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
