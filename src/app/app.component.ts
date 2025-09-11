import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo Project';
  constructor(public authservice: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authservice.isLoggedIn()) {
      this.router.navigate(['/employees'])
    }
    this.authservice.restoreSession();
  }
  onLogout(): void {
    this.authservice.logout().subscribe({
      next: (res) => {
        console.log("Logout API response:", res);
        alert(res.message || "Logged out successfully!");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error("Logout failed:", err);
        alert("Something went wrong while logging out.");
      }
    });
  }

}
