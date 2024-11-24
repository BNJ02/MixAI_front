import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user.interface';
import { delay, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  createUser(userData: User): Observable<any> {
    return this.http.post(this.apiUrl, userData).pipe(delay(1500));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }


  public getMe(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  updateUser(userData: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/update`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
