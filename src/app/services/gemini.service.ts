import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}

  public askGemini(prompt: string): Observable<string> {
    return this.http
      .post<{ response: string }>(`${this.apiUrl}/gemini/prompt`, {
        prompt,
      })
      .pipe(map((res) => res.response));
  }
}
