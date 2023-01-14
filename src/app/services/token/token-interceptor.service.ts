import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { encrypt } from 'src/app/utils';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private inject: Injector) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authService = this.inject.get(AuthService);
    let authReq = req;

    const { accessToken } = authService.tokens;

    authReq = this.addTokenToHeader(req, accessToken);

    return next.handle(authReq).pipe(
      catchError((err) => {
        if (err.status === 403) {
          // refresh token
          return this.handleRefreshToken(req, next);
        }
        return throwError(() => err);
      })
    );
  }

  handleRefreshToken(req: HttpRequest<any>, next: HttpHandler) {
    let authService = this.inject.get(AuthService);

    return authService.getNewRefreshToken().pipe(
      switchMap((res: any) => {
        const { accessToken, refreshToken } = res.data;
        const encryptedData = encrypt({ accessToken, refreshToken });
        localStorage.setItem('session', encryptedData);
        return next.handle(this.addTokenToHeader(req, accessToken));
      }),
      catchError((err) => {
        authService.logout(authService.tokens.refreshToken);
        return throwError(() => err);
      })
    );
  }

  addTokenToHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
