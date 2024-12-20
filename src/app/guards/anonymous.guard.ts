import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/chat']);
      return false;
    } else {
      return true;
    }
  }
}
