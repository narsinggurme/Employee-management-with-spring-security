import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = environment.loginUrl;
  private refreshUrl = environment.refreshUrl;
  private logoutUrl = environment.logoutUrl;

  private loggedIn = false;
  private currentUser: string | null = null;

  private inactivityTimer: any;
  private readonly INACTIVITY_LIMIT = 10 * 60 * 1000;

  constructor(private http: HttpClient, private router: Router) {
    this.restoreSession();
    this.startInactivityWatcher();
    router: Router
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password }).pipe(
      tap(res => {
        if (res.accessToken && res.refreshToken) {
          localStorage.setItem('access_token', res.accessToken);
          localStorage.setItem('username', username);

          this.loggedIn = true;
          this.currentUser = username;
          this.resetInactivityTimer();
        }
      })
    );
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(this.refreshUrl, {}).pipe(
      tap(res => {
        if (res.accessToken) {
          localStorage.setItem('access_token', res.accessToken);
        }
        this.resetInactivityTimer();
      })
    );
  }

  logout(): Observable<any> {
    const username = localStorage.getItem('username');
    return this.http.post<any>(this.logoutUrl, { username }).pipe(
      tap(() => {
        this.clearSession();
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  getUser(): string | null {
    return this.currentUser;
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isNormalUser(): boolean {
    return this.getRole() === 'NORMAL';
  }

  restoreSession(): void {
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    if (token && username) {
      this.loggedIn = true;
      this.currentUser = username;
      this.resetInactivityTimer();
    }
  }

  clearSession(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.loggedIn = false;
    this.currentUser = null;
    this.clearInactivityTimer();
  }

  private resetInactivityTimer() {
    this.clearInactivityTimer();
    this.inactivityTimer = setTimeout(() => {
      this.clearSession();
      window.location.href = '/login';
      alert('You have been logged out due to inactivity.');
    }, this.INACTIVITY_LIMIT);
  }

  private clearInactivityTimer() {
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
  }

  private startInactivityWatcher() {
    ['mousemove', 'keydown', 'click'].forEach(event => {
      window.addEventListener(event, () => this.resetInactivityTimer());
    });
  }
}
