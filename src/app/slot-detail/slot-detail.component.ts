import { Component, Input, OnInit } from '@angular/core';
import { Year, Slot, Course } from '../year';
import { YearlyPlanService } from '../yearly-plan.service';

@Component({
  selector: 'slot-detail',
  templateUrl: './slot-detail.component.html',
  styleUrls: ['./slot-detail.component.scss']
})
export class SlotDetailComponent implements OnInit {
  @Input() slot: Slot;

  constructor() { }

  ngOnInit() {
  }

}
