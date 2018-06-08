import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { TooltipService } from "./tooltip.service";

@Directive({
  selector: '[xTooltip]'
})
export class TooltipDirective {
  @Input('content') content: string;

  enabled: Boolean;
  focused: Boolean;
  private id: string;

  @HostListener("document:click", ["$event"]) onclick(event) {
    let self = this;
    let myTooltip = this.tooltipService.tooltips.find(function(element) {
      return element.id == self.id;
    });
    
    if (this.eRef.nativeElement.contains(event.target)) {
      if (myTooltip) {
        this.hide();
      }
      else {
        this.display();
      }
    } 
    else if (!(myTooltip && myTooltip.eRef.nativeElement.contains(event.target))) {
      if (myTooltip) {
        this.hide();
      }
    }
  }

  @HostListener("focus", ['$event']) onfocus(event) {
    this.focused = true;
    //this.display();
  }
  @HostListener("blur", ['$event']) onblur(event) {
    this.focused = false;
    //this.hide();
  }

  @HostListener("document:keydown", ['$event']) onkeypress(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      if (this.focused) {
        if (this.enabled) {
          this.hide();
        }
        else {
          this.display();
        }
      }
    }
    else if (event.keyCode === 27) {
      this.hide();
    }
  }

  display(): void {
    if (this.enabled) {return;}
    this.enabled = true;

    let obj = {
      id: this.id,
      ref: this.eRef,
      content: this.content
    };
    this.tooltipService.tooltips = [];
    this.tooltipService.tooltips.push(obj);
  }
  hide(): void {
    if (!this.enabled) {return;}
    this.enabled = false;

    let self = this;
    let ind = this.tooltipService.tooltips.findIndex(function(element) {
      return element.id === self.id;
    });
    this.tooltipService.tooltips.splice(ind,1);
  }

  constructor(private tooltipService: TooltipService, private eRef: ElementRef) { 
    this.enabled = false;
    this.focused = false;
    this.id = Math.random()*9999+"";
  }

}
