import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { noFutureDateValidator } from '../validators/date-validators';

interface OtpResponse {
  status: 'success' | 'error';
  message: string;
}

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
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
      joiningDate: [null, [Validators.required, noFutureDateValidator]]
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.employeeService.createEmployee(this.profileForm.value).subscribe({
        next: (response) => {
          console.log("API Response: " + response);
          alert('New employee added successfully.');
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          if (err.status === 409) {
            const errorBody = err.error;
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
