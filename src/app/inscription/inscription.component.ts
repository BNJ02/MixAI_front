import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { User } from '../types/user.interface';
import { SignupSuccess } from '../types/signupSuccess.interface';
import { SignupSuccessService } from '../services/signupSuccess.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss',
})
export class InscriptionComponent {
  // Attributes
  public inscriptionForm: FormGroup;
  public inscriptionError: Error | undefined;
  public loading: boolean = false;

  // Constructor
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private successService: SignupSuccessService
  ) {
    this.inscriptionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      geminiAPIkey: [''],
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
      this.loading = true;
      this.userService
        .createUser(this.inscriptionForm.value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.inscriptionError = error.error;
            this.loading = false;
            return EMPTY;
          }),
          tap((res: Partial<User>) => {
            if (res) {
              const signupSuccess: SignupSuccess = {
                succes: 'Sign up successful',
                name: this.inscriptionForm.value.firstName,
                email: this.inscriptionForm.value.email,
              };
              this.successService.setSignupData(signupSuccess);
              this.loading = false;
              this.router.navigate(['/signin']);
            }
          })
        )
        .subscribe();
    }
  }
}
