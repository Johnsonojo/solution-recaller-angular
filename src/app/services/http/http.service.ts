import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  base_url = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  makeGetRequest(endpoint: string) {
    return this.http.get(`${this.base_url}/${endpoint}`);
  }
  makePostRequest(endpoint: string, data: any) {
    return this.http.post(`${this.base_url}/${endpoint}`, data);
  }

  makePutRequest(endpoint: string, data: any) {
    return this.http.put(`${this.base_url}/${endpoint}`, data);
  }
}
