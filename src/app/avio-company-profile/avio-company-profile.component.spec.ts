import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvioCompanyProfileComponent } from './avio-company-profile.component';

describe('AvioCompanyProfileComponent', () => {
  let component: AvioCompanyProfileComponent;
  let fixture: ComponentFixture<AvioCompanyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvioCompanyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvioCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
