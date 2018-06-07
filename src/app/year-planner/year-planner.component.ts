import { Component, OnInit, Input } from '@angular/core';
import { Year, Slot, Course } from '../year';
import { YearlyPlanService } from '../yearly-plan.service';

@Component({
  selector: 'x-year-planner',
  templateUrl: './year-planner.component.html',
  styleUrls: ['./year-planner.component.scss']
})
export class YearPlannerComponent implements OnInit {
  @Input() year: Year;

  yearlyPlan: YearlyPlanService;
  
  constructor(public yearlyPlanService: YearlyPlanService) { 
    this.yearlyPlan = yearlyPlanService;
  }

  ngOnInit() {
    console.log(this.year);
    let self = this;
  }

}
