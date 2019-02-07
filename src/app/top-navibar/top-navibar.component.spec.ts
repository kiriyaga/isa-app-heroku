import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavibarComponent } from './top-navibar.component';

describe('TopNavibarComponent', () => {
  let component: TopNavibarComponent;
  let fixture: ComponentFixture<TopNavibarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavibarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavibarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
