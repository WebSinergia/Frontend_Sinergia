import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const storageDataGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  let localStorageData = '';
  if (localStorageData === 'X') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }  
};
