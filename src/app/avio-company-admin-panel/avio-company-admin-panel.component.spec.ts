import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvioCompanyAdminPanelComponent } from './avio-company-admin-panel.component';

describe('AvioCompanyAdminPanelComponent', () => {
  let component: AvioCompanyAdminPanelComponent;
  let fixture: ComponentFixture<AvioCompanyAdminPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvioCompanyAdminPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvioCompanyAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
