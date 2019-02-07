import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightPassengersComponent } from './flight-passengers.component';

describe('FlightPassengersComponent', () => {
  let component: FlightPassengersComponent;
  let fixture: ComponentFixture<FlightPassengersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightPassengersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
