import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const storageDataGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let localStorageData = localStorage.getItem('userData');
  console.log(localStorageData);

  if (localStorageData) {
    console.log("true");
    return true;
  } else {
    console.log("false");
    router.navigate(['/']);
    return false;
  }
};
