import { Directive, Input, Renderer2, ElementRef, Output, EventEmitter, ViewChild} from '@angular/core';

@Directive({
  selector: '[appNgxResize]'
})
export class NgxResizeDirective {

  actualWidth = 10;
  minWidth = 10;
  backupWidth = 10;
  actualHeight = 10;
  backupHeight = 10;
  actualTop = 0;
  backupTop = 0;
  actualLeft = 0;
  backupLeft = 0;


  constructor(private renderer: Renderer2, private el: ElementRef) { }


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
