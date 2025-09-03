import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppAuthService } from './app-auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AppAuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
