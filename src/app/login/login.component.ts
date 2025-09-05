import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppAuthService } from '../app-auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private authState: AppAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: (res) => {
          console.log("Login success", res);
          this.authState.login(username);
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error("Login failed", err);
          if (err.status === 404) {
            alert("Incorrect username or password!");
          }
          else if (err.status === 403) {
            alert("you don't have access of this page!");
          }
          else {
            alert("Something went wrong. Try again later.");
          }
        }
      });
    }
  }
}
