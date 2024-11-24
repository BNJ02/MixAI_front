import { Injectable } from '@angular/core';
import { SignupSuccess } from '../types/signupSuccess.interface';

@Injectable({
  providedIn: 'root'
})
export class SignupSuccessService {
  private signupData: SignupSuccess | null = null;

  public setSignupData(signupData: SignupSuccess): void {
    this.signupData = signupData;
  }

  public getSignupData(): SignupSuccess | null {
    const data = this.signupData;
    this.signupData = null; // Reset the data after getting it
    return data;
  }

  constructor() { }
}
