import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
interface OtpResponse {
  status: 'success' | 'error';
  message: String;
}

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[7-9]\d{9}$/)]],
      dept: ['', Validators.required],
      designation: ['', Validators.required],
      salary: [0, Validators.required],
      age: [null, Validators.required],
      joiningDate: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.employeeService.createEmployee(this.profileForm.value).subscribe({
        next: (response) => {
          // Only called if HTTP 200–299
          console.log("API Response: " + response)
          alert('New employee added successfully.');
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          if (err.status === 409) {
            const errorBody = err.error; // your backend JSON
            if (errorBody.email) {
              // this.profileForm.get('email')?.setErrors({ exists: errorBody.message });
              console.log("API Response: " + err.error)
            }
            if (errorBody.phone) {
              // this.profileForm.get('phone')?.setErrors({ exists: errorBody.message });
              console.log("API Response: " + err.error)
            }
            alert(errorBody.message);
          } else {
            console.error('Unexpected error:', err);
          }
        }
      });
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
