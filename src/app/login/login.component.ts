import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  showPassword = false;

  showQuote1 = true;
  showQuote2 = false;
  showQuote3 = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/employees'])
    }

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]

    });

    this.cycleQuotes();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  private cycleQuotes(): void {
    setInterval(() => {
      if (this.showQuote1) {
        this.showQuote1 = false;
        this.showQuote2 = true;
      } else if (this.showQuote2) {
        this.showQuote2 = false;
        this.showQuote3 = true;
      } else {
        this.showQuote3 = false;
        this.showQuote1 = true;
      }
    }, 3000); // change every 3 sec
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: (res) => {
          console.log("Login success", res);

          if (res.accessToken) {
            console.log("access token in login: " + res.accessToken);
            localStorage.setItem('access_token', res.accessToken);
            localStorage.setItem('username', res.username);
            localStorage.setItem('role', res.role);
          }

          console.log("login success and username set" + res.role);

          if (res.role === 'ADMIN') {
            this.router.navigate(['/employees']);
          } else if (res.role === 'NORMAL') {
            this.router.navigate(['/profile']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          console.error("Login failed", err);
          if (err.status === 401) {
            alert('Incorrect username or password!');
          } else if (err.status === 403) {
            alert("You don't have access to this page!");
          } else if (err.status == 409) {
            alert('User already logged in from another device');
          } else {
            alert("Something went wrong. Try again later.");
          }
        }
      });
    }
  }
  openForgotPassword() {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Password reset successful!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }
}
