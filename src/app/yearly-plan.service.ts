import { Injectable } from '@angular/core';
import { Year, Slot, Course, Recommendation } from './year';

@Injectable({
  providedIn: 'root'
})
export class YearlyPlanService {

  constructor() { 
    if (this.upcomingYears.length) {
      this.upcomingYears[0].upcoming = true;
    }
  }

  creditsNeeded = 30;

  upcomingYears = [
    new Year("Year 9",
      [
        new Slot(
          new Course("English", "English", 9, "ENG1PI", 1)
        ),
        new Slot(
          new Course("Functions", "Math", 9, "MAT1UI", 1, [new Course(".",".",9,".",1)])
        ),
        new Slot(
          null,
          new Recommendation("course", new Course("Science 9", "Science", 9, "SCI1PI", 1))
        ),
        new Slot(
          null,
          new Recommendation("course", new Course("Geography", "Geography", 9, "GEO1PI", 1))
        ),
        new Slot(
          null,
          new Recommendation("course", new Course("French", "French", 9, "FRN1PI", 1))
        ),
        new Slot(
          null,
          new Recommendation("elective")
        )
      ]
    ),
    new Year("Year 10"),
    new Year("Year 11"),
    new Year("Year 12"),
  ]
}
