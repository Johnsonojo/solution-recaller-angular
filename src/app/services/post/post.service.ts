import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpService) {}

  createPost(data: any) {
    return this.http.makePostRequest('post', data);
  }

  getAllPosts() {
    return this.http.makeGetRequest('post');
  }

  getSinglePost(postId: string) {
    return this.http.makeGetRequest(`post/${postId}`);
  }

  updatePost(postId: string, data: any) {
    return this.http.makePutRequest(`post/${postId}`, data);
  }

  deletePost(postId: string) {
    return this.http.makeDeleteRequest(`post/${postId}`);
  }

  searchPost(data: any) {
    const { searchKeyword } = data;
    return this.http.makeGetRequest(`search/keyword/${searchKeyword}`);
  }

  getAllTags() {
    return this.http.makeGetRequest('tags');
  }

  getAllPostsByTag(tagName: string) {
    return this.http.makeGetRequest(`tags/posts/${tagName}`);
  }
}
