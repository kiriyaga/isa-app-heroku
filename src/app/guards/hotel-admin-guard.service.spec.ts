import { TestBed } from '@angular/core/testing';

import { HotelAdminGuardService } from './hotel-admin-guard.service';

describe('HotelAdminGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotelAdminGuardService = TestBed.get(HotelAdminGuardService);
    expect(service).toBeTruthy();
  });
});
