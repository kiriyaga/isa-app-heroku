import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSeatAdminComponent } from './flight-seat-admin.component';

describe('FlightSeatAdminComponent', () => {
  let component: FlightSeatAdminComponent;
  let fixture: ComponentFixture<FlightSeatAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightSeatAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSeatAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
