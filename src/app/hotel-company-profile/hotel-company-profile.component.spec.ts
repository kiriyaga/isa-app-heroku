import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelCompanyProfileComponent } from './hotel-company-profile.component';

describe('HotelCompanyProfileComponent', () => {
  let component: HotelCompanyProfileComponent;
  let fixture: ComponentFixture<HotelCompanyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelCompanyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
