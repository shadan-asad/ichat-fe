import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:1337/api';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/local/register`, {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/local`, {
      identifier: user.email,
      password: user.password,
    });
  }

  isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }
}
