import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['NORMAL', Validators.required],
      email: ['', Validators.email]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.http.post('http://localhost:8081/api/v1/signup', this.signupForm.value)
        .subscribe({
          next: () => this.router.navigate(['/login']),
          error: err => console.error(err)
        });
    }
  }

}
