import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logInGuardGuard } from './log-in-guard.guard';

describe('logInGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logInGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
