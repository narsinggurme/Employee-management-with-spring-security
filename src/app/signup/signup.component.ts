import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { endpoints, environment } from '../../environments/environment';

interface OtpResponse {
  status: 'success' | 'error';
  message: string;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  phoneOtpSent = false;
  phoneOtpVerified = false;
  emailOtpSent = false;
  emailOtpVerified = false;
  loading = false;

  private signupUrl = endpoints.signUpUrl;
  private sendOtpUrl = endpoints.sendOtpUrl;
  private verifyOtpUrl = endpoints.verifyOtpUrl;
  private sendEmailOtpUrl = endpoints.emailSentOtpUrl;
  private verifyEmailOtpUrl = endpoints.emailverifyOtpUrl;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['NORMAL', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      otp: ['', Validators.required],
      emailotp: ['', Validators.required]
    });
  }

  sendOtp() {
    const phone = this.signupForm.value.phone;
    this.loading = true;
    this.http.post(this.sendOtpUrl, { phone }).subscribe({
      next: (response: any) => {
        this.phoneOtpSent = true;
        this.loading = false;
        alert('OTP sent! Please use this OTP: ' + response.otp);
      },
      error: (err) => {
        console.error('Send Phone OTP Error:', err);
        this.loading = false;
        alert('Failed to send OTP. Try again.');
      }
    });
  }

  sendEmailOtp() {
    const email = this.signupForm.value.email;
    this.loading = true;
    this.http.post<OtpResponse>(this.sendEmailOtpUrl, { email }).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.status === 'success') {
          this.emailOtpSent = true;
          alert('OTP sent! Please check your email.');
        } else {
          this.emailOtpSent = false;
          alert(response.message);
        }
      },
      error: (err) => {
        console.error('Send Email OTP Error:', err);
        this.loading = false;
        alert('Failed to send OTP. Try again.');
      }
    });
  }

  verifyOtp() {
    const phone = this.signupForm.value.phone;
    const otp = this.signupForm.value.otp;
    this.loading = true;
    this.http.post(this.verifyOtpUrl, { phone, otp }).subscribe({
      next: (response) => {
        this.phoneOtpVerified = true;
        this.loading = false;
        alert('OTP verified! You can now sign up.');
      },
      error: (err) => {
        console.error('Verify Phone OTP Error:', err);
        this.loading = false;
        alert('Invalid OTP, try again.');
      }
    });
  }

  verifyEmailOtp() {
    const email = this.signupForm.value.email;
    const emailotp = this.signupForm.value.emailotp;
    this.loading = true;
    this.http.post(this.verifyEmailOtpUrl, { email, emailotp }).subscribe({
      next: (response) => {
        this.emailOtpVerified = true;
        this.loading = false;
        alert('Email OTP verified!');
      },
      error: (err) => {
        console.error('Verify Email OTP Error:', err);
        this.loading = false;
        alert('Invalid OTP, try again.');
      }
    });
  }

  onSubmit() {
    if (this.signupForm.valid && this.phoneOtpVerified && this.emailOtpVerified) {
      this.loading = true;
      this.http.post(this.signupUrl, this.signupForm.value).subscribe({
        next: () => {
          this.loading = false;
          alert('Signup successful!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.loading = false;
          console.error('Signup Error:', err);
          alert('Signup failed. Try again.');
        }
      });
    } else {
      alert('Please verify phone and email OTP before signing up.');
    }
  }
}
