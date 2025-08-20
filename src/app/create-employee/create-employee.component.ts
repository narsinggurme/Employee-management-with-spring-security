import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

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
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[7-9]\d{9}$/)]],
      dept: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.employeeService.createEmployee(this.profileForm.value).subscribe({
        next: (data) => {
          console.log('Saved:', data);
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('Error saving employee:', err);
        }
      });
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}
