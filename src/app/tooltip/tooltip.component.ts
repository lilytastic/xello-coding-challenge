import { Component, Input, HostListener, ElementRef, Renderer, AfterViewInit } from '@angular/core';

@Component({
  selector: 'tooltip-content',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements AfterViewInit {
  @Input() content: string;
  @Input() ref: ElementRef;

  constructor(public element: ElementRef, private renderer: Renderer) { 
  }

  ngAfterViewInit(): void {
    // position based on `ref`
    setTimeout(this.position.bind(this));
  }

  position(): void {
    let nativeElm = this.element.nativeElement;
    let nativeElmBounds = nativeElm.getBoundingClientRect();

    let bounds = this.ref.nativeElement.getBoundingClientRect();
    
    this.renderer.setElementStyle(nativeElm, 'top', `${bounds.top-nativeElmBounds.height-10}px`);
    this.renderer.setElementStyle(nativeElm, 'left', `${bounds.left}px`);
    if (bounds.width > 150) {
      this.renderer.setElementStyle(nativeElm, 'min-width', `${bounds.width}px`);
    }
  }

  @HostListener("window:resize") onWindowResize(): void {
    // update position based on `ref`
  }

}
