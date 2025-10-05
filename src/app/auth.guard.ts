import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const role = localStorage.getItem('role');
  const expectedRole = route.data?.['role'];

  console.log("Expected role: " + expectedRole)

  if (expectedRole && role !== expectedRole) {
    if (role === 'NORMAL') {
      router.navigate(['/profile']);
    } else {
      console.log("inside else..........");
      router.navigate(['/login']);
    }
    return false;
  }

  return true;
};
