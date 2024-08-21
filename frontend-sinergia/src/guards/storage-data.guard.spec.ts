import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { storageDataGuard } from './storage-data.guard';

describe('storageDataGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => storageDataGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
