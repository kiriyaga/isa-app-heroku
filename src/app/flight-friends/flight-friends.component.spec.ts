import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightFriendsComponent } from './flight-friends.component';

describe('FlightFriendsComponent', () => {
  let component: FlightFriendsComponent;
  let fixture: ComponentFixture<FlightFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
