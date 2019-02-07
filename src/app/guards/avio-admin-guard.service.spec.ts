import { TestBed } from '@angular/core/testing';

import { AvioAdminGuard } from './avio-admin-guard.service';

describe('AvioAdminGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvioAdminGuard = TestBed.get(AvioAdminGuard);
    expect(service).toBeTruthy();
  });
});
