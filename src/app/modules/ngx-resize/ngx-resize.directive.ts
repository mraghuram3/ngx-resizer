import { Directive, Input, Renderer2, ElementRef, EventEmitter, ViewChild} from '@angular/core';

import { NgxResizeService, ResizeEvent } from './ngx-resize.service';

@Directive({
  selector: '[appNgxResize]'
})
export class NgxResizeDirective {

  minWidth = 10;
  backupWidth = 10;
  actualHeight = 10;
  backupHeight = 10;
  actualTop = 0;
  backupTop = 0;
  actualLeft = 0;
  backupLeft = 0;

  resizeid= '';

  subscription: any;

  constructor(private renderer: Renderer2, private el: ElementRef, private service: NgxResizeService) { }

  ngOnInit(){
    this.subscription = this.service.events.subscribe((event: ResizeEvent) => {
      console.log(event);
      if(event.id === this.resizeid){
        if(event.resize === 'left' && event.type === 'drags'){
          this.setWidth(this.backupWidth + event.x);
          this.setLeft(this.backupLeft - event.x);
        }
        if(event.resize === 'left' && event.type === 'drops'){
          this.backupWidth += event.x;
          this.backupLeft -= event.x;
        }
        if(event.resize === 'top' && event.type === 'drags'){
          this.setHeight(this.backupHeight + event.y);
          this.setTop(this.backupTop - event.y);
        }
        if(event.resize === 'top' && event.type === 'drops'){
          this.backupHeight += event.y;
          this.backupTop -= event.y;
        }
        if(event.resize === 'right' && event.type === 'drags'){
          this.setWidth(this.backupWidth + event.x);
        }
        if(event.resize === 'right' && event.type === 'drops'){
          this.backupWidth += event.x;
        }
        if(event.resize === 'bottom' && event.type === 'drags'){
          this.setHeight(this.backupHeight + event.y);
        }
        if(event.resize === 'bottom' && event.type === 'drops'){
          this.backupHeight += event.y;
        }
      }
    });
  }

  @Input('resizeId')
  set resizeId(resizeId: string) {
    this.resizeid = resizeId;
  }

  @Input('width')
  set width(width: number) {
    this.backupWidth = width;
    this.setWidth(this.backupWidth);
  }

  @Input('height')
  set height(height: number) {
    this.actualHeight = height;
    this.backupHeight = height;
    this.setHeight(this.actualHeight);
  }

  @Input('top')
  set top(top: number) {
    this.actualTop = top;
    this.backupTop = top;
    this.setTop(this.actualTop);
  }

  @Input('left')
  set left(left: number) {
    this.actualLeft = left;
    this.backupLeft = left;
    this.setLeft(this.actualLeft);
  }

  setWidth(width: number){
    this.renderer.setStyle(this.el.nativeElement, 'width', width + 'px');
  }

  setHeight(height: number){
    this.renderer.setStyle(this.el.nativeElement, 'height', height + 'px');
  }

  setTop(top: number){
    this.renderer.setStyle(this.el.nativeElement, 'top', top + 'px');
  }

  setLeft(left: number){
    this.renderer.setStyle(this.el.nativeElement, 'left', left + 'px');
  }
}
