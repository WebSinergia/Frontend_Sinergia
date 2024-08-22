import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const storageDataGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let localStorageData = localStorage.getItem('userData');
  console.log(localStorageData);

  if (localStorageData) {
    return true;
  } else {
    //router.navigate(['/']);
    return true;
  }
};
