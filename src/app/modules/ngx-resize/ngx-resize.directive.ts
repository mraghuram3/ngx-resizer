import { Directive, Input, Renderer2, ElementRef, Output, EventEmitter, ViewChild, AfterViewInit} from '@angular/core';

import { NgxResizeComponent} from './ngx-resize.component';
@Directive({
  selector: '[appNgxResize]'
})
export class NgxResizeDirective implements AfterViewInit{

  actualWidth = 10;
  minWidth = 10;
  backupWidth = 10;
  actualHeight = 10;
  backupHeight = 10;
  actualTop = 0;
  backupTop = 0;
  actualLeft = 0;
  backupLeft = 0;

  @ViewChild(NgxResizeComponent) private child: NgxResizeComponent;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngAfterViewInit() {
    console.log(this.child);
  }

  @Output()
  private resize: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input('width')
  set width(width: number) {
    this.actualWidth = width;
    console.log(width);
    this.renderer.setStyle(this.el.nativeElement, 'width', this.actualWidth + 'px');
  }

  @Input('height')
  set height(height: number) {
    this.actualHeight = height;
    console.log(height);
    this.renderer.setStyle(this.el.nativeElement, 'height', this.actualHeight + 'px');
  }

  @Input('top')
  set top(top: number) {
    this.actualTop = top;
    this.renderer.setStyle(this.el.nativeElement, 'top', this.actualTop + 'px');
  }

  @Input('left')
  set left(left: number) {
    this.actualLeft = left;
    this.renderer.setStyle(this.el.nativeElement, 'left', this.actualLeft + 'px');
  }
}
