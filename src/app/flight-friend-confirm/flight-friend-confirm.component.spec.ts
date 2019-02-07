import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightFriendConfirmComponent } from './flight-friend-confirm.component';

describe('FlightFriendConfirmComponent', () => {
  let component: FlightFriendConfirmComponent;
  let fixture: ComponentFixture<FlightFriendConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightFriendConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightFriendConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
