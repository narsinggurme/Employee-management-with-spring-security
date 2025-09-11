import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = environment.loginUrl;
  private refreshUrl = environment.refreshUrl;
  private logoutUrl = environment.logoutUrl;

  private loggedIn = false;
  private currentUser: string | null = null;

  constructor(private http: HttpClient) {
    this.restoreSession();
  }

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
          localStorage.setItem('username', username);

          this.loggedIn = true;
          this.currentUser = username;
        }
      })
    );
  }

  refreshToken(refreshToken: string): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(this.refreshUrl, { refreshToken }).pipe(
      tap(res => {
        if (res.accessToken) {
          localStorage.setItem('access_token', res.accessToken);
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

  logout(): Observable<any> {
    const username = localStorage.getItem('username');
    return this.http.post<any>(this.logoutUrl, { username }).pipe(
      tap(() => {
        this.loggedIn = false;
        this.currentUser = null;
        localStorage.clear();
        sessionStorage.clear();
      })
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUser(): string | null {
    return this.currentUser;
  }

  public restoreSession(): void {
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    if (token && username) {
      this.loggedIn = true;
      this.currentUser = username;
    }
  }

  public clearTokens(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}
