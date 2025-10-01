import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { noFutureDateValidator } from '../validators/date-validators';

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
  employee!: Employee;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // Initialize form
    this.empForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[7-9]\d{9}$/)]],
      dept: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      age: [null, [Validators.required]],
      salary: [null, [Validators.required]],
      joiningDate: [null, [Validators.required, noFutureDateValidator]]
    });

    // Get employee ID from route
    this.id = this.route.snapshot.params['id'];

    // Fetch employee data
    this.employeeService.getEmployeeByid(this.id).subscribe({
      next: (data: Employee) => {
        this.employee = data;

        // Convert joiningDate to YYYY-MM-DD for date input
        if (this.employee.joiningDate) {
          const jd = new Date(this.employee.joiningDate);
          this.employee.joiningDate = jd.toISOString().split('T')[0];
        }

        this.empForm.patchValue(this.employee);
      },
      error: (err) => console.error('Error fetching employee:', err)
    });
  }

  onSubmit() {
    if (this.empForm.valid) {
      const updatedEmp: Employee = { ...this.empForm.getRawValue(), id: this.id };
      this.employeeService.updateEmployee(this.id, updatedEmp).subscribe({
        next: () => this.gotoEmployeeList(),
        error: (err) => console.error('Error updating employee:', err)
      });
    } else {
      this.empForm.markAllAsTouched();
    }
  }

  gotoEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
