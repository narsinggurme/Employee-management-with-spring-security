import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-details',
  imports: [CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'] // corrected from styleUrl to styleUrls
})
export class EmployeeDetailsComponent implements OnInit {
  id!: number;
  employee: Employee = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    dept: '',
    designation: '',
    salary: 0,
    age: 0,
    joiningDate: new Date()
  };

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeByid(this.id).subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (err) => {
        console.error('Error fetching employee:', err);
      }
    });
  }

  gotoList(): void {
    this.router.navigate(['/employees']);
  }

  updateEmployee(id: number): void {
    this.router.navigate(['update-employee', id]);
  }
}
