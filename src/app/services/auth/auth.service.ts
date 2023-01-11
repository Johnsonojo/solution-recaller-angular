import { Injectable } from '@angular/core';
import {
  getAuthTokenFromStorage,
  getRefreshTokenFromStorage,
} from 'src/app/utils';
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

  getNewRefreshToken() {
    const data = {
      refreshToken: getRefreshTokenFromStorage(),
    };
    return this.http.makePostRequest('auth/refresh-token', data);
  }

  isLoggedIn() {
    const token = getAuthTokenFromStorage();
    return token ? true : false;
  }

  getAuthToken() {
    return getAuthTokenFromStorage();
  }
}
