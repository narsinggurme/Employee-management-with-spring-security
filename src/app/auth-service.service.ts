import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loginUrl = environment.loginUrl;
  private refreshUrl = environment.refreshUrl;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password }).pipe(
      tap(response => {
        if (response) {
          if (response.accessToken) {
            localStorage.setItem('access_token', response.accessToken);
          }
          if (response.refreshToken) {
            localStorage.setItem('refresh_token', response.refreshToken);
          }
        }
      })
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(this.refreshUrl, { refreshToken }).pipe(
      tap(res => {
        if (res.accessToken) {
          localStorage.setItem('access_token', res.accessToken);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}
