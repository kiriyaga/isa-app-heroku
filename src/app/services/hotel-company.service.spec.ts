import { TestBed } from '@angular/core/testing';

import { HotelCompanyService } from './hotel-company.service';

describe('HotelCompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotelCompanyService = TestBed.get(HotelCompanyService);
    expect(service).toBeTruthy();
  });
});
