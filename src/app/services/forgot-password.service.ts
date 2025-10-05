import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpoints } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private baseUrl = endpoints.forgotPassword;

  constructor(private http: HttpClient) { }

  sendResetLink(username: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/send-link`, { username });
  }

  resetPasswordWithToken(token: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset`, { token, password });
  }
}
