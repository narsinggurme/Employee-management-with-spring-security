import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';

interface OtpResponse {
  status: 'success' | 'error';
  message: string;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  phoneotpSent: boolean = false;
  phoneOtpVer: boolean = false;
  emailOtpSent: boolean = false;
  emailOtpVerify: boolean = false;

  private signupUrl = environment.signUpUrl;
  private sendOtpUrl = environment.sendOtpUrl;
  private verifyOtpUrl = environment.verifyOtpUrl;
  private sentEmailOtpUrl = environment.emailSentOtpUrl;
  private emailverifyOtpUrl = environment.emailverifyOtpUrl;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['NORMAL', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required], // Added phone
      otp: ['', Validators.required],
      emailotp: ['', Validators.required]
    });
  }
  sendOtp() {
    const phone = this.signupForm.value.phone;
    this.http.post(this.sendOtpUrl, { phone }).subscribe({
      next: (response) => {
        this.phoneotpSent = true;
        console.log('Send OTP Response:', response);

        alert('OTP sent! Check backend console.');
      },
      error: (err) => {
        console.error('sned Phone OTP Error:', err);
        alert('Invalid OTP, try again.');
      }
    });
  }

  senOtpEmail() {
    const email = this.signupForm.value.email;
    this.http.post<OtpResponse>(this.sentEmailOtpUrl, { email }).subscribe({
      next: (response) => {
        console.log('Send OTP Response:', response);
        if (response.status === 'success') {
          this.emailOtpSent = true;
          alert("OTP sent! Please check your email.");
        } else if (response.status === 'error') {
          this.emailOtpSent = false;
          alert(response.message); // e.g. "Email already registered"
        }
      },
      error: (err) => {
        console.error('Send email OTP Error:', err);
        alert('Invalid OTP, try again.');
      }
    });
  }
  verifyOtp() {
    const phone = this.signupForm.value.phone;
    const otp = this.signupForm.value.otp;
    this.http.post(this.verifyOtpUrl, { phone, otp }).subscribe({
      next: (response) => {
        this.phoneOtpVer = true;
        console.log('Verify OTP Response:', response);
        alert('OTP verified! You can now sign up.');
      },
      error: (err) => {
        console.error('Verify Phone OTP Error:', err);
        alert('Invalid OTP, try again.');
      }
    });
  }

  veryfyEmailOtp() {
    const email = this.signupForm.value.email;
    const emailotp = this.signupForm.value.emailotp;

    this.http.post(this.emailverifyOtpUrl, { email, emailotp }).subscribe({
      next: (response) => {
        this.emailOtpVerify = true;
        console.log('Verify OTP Response:', response);
        alert('OTP verified! You can now sign up.');
      },
      error: (err) => {
        console.error('Verify email OTP Error:', err);
        alert('Invalid OTP, try again.');
      }
    });
  }


  onSubmit() {
    if (this.signupForm.valid && this.phoneOtpVer) {
      this.http.post(this.signupUrl, this.signupForm.value).subscribe({
        next: () => this.router.navigate(['/login']),
        error: err => console.error(err)
      });
    } else if (!this.phoneOtpVer) {
      alert('Please verify OTP before signing up.');
    }
  }

}
