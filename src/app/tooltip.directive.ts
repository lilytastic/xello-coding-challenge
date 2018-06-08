import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { TooltipService } from "./tooltip.service";

@Directive({
  selector: '[xTooltip]'
})
export class TooltipDirective {
  @Input('content') content: string;
  @Input('tooltipBind') tooltipBind: string;

  enabled: Boolean;
  focused: Boolean;
  private id: string;

  constructor(private tooltipService: TooltipService, private eRef: ElementRef) { 
    this.enabled = false;
    this.focused = false;
    this.id = Math.random()*9999+"";
  }

  private GetTooltip(): any {
    let self = this;
    let myTooltip = this.tooltipService.tooltips.find(function(element) {
      return element.id == self.id;
    });
    return myTooltip;
  }

  @HostListener("document:click", ["$event"]) onclick(event) {
    let myTooltip = this.GetTooltip();
    
    if (this.eRef.nativeElement.contains(event.target)) {
      myTooltip ? this.hide(true) : this.display(true);
    } 
    else if (!(myTooltip && myTooltip.eRef.nativeElement.contains(event.target))) {
      myTooltip ? this.hide(true) : null;
    }
  }

  @HostListener("focus", ['$event']) onfocus(event) {
    this.focused = true;
  }
  @HostListener("blur", ['$event']) onblur(event) {
    this.focused = false;
  }

  @HostListener("document:keydown", ['$event']) onkeypress(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      this.focused && this.enabled ? this.hide() : this.display();
    }
    else if (event.keyCode === 27) {
      this.hide();
    }
  }

  display(force?: Boolean): void {
    if (this.enabled && !force) {return;}
    this.enabled = true;

    let bindElm = null;
    if (this.tooltipBind) {
      bindElm = this.eRef.nativeElement.querySelector(this.tooltipBind);
      if (!bindElm) {
        bindElm = this.eRef.nativeElement.parentElement.querySelector(this.tooltipBind);
      }
      if (!bindElm) {
        bindElm = this.eRef.nativeElement.closest(this.tooltipBind);
      }
    }

    let obj = {
      id: this.id,
      ref: this.eRef,
      bindRef: bindElm,
      content: this.content
    };
    this.tooltipService.tooltips = [];
    this.tooltipService.tooltips.push(obj);
  }
  hide(force?: Boolean): void {
    if (!this.enabled && !force) {return;}
    this.enabled = false;

    let self = this;
    let ind = this.tooltipService.tooltips.findIndex(function(element) {
      return element.id === self.id;
    });
    this.tooltipService.tooltips.splice(ind,1);
  }

}
