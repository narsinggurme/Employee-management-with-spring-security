import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],  
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule] 
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
    if (this.empForm.valid)
      {
      const updatedEmp: Employee = {
        ...this.empForm.getRawValue(),
        id: this.id
      };
      this.employeeService.updateEmployee(this.id, updatedEmp).subscribe(() => {
        this.gotoEmployeeList();
      });
    }
     else
    {
      this.empForm.markAllAsTouched();
    }
  }

  gotoEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
