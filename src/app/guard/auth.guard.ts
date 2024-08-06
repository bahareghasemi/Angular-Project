import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  let result = false;
  authService.isLoggedIn$.subscribe((value: boolean) => {
    result = value;
  });

  if (!result) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};