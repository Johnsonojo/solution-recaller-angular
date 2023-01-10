import { Injectable } from '@angular/core';
import { getAuthToken } from 'src/app/utils';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService) {}

  signup(data: any) {
    return this.http.makePostRequest('auth/register', data);
  }

  login(data: any) {
    return this.http.makePostRequest('auth/login', data);
  }

  logout(data: any) {
    return this.http.makePostRequest('auth/logout', data);
  }

  isLoggedIn() {
    const token = getAuthToken();
    return token ? true : false;
  }
}
