import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  private loggedIn = false;
  private currentUser: string | null = null;

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUser(): string | null {
    return this.currentUser;
  }

  login(username: string): void {
    this.loggedIn = true;
    this.currentUser = username;

    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', username);
  }

  restoreSession(): void {
    const savedLogin = sessionStorage.getItem('isLoggedIn');
    const savedUser = sessionStorage.getItem('username');

    if (savedLogin === 'true' && savedUser) {
      this.loggedIn = true;
      this.currentUser = savedUser;
    }
  }

  logout(): void {
    this.loggedIn = false;
    this.currentUser = null;
    sessionStorage.clear();
  }
}
