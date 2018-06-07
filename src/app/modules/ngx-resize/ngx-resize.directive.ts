import { Directive, Input, Renderer2, ElementRef, EventEmitter,
   ViewChild, AfterViewInit, OnInit} from '@angular/core';

import { NgxResizeService, ResizeEvent } from './ngx-resize.service';

@Directive({
  selector: '[ngxResize]'
})
export class NgxResizeDirective implements OnInit, AfterViewInit {

  minWidth = 20;
  backupWidth = 10;
  minHeight = 20;
  backupHeight = 10;
  backupTop = 0;
  backupLeft = 0;

  resizeid = '';

  subscription: any;

  constructor(private renderer: Renderer2, private el: ElementRef, private service: NgxResizeService) { }

  ngOnInit() {
    this.subscription = this.service.events.subscribe((event: ResizeEvent) => {

      if(event.id === this.resizeid){
        if(event.resize === 'left' && event.type === 'drags' && this.backupWidth + event.x >= this.minWidth){
          this.setWidth(this.backupWidth + event.x);
          this.setLeft(this.backupLeft - event.x);
        }
        if(event.resize === 'left' && event.type === 'drops'  && this.backupWidth + event.x >= this.minWidth){
          this.backupWidth += event.x;
          this.backupLeft -= event.x;
        } else if (event.resize === 'left' && event.type === 'drops'  && this.backupWidth + event.x <= this.minWidth){
          this.backupWidth = this.el.nativeElement.offsetWidth;
          this.backupLeft = this.el.nativeElement.offsetLeft;
        }
        if(event.resize === 'top' && event.type === 'drags' && this.backupHeight + event.y >= this.minHeight){
          this.setHeight(this.backupHeight + event.y);
          this.setTop(this.backupTop - event.y);
        }
        if(event.resize === 'top' && event.type === 'drops' && this.backupHeight + event.y >= this.minHeight){
          this.backupHeight += event.y;
          this.backupTop -= event.y;
        } else if (event.resize === 'top' && event.type === 'drops' && this.backupHeight + event.y <= this.minHeight){
          this.backupHeight = this.el.nativeElement.offsetHeight;
          this.backupTop = this.el.nativeElement.offsetTop;
        }
        if(event.resize === 'right' && event.type === 'drags' && this.backupWidth + event.x > this.minWidth){
          this.setWidth(this.backupWidth + event.x);
        }
        if(event.resize === 'right' && event.type === 'drops' && this.backupWidth + event.x > this.minWidth){
          this.backupWidth += event.x;
        }
        if(event.resize === 'bottom' && event.type === 'drags' && this.backupHeight + event.y > this.minHeight){
          this.setHeight(this.backupHeight + event.y);
        }
        if(event.resize === 'bottom' && event.type === 'drops' && this.backupHeight + event.y > this.minHeight){
          this.backupHeight += event.y;
        }
      }
    });
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '5px');
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
    this.backupHeight = height;
    this.setHeight(this.backupHeight);
  }

  @Input('top')
  set top(top: number) {
    this.backupTop = top;
    this.setTop(this.backupTop);
  }

  @Input('left')
  set left(left: number) {
    this.backupLeft = left;
    this.setLeft(this.backupLeft);
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
