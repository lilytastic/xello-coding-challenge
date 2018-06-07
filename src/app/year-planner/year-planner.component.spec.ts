import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearPlannerComponent } from './year-planner.component';

describe('YearPlannerComponent', () => {
  let component: YearPlannerComponent;
  let fixture: ComponentFixture<YearPlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearPlannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
