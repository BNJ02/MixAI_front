import { Injectable } from '@angular/core';
import { SigninSuccess } from '../types/signinSuccess.interface';

@Injectable({
  providedIn: 'root'
})
export class SigninSuccessService {
  private signinData: SigninSuccess | null = null;

  public setSigninData(signinData: SigninSuccess): void {
    this.signinData = signinData;
  }

  public getSigninData(): SigninSuccess | null {
    const data = this.signinData;
    this.signinData = null; // Reset the data after getting it
    return data;
  }

  constructor() { }
}
