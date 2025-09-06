import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private baseUrl = 'http://localhost:8081/api/v1/forgot-password';

  constructor(private http: HttpClient) { }

  checkUsername(username: String): Observable<any> {
    return this.http.post(`${this.baseUrl}/check-username`, { username })
  }

  resetPassword(username: String, password: String): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset`, { username, password })
  }
}
