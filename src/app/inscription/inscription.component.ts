import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { User } from '../types/user.interface';
import { InscriptionSuccess } from '../types/inscriptionSuccess.interface';
import { SuccessService } from '../services/success.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss',
})
export class InscriptionComponent {
  // Attributes
  public inscriptionForm: FormGroup;
  public inscriptionError: Error | undefined;

  // Constructor
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private successService: SuccessService
  ) {
    this.inscriptionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  // Method to check if a field is invalid
  public isInvalidField(formControlName: string): boolean {
    const field = this.inscriptionForm.get(formControlName);
    return (field?.invalid && field?.touched) ?? true;
  }

  // Method to validate the form and create a user
  public inscription(): void {
    this.inscriptionForm.markAllAsTouched();
    if (this.inscriptionForm.valid) {
      this.userService
        .createUser(this.inscriptionForm.value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.inscriptionError = error.error;
            return EMPTY;
          }),
          tap((res: Partial<User>) => {
            if(res) {
              const inscriptionSuccess: InscriptionSuccess = {
                succes: 'Inscription réussie',
                name: this.inscriptionForm.value.firstName,
                email: this.inscriptionForm.value.email,
              };
              this.successService.setInscriptionData(inscriptionSuccess);
              this.router.navigate(['/signin']);
            }
          })
        )
        .subscribe();
    }
  }
}
