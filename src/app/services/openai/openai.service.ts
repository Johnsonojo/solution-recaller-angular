import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  constructor(private http: HttpService) {}

  getCompletion(data: any) {
    return this.http.makePostRequest('chat', data);
  }
}
