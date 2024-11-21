import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {

  constructor(private authService: AuthGuard, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.canActivate()) {
      this.router.navigate(['/chat']);
      return false;
    }
    return true;
  }
}
