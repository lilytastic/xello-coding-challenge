import { TestBed, inject } from '@angular/core/testing';

import { YearlyPlanService } from './yearly-plan.service';

describe('YearlyPlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YearlyPlanService]
    });
  });

  it('should be created', inject([YearlyPlanService], (service: YearlyPlanService) => {
    expect(service).toBeTruthy();
  }));
});
