import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const rolRoutingGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  
  const userRole = localStorage.getItem('rol');
  if (state.url === '/Inicio' && (userRole === 'Cliente' || userRole === 'Veterinario')) {
    router.navigate([`/${userRole}Sesion`]);
    setTimeout(()=>{
      window.location.reload();
    }, 500);
    return false;
  }

  return true;
};
