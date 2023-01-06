import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingNavbarComponent } from './components/landing-navbar/landing-navbar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { CreatePostComponent } from './pages/post-page/create-post/create-post.component';
import { EditPostComponent } from './pages/post-page/edit-post/edit-post.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { SinglePostComponent } from './pages/post-page/single-post/single-post.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    HomePageComponent,
    PostPageComponent,
    SearchPageComponent,
    NotFoundPageComponent,
    CreatePostComponent,
    EditPostComponent,
    SinglePostComponent,
    LandingNavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
