import { Component, Input, HostListener, ElementRef, Renderer, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'tooltip-content',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit, AfterViewInit {
  @Input() tooltip: any;

  content: string;
  ref: ElementRef;
  
  defaultOrientation: string;
  orientation: string;

  constructor(public element: ElementRef, private renderer: Renderer) { 
    this.defaultOrientation = "top";
  }
  
  ngOnInit(): void {
    this.tooltip.eRef = this.element;             // Bind the element to the tooltip, so that the directive can handle it.
    if (this.tooltip) {
      this.content = this.tooltip.content;
      this.ref = this.tooltip.ref;
    }
  }
  ngAfterViewInit(): void {
    // position based on `ref`
    setTimeout(this.position.bind(this));
  }

  position(): void {
    this.orientation = this.defaultOrientation;   // Reset orientation to the default -- only change in certain circumstances.
    let offset = [0, 6];
    let caretSize = 10;

    let nativeElm = this.element.nativeElement;

    let bounds = this.ref.nativeElement.getBoundingClientRect();    
    // Change width first, since it might affect height...
    if (bounds.width > 150) {
      this.renderer.setElementStyle(nativeElm, 'width', `${bounds.width}px`);
    }

    let nativeElmBounds = nativeElm.getBoundingClientRect();
    let top = bounds.top;
    let left = bounds.left;
    
    if (this.orientation === "top") {
      top = bounds.top-nativeElmBounds.height-offset[1];

      if (top < 0) {
        this.orientation = "bottom";
        top = bounds.top+bounds.height+offset[1];
        if (top < offset[1]) {top = offset[1];}
      }
      else if (top+nativeElmBounds.height+offset[1] > window.innerHeight) {
        top = window.innerHeight-nativeElmBounds.height-offset[1];
      }
    }
    if (this.orientation === "bottom") {
      top = bounds.top+bounds.height+offset[1];

      if (top+nativeElmBounds.height > window.innerHeight) {
        this.orientation = "top";
        top = bounds.top-nativeElmBounds.height-offset[1];
        if (top > window.innerHeight-nativeElmBounds.height-offset[1]) {top = window.innerHeight-nativeElmBounds.height-offset[1];}
      }
      else if (top < offset[1]) {
        top = offset[1];
      }
    }

    this.renderer.setElementStyle(nativeElm, 'top', `${top}px`);
    this.renderer.setElementStyle(nativeElm, 'left', `${left}px`);
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
