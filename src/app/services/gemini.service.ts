import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Discussion } from '../types/discussion.interface';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}

  public askGemini(prompt: string, model: string): Observable<string> {
    return this.http
      .post<{ response: string }>(`${this.apiUrl}/gemini/prompt`, {
        prompt, 
        model,
      })
      .pipe(map((res) => res.response));
  }

  public askGeminiWithHistory(discussionId: number, prompt: string, model: string): Observable<string> {
    console.log('askGeminiWithHistory', discussionId, prompt, model);
    return this.http
      .put<{ response: string }>(`${this.apiUrl}/discussions`, {
        discussionId: discussionId,
        newMessage: prompt,
        generative_model: model,
      })
      .pipe(map((res) => res.response));
  }
}
