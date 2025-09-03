import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from './auth-service.service';
import { AppAuthService } from './app-auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo Project';
  constructor(public authState: AppAuthService, private router: Router) { }

  ngOnInit() {
    this.authState.restoreSession();
  }
  logout() {
    this.authState.logout();
    this.router.navigate(['/login']);
  }
}
