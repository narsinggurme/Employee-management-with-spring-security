import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ForgotPasswordService } from '../services/forgot-password.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  step = 1;
  token: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private forgotService: ForgotPasswordService
  ) {
    this.forgotForm = this.fb.group({
      username: ['', Validators.required],
      newPassword: ['', Validators.minLength(4)],
      confirmPassword: ['']
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      if (this.token) {
        this.step = 2;

        this.forgotForm.get('username')?.clearValidators();
        this.forgotForm.get('username')?.updateValueAndValidity();

        this.forgotForm.get('newPassword')?.setValidators([Validators.required, Validators.minLength(4)]);
        this.forgotForm.get('newPassword')?.updateValueAndValidity();

        this.forgotForm.get('confirmPassword')?.setValidators([Validators.required]);
        this.forgotForm.get('confirmPassword')?.updateValueAndValidity();
      }
    });
  }

  onSubmit() {
    if (this.step === 1) {
      this.loading = true;

      const username = this.forgotForm.get('username')?.value;
      this.forgotService.sendResetLink(username).subscribe({
        // next: res => {
        //   this.loading = false;
        //   console.log("api respnose:" + res);

        //   alert(res.message || 'Reset link sent to your email!');
        //   this.router.navigate(['/home']);
        // },
        next: res => {
          console.log("api respnose:" + res);
          setTimeout(() => {
            this.loading = false;
            alert(res.message || 'Reset link sent to your email!');
            this.router.navigate(['/home']);
          }, 5000);

        },
        error: err => {
          this.loading = false;
          alert(err.error?.message || 'Error sending reset link')
        }
      });
    } else {
      const newPass = this.forgotForm.get('newPassword')?.value;
      const confirmPass = this.forgotForm.get('confirmPassword')?.value;

      if (newPass !== confirmPass) {
        this.loading = false;
        alert('Passwords do not match!');
        return;
      }

      this.forgotService.resetPasswordWithToken(this.token, newPass).subscribe({
        next: res => {
          this.loading = false;
          console.log("api response: " + res)
          alert(res.message || 'Password reset successfully!');
          this.router.navigate(['/login']);
        },
        error: err => {
          this.loading = false; // stop loader
          alert(err.error?.message || 'Something went wrong')
        }
      });
    }
  }
}
