import { TestBed } from '@angular/core/testing';

import { SystemAdminGuardService } from './system-admin-guard.service';

describe('SystemAdminGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SystemAdminGuardService = TestBed.get(SystemAdminGuardService);
    expect(service).toBeTruthy();
  });
});
