import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminOptionsComponent } from './system-admin-options.component';

describe('SystemAdminOptionsComponent', () => {
  let component: SystemAdminOptionsComponent;
  let fixture: ComponentFixture<SystemAdminOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAdminOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAdminOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
