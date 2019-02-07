import { TestBed } from '@angular/core/testing';

import { FirstTimeGuardService } from './first-time-guard.service';

describe('FirstTimeGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirstTimeGuardService = TestBed.get(FirstTimeGuardService);
    expect(service).toBeTruthy();
  });
});
