import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InscriptionSuccess } from '../types/inscriptionSuccess.interface';
import { SuccessService } from '../services/success.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  public succesInscription: InscriptionSuccess | null = null;

  public loginForm: FormGroup;

  public constructor(
    private succesService: SuccessService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public ngOnInit(): void {
    this.succesInscription = this.succesService.getInscriptionData();
    console.log(this.succesInscription);

    if (this.succesInscription) {
      this.loginForm.get('email')?.setValue(this.succesInscription.email);
    }
  }

  public isInvalidField(formControlName: string): boolean {
    const field = this.loginForm.get(formControlName);
    return (field?.invalid && field?.touched) ?? true;
  }
  
  public connexion(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log(email, password);

      this.authService
        .login(email, password)
        .pipe(
          tap((response) => {
            this.authService.saveToken(response.token.access_token);
            this.router.navigate(['/chat']).then(() => {
              window.location.reload();
            });
          })
        )
        .subscribe();
    }
  }
}
