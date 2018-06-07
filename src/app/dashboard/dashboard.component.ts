import { Component, Input, OnInit } from '@angular/core';
import { Year, Slot, Course } from '../year';
import { YearlyPlanService } from '../yearly-plan.service';

@Component({
  selector: 'x-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  constructor(private yearlyPlanService: YearlyPlanService) { }

  upcomingYears: Year[];
  selectedYear: Year;

  selectYear(year: Year): void {
    this.selectedYear = year;
  }

  importPlan(): void {
    this.upcomingYears = this.yearlyPlanService.upcomingYears as Year[];

    if (this.upcomingYears.length > 0) {
      this.selectedYear = this.upcomingYears[0];
    }
  }

  ngOnInit() {
    this.importPlan();
  }


}