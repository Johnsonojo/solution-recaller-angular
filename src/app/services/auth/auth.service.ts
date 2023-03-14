import { Injectable } from '@angular/core';
import { getTokensFromStorage, getUserFromStorage } from 'src/app/utils';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokens = getTokensFromStorage();
  userDetails = getUserFromStorage();

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
    const data = { refreshToken: this.tokens.refreshToken };
    return this.http.makePostRequest('auth/refresh-token', data);
  }

  isLoggedIn() {
    return this.tokens.accessToken ? true : false;
  }

  getAuthToken() {
    return this.tokens.accessToken;
  }

  getUserDetails() {
    return this.userDetails;
  }
}
