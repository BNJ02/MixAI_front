import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user.interface';
import { delay, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Discussion } from '../types/discussion.interface';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  private apiUrl = `${environment.apiUrl}/discussions`;

  constructor(private http: HttpClient) { }

  createDiscussion(): Observable<any> {
    return this.http.post(this.apiUrl, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  deleteDiscussion(discussionId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete`, { id: discussionId });
  }

  getAllDiscussions(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.apiUrl}/all`);
  }
}
