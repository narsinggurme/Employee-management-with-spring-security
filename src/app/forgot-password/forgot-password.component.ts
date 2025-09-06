import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ForgotPasswordService } from '../services/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  username: string = '';
  step = 1;

  constructor(private fb: FormBuilder, private router: Router, private forgotService: ForgotPasswordService) {
    this.forgotForm = this.fb.group({
      username: ['', Validators.required],
      newPassword: ['', Validators.minLength(4)]
    });
  }

  onSubmit() {
    if (this.step === 1) {
      const username = this.forgotForm.get('username')?.value;
      this.forgotService.checkUsername(username).subscribe({
        next: (res) => {
          alert(res.message);
          this.username = username;
          this.step = 2;
        },
        error: (err) => {
          alert(err.error.message);
        }

      });
    } else {
      const newPass = this.forgotForm.get('newPassword')?.value;
      this.forgotService.resetPassword(this.username, newPass).subscribe({
        next: (res) => {
          alert(res.message);
          this.router.navigate(["/login"])
        },
        error: (err) => {
          alert(err.message);
        }
      });
    }
  }
}
