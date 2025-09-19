import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  imports: [CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {
  id!: number;
  employee: Employee = new Employee();
  employees: Employee[] = [];

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeByid(this.id).subscribe(data => {
      this.employee = data;
    });
  }

  gotoList() {
    this.router.navigate([`/employees`]);
  }

  updateEmployee(id: number): void {
    this.router.navigate(['update-employee', id]);
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      console.log('Employee Data:', data);
      this.employees = data;
    });
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
