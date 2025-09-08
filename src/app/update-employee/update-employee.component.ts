import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  id!: number;
  empForm!: FormGroup;
  constructor(
    private employeeService: EmployeeService,
    private routes: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // We initialize empForm here with empty controls and validators
    // so that the template ([formGroup]) always has a valid FormGroup
    // instance from the start. This avoids runtime errors (NG01052)
    // and ensures validators are applied before API data is patched in.
    this.empForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[7-9]\d{9}$/)]],
      dept: ['', [Validators.required]]
    });

    this.id = this.routes.snapshot.params['id'];
    this.employeeService.getEmployeeByid(this.id).subscribe({
      next: (data) => {
        this.empForm = this.fb.group({
          id: [data.id],
          name: [data.name, [Validators.required, Validators.minLength(3)]],
          email: [data.email, [Validators.required, Validators.email]],
          phone: [data.phone, [Validators.required, Validators.pattern(/^[7-9]\d{9}$/)]],
          dept: [data.dept, [Validators.required]]
        });
      },
      error: (err) => {
        console.error('Error fetching employee:', err);
      }
    });
  }

  onSubmit() {
    if (this.empForm.valid) {
      const updatedEmp: Employee = {
        ...this.empForm.getRawValue(),
        id: this.id
      };
      this.employeeService.updateEmployee(this.id, updatedEmp).subscribe(() => {
        this.gotoEmployeeList();
      });
    }
    else {
      this.empForm.markAllAsTouched();
    }
  }

  gotoEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
