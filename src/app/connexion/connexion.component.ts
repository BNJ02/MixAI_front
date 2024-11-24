import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InscriptionSuccess } from '../types/inscriptionSuccess.interface';
import { SuccessService } from '../services/success.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  public signinSuccess: InscriptionSuccess | null = null;
  public signinError: Error;
  public loading: boolean = false;

  public loginForm: FormGroup;

  public constructor(
    private succesService: SuccessService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public ngOnInit(): void {
    this.signinSuccess = this.succesService.getInscriptionData();

    if (this.signinSuccess) {
      this.loginForm.get('email')?.setValue(this.signinSuccess.email);
    }
  }

  public isInvalidField(formControlName: string): boolean {
    const field = this.loginForm.get(formControlName);
    return (field?.invalid && field?.touched) ?? true;
  }
  
  public connexion(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;
      console.log(email, password);

      this.authService
        .login(email, password)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.signinError = error.error;
            this.loading = false;
            return EMPTY;
          }),
          tap((response) => {
            this.authService.saveToken(response.token.access_token);
            this.router.navigate(['/chat']).then(() => {
              this.loading = false;
            });
          })
        )
        .subscribe();
    }
  }
}
