import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth-service.service';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getAccessToken();

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        const refreshToken = authService.getRefreshToken();

        if (refreshToken) {
          return authService.refreshToken(refreshToken).pipe(
            switchMap((res: any) => {
              const newToken = res.accessToken;
              if (newToken) {
                const newReq = req.clone({
                  setHeaders: { Authorization: `Bearer ${newToken}` }
                });
                return next(newReq);
              } else {
                authService.clearTokens();
                router.navigate(['/login']);
                return throwError(() => error);
              }
            }),
            catchError(err => {
              authService.clearTokens();
              router.navigate(['/login']);
              return throwError(() => err);
            })
          );
        } else {
          authService.clearTokens();
          router.navigate(['/login']);
          return throwError(() => error);
        }
      }
      return throwError(() => error);
    })
  );
};
