import { Component, Input, HostListener, ElementRef, Renderer, AfterViewInit } from '@angular/core';

@Component({
  selector: 'tooltip-content',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements AfterViewInit {
  @Input() content: string;
  @Input() ref: ElementRef;

  defaultOrientation: string;
  orientation: string;

  constructor(public element: ElementRef, private renderer: Renderer) { 
    this.defaultOrientation = "top";
  }

  ngAfterViewInit(): void {
    // position based on `ref`
    setTimeout(this.position.bind(this));
  }

  position(): void {
    this.orientation = this.defaultOrientation;

    let nativeElm = this.element.nativeElement;
    let nativeElmBounds = nativeElm.getBoundingClientRect();

    let bounds = this.ref.nativeElement.getBoundingClientRect();
    
    let top = bounds.top-nativeElmBounds.height-10;
    let left = bounds.left;

    let caretSize = 10;
    
    if (this.orientation === "top") {
      if (top < 0) {
        this.orientation = "bottom";
        top = bounds.top+bounds.height+caretSize;
        if (top < caretSize) {top = caretSize;}
      }
      else if (top+nativeElmBounds.height+caretSize > window.innerHeight) {
        top = window.innerHeight-nativeElmBounds.height-caretSize;
      }
    }
    // Do the same vice-versa

    this.renderer.setElementStyle(nativeElm, 'top', `${top}px`);
    this.renderer.setElementStyle(nativeElm, 'left', `${left}px`);
    if (bounds.width > 150) {
      this.renderer.setElementStyle(nativeElm, 'min-width', `${bounds.width}px`);
    }
  }

  @HostListener("window:scroll") onWindowScroll(): void {
    // update position based on `ref`
    this.position();
  }

  @HostListener("window:resize") onWindowResize(): void {
    // update position based on `ref`
    this.position();
  }

}
