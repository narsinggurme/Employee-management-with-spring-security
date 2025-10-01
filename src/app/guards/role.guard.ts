import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth-service.service';

export const adminGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const role = localStorage.getItem('role');
    if (authService.isLoggedIn() && role === 'ADMIN') {
        return true;
    } else {
        router.navigate(['/profile']);
        return false;
    }
};
