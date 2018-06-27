import { Component, Input, OnInit, ElementRef, HostListener } from '@angular/core';
import { Year, Slot, Course } from '../year';
import { YearlyPlanService } from '../yearly-plan.service';

@Component({
  selector: 'slot-detail',
  templateUrl: './slot-detail.component.html',
  styleUrls: ['./slot-detail.component.scss']
})
export class SlotDetailComponent implements OnInit {
  @Input() slot: Slot;

  constructor(private eRef: ElementRef) { }

  ngOnInit() {
  }

  @HostListener("document:keydown", ['$event']) onkeydown(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      if (this.eRef.nativeElement === document.activeElement) {
        this.eRef.nativeElement.click();
      }
    }
  }

}
