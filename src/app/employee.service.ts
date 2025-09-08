// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Employee } from './employee';
// import { AuthServiceService } from './auth-service.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService {
//   private baseUrl = "http://localhost:8081/api/v1/employees";
//   private postUrl = "http://localhost:8081/api/v1/empl";

//   constructor(private http: HttpClient, private authService: AuthServiceService) { }

//   getEmployees(): Observable<Employee[]> {
//     return this.http.get<Employee[]>(this.baseUrl, { headers: this.authService.getAuthHeaders() });
//   }

//   createEmployee(employee: Employee): Observable<object> {
//     return this.http.post(this.postUrl, employee, { headers: this.authService.getAuthHeaders() });
//   }

//   getEmployeeByid(id: number): Observable<Employee> {
//     return this.http.get<Employee>(`${this.baseUrl}/${id}`, { headers: this.authService.getAuthHeaders() });
//   }

//   updateEmployee(id: number, employee: Employee): Observable<Object> {
//     return this.http.put(`${this.baseUrl}/${id}`, employee, { headers: this.authService.getAuthHeaders() });
//   }

//   deleteEmployeeByid(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.authService.getAuthHeaders() });
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = "http://localhost:8081/api/v1/employees";
  private postUrl = "http://localhost:8081/api/v1/empl";

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  createEmployee(employee: Employee): Observable<object> {
    return this.http.post(this.postUrl, employee);
  }

  getEmployeeByid(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, employee);
  }

  deleteEmployeeByid(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

