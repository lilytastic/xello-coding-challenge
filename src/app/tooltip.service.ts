import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  tooltips: any[];

  constructor() { 
    this.tooltips = [];
  }
}
