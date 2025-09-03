import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  private loggedIn = false;

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(): void {
    this.loggedIn = true;
  }

  logout(): void {
    this.loggedIn = false;
  }

}
