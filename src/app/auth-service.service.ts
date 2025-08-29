import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loginUrl = "http://localhost:8081/api/v1/employees"; // protected API for test
  private username: string = '';
  private password: string = '';
  constructor(private http: HttpClient) { }
  
  login(username: string, password: string): Observable<any> {
    this.username = username;
    this.password = password;

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ":" + password)
    });

    return this.http.get(this.loginUrl, { headers });
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.username + ":" + this.password)
    });
  }

  logout(): Observable<any> {
    return this.http.post('http://localhost:8081/logout', {}, { withCredentials: true });
  }
}
