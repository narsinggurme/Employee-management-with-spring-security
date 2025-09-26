import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { FormsModule } from '@angular/forms';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  searchText: string = "";
  placeholderText = '';
  cursor = '';
  private phrases = ["Search employees by Name, Email or Department...."];
  private currentPhrase = 0;
  private currentChar = 0;

  constructor(private employeeService: EmployeeService, private router: Router) { }
  ngOnInit(): void {
    this.getEmployees();
    this.typeWriter();
    this.blinkCursor();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      console.log('Employee Data:', data);
      this.employees = data;
    });
  }

  get filteredEmployees(): Employee[] {
    if (!this.searchText) {
      return this.employees;
    }
    const lower = this.searchText.toLowerCase();
    return this.employees.filter(emp =>
      emp.name.toLowerCase().includes(lower) ||
      emp.email.toLowerCase().includes(lower) ||
      emp.dept.toLowerCase().includes(lower)
    );
  }
  employeeDetails(id: number): void {
    this.router.navigate(['employee-details', id]);
  }
  typeWriter() {
    const fullText = this.phrases[this.currentPhrase];
    if (this.currentChar < fullText.length) {
      this.placeholderText += fullText.charAt(this.currentChar);
      this.currentChar++;
      setTimeout(() => this.typeWriter(), 150);
    } else {
      setTimeout(() => this.erase(), 1500);
    }
  }

  erase() {
    if (this.currentChar > 0) {
      this.placeholderText = this.placeholderText.slice(0, -1);
      this.currentChar--;
      setTimeout(() => this.erase(), 80);
    } else {
      this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
      setTimeout(() => this.typeWriter(), 2000);
    }
  }

  blinkCursor() {
    setInterval(() => {
      this.cursor = this.cursor === '|' ? ' ' : '|';
    }, 500);
  }
}

