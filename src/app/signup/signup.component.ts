import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  otpSent: boolean = false;
  otpVerified: boolean = false;
  private signupUrl = environment.signUpUrl;
  private sendOtpUrl = environment.sendOtpUrl;
  private verifyOtpUrl = environment.verifyOtpUrl;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['NORMAL', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required], // Added phone
      otp: ['', Validators.required]
    });
  }
  sendOtp() {
    const phone = this.signupForm.value.phone;
    this.http.post(this.sendOtpUrl, { phone }).subscribe({
      next: () => {
        this.otpSent = true;
        alert('OTP sent! Check backend console.');
      },
      error: err => console.error(err)
    });
  }
  verifyOtp() {
    const phone = this.signupForm.value.phone;
    const otp = this.signupForm.value.otp;
    this.http.post(this.verifyOtpUrl, { phone, otp }).subscribe({
      next: () => {
        this.otpVerified = true;
        alert('OTP verified! You can now sign up.');
      },
      error: () => alert('Invalid OTP, try again.')
    });
  }


  onSubmit() {
    if (this.signupForm.valid && this.otpVerified) {
      this.http.post(this.signupUrl, this.signupForm.value).subscribe({
        next: () => this.router.navigate(['/login']),
        error: err => console.error(err)
      });
    } else if (!this.otpVerified) {
      alert('Please verify OTP before signing up.');
    }
  }

}
