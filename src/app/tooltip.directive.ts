import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { TooltipService } from "./tooltip.service";

@Directive({
  selector: '[xTooltip]'
})
export class TooltipDirective {
  @Input('content') content: string;

  enabled: Boolean;
  private id: string;

  @HostListener("document:click", ["$event"]) onclick(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      this.display();
    } else {
      this.hide();
    }
  }
  @HostListener("document:keydown", ['$event']) onkeypress(event) {
    if (event.keyCode === 27) {
      this.hide();
    }
  }
  @HostListener("focus", ['$event']) onfocus(event) {
    this.display();
  }
  @HostListener("blur", ['$event']) onblur(event) {
    this.hide();
  }

  display(): void {
    if (this.enabled) {return;}
    this.enabled = true;
    let obj = {
      id: this.id,
      ref: this.eRef,
      content: this.content
    };
    this.tooltipService.tooltips.push(obj);
  }
  hide(): void {
    if (!this.enabled) {return;}
    this.enabled = false;
    let self = this;
    let ind = this.tooltipService.tooltips.find(function(element) {
      return element.id == self.id;
    });
    this.tooltipService.tooltips.splice(ind,1);
  }

  constructor(private tooltipService: TooltipService, private eRef: ElementRef) { 
    this.enabled = false;
    this.id = Math.random()*9999+"";
  }

}
