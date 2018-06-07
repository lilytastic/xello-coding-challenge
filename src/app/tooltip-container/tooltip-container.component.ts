import { Component, OnInit } from '@angular/core';
import { TooltipService } from "../tooltip.service";

@Component({
  selector: 'tooltip-container',
  templateUrl: './tooltip-container.component.html',
  styleUrls: ['./tooltip-container.component.scss']
})
export class TooltipContainerComponent implements OnInit {

  constructor(private tooltipService: TooltipService) { }

  ngOnInit() {
  }

}
