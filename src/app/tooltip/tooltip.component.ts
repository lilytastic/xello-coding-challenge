import { Component, Input, HostListener, ElementRef, Renderer, OnInit, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'tooltip-content',
  templateUrl: './tooltip.component.html',
  animations: [
    trigger("visibility", [
      state("in", style({opacity: 1})),
      transition('void => *', [
        style({opacity: 0}),
        animate(90)
      ]),
      transition('* => void', [
        style({opacity: 0}),
        animate(90)
      ]),
    ])
  ],
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit, AfterViewInit {
  @Input() tooltip: any;

  content: string;
  ref: ElementRef;
  
  private defaultOrientation: string;
  private orientation: string;

  constructor(public element: ElementRef, private renderer: Renderer) { 
    this.defaultOrientation = "top";
  }
  
  ngOnInit(): void {
    this.tooltip.eRef = this.element;                     // Bind the element to the tooltip, so that the directive can handle it.
    if (this.tooltip) {
      this.content = this.tooltip.content;
      this.ref = this.tooltip.ref;
    }
  }
  ngAfterViewInit(): void {
    // position based on `ref`
    setTimeout(this.position.bind(this));
  }
  @HostListener("window:scroll") onWindowScroll(): void {
    this.position();
  }
  @HostListener("window:resize") onWindowResize(): void {
    this.position();
  }

  position(): void {
    this.orientation = this.defaultOrientation;           // Reset orientation to the default -- only change in certain circumstances.
    let offset = [0, 12];
    let caretSize = 10;
    let caret = this.element.nativeElement.querySelector(".caret");
    //console.log(caret);

    let nativeElm = this.element.nativeElement;
    let otherElm = this.ref.nativeElement;
    if (this.tooltip.bindRef) {otherElm = this.tooltip.bindRef;}

    let hotspotBounds = this.ref.nativeElement.getBoundingClientRect();           // Used only for caret.
    let bounds = otherElm.getBoundingClientRect();    

    if (bounds.width > 150) {                     
      this.renderer.setElementStyle(nativeElm, 'width', `${bounds.width}px`);     // Change width first, since it might affect height...
    }

    let nativeElmBounds = nativeElm.getBoundingClientRect();
    let top = bounds.top;
    let left = bounds.left;
    let caretOffset = hotspotBounds.left === bounds.left ? nativeElmBounds.width/2-12 : (hotspotBounds.left - bounds.left);
    //let left = bounds.right-nativeElmBounds.width+10;
    
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
    this.renderer.setElementStyle(caret, 'left', `${caretOffset}px`);
  }

}
