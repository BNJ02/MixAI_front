import { Injectable } from '@angular/core';
import { InscriptionSuccess } from '../types/inscriptionSuccess.interface';

@Injectable({
  providedIn: 'root'
})
export class SuccessService {
  private inscriptionData: InscriptionSuccess | null = null;

  public setInscriptionData(inscriptionData: InscriptionSuccess): void {
    this.inscriptionData = inscriptionData;
  }

  public getInscriptionData(): InscriptionSuccess | null {
    const data = this.inscriptionData;
    this.inscriptionData = null; // Reset the data after getting it
    return data;
  }

  constructor() { }
}
