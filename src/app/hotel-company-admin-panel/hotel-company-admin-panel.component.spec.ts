import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelCompanyAdminPanelComponent } from './hotel-company-admin-panel.component';

describe('HotelCompanyAdminPanelComponent', () => {
  let component: HotelCompanyAdminPanelComponent;
  let fixture: ComponentFixture<HotelCompanyAdminPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelCompanyAdminPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelCompanyAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
