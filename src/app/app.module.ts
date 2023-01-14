import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuillModule } from 'ngx-quill';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingNavbarComponent } from './components/landing-navbar/landing-navbar.component';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { CreatePostComponent } from './pages/post-page/create-post/create-post.component';
import { DeleteModalComponent } from './pages/post-page/delete-modal/delete-modal.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { SinglePostComponent } from './pages/post-page/single-post/single-post.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { TokenInterceptorService } from './services/token/token-interceptor.service';

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
    SinglePostComponent,
    LandingNavbarComponent,
    MainNavbarComponent,
    PostCardComponent,
    DeleteModalComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressAnimation: 'decreasing',
      progressBar: true,
    }),
    QuillModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
