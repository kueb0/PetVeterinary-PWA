import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServices } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServices);
  const router = inject(Router); 

  if (!authService.isLoggedIn()) {
    router.navigate(['/Login']);
    return false;
  }

  const allowedRoles: string[] = route.data['allowedRoles'];

  if (allowedRoles && !authService.hasAnyRole(allowedRoles)) {
    router.navigate(['/Denegado']);
    return false;
  }

  return true;
};
