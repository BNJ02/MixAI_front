import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../types/loginResponse.interface';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/signin`, {
      email,
      password,
    }).pipe(delay(2000));
  }

  public saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  public isAuthenticated(): boolean {
    // Vérifiez si le token existe
    const token = this.getToken();
    return !!token; // Retourne true si le token existe, sinon false
  }
}
