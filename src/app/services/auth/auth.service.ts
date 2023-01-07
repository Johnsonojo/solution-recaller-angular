import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService) {}

  signup(data: any) {
    return this.http.makePostRequest('auth/register', data);
  }
}
