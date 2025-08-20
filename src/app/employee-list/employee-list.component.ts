import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      console.log('Employee Data:', data);
      this.employees = data;
    });
  }

  updateEmployee(id: number): void {
    this.router.navigate(['update-employee', id]);
  }

  employeeDetails(id: number): void {
    this.router.navigate(['employee-details', id]);
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployeeByid(id).subscribe({
      next: () => {
        console.log(`Employee with ID ${id} deleted successfully.`);
        this.getEmployees();
      },
      error: err => {
        console.error('Error deleting employee:', err);
      }
    });
  }
}
