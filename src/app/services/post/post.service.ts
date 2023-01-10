import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpService) {}

  getAllPosts() {
    return this.http.makeGetRequest('post');
  }

  createPost(data: any) {
    return this.http.makePostRequest('post', data);
  }
}
