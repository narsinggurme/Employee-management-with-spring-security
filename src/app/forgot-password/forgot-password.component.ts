import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  step = 1;

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotForm = this.fb.group({
      username: ['', Validators.required],
      newPassword: ['', Validators.minLength(4)]
    });
  }

  onSubmit() {
    if (this.step === 1) {
      const username = this.forgotForm.get('username')?.value;
      console.log('Checking username:', username);
      // TODO: call backend to verify username
      this.step = 2;
    } else {
      const { username, newPassword } = this.forgotForm.value;
      console.log('Resetting password for:', username, '->', newPassword);
      // TODO: call backend API to reset password
      alert('Password reset successful!');
      this.router.navigate(['/login']);
    }
  }
}
