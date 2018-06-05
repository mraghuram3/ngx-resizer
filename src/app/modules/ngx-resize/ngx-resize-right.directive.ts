import { Directive, HostListener, ElementRef, AfterViewInit, Renderer2, Input, EventEmitter } from '@angular/core';

import {Observable} from 'rxjs/Rx';

import 'rxjs/add/observable/fromEvent';

import { NgxResizeService, ResizeEvent } from './ngx-resize.service';


@Directive({
  selector: '[appNgxResizeRight]'
})
export class NgxResizeRightDirective  implements AfterViewInit {

  startX: number;
  startY: number;
  resizeid = '';

  constructor(private el: ElementRef, private renderer: Renderer2, private service: NgxResizeService ) { }

  @Input('resizeId')
  set resizeId(resizeId: string) {
    this.resizeid = resizeId;
  }

  ngAfterViewInit() {

    this.renderer.setStyle(this.el.nativeElement, 'width', '5px');
    this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.el.nativeElement, 'right', '0px');
    this.renderer.setStyle(this.el.nativeElement, 'top', '0px');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'w-resize');

    const observables = this.getObservables(this.el.nativeElement);

    observables.drags.forEach(event => {
      const obj = new ResizeEvent();
      obj.id = this.resizeid;
      obj.resize = 'right';
      obj.type = 'drags';
      obj.x = event.x;
      this.service.resize(obj);
    });

    observables.drops.forEach(event => {
      const obj = new ResizeEvent();
      obj.id = this.resizeid;
      obj.resize = 'right';
      obj.type = 'drops';
      obj.x = event.x;
      this.service.resize(obj);
    });

  }

  getObservables(domItem) {

    const mouseEventToCoordinate = mouseEvent => {
      mouseEvent.preventDefault();
      return {
        x: mouseEvent.clientX,
        y: mouseEvent.clientY
      };
    };

    const touchEventToCoordinate = touchEvent => {
      touchEvent.preventDefault();
      return {
        x: touchEvent.changedTouches[0].clientX,
        y: touchEvent.changedTouches[0].clientY
      };
    };


    const mouseDowns = Observable.fromEvent(domItem, 'mousedown').map(mouseEventToCoordinate);
    const mouseMoves = Observable.fromEvent(window, 'mousemove').map(mouseEventToCoordinate);
    const mouseUps = Observable.fromEvent(window, 'mouseup').map(mouseEventToCoordinate);

    const touchStarts = Observable.fromEvent(domItem, 'touchstart').map(touchEventToCoordinate);
    const touchMoves = Observable.fromEvent(domItem, 'touchmove').map(touchEventToCoordinate);
    const touchEnds = Observable.fromEvent(window, 'touchend').map(touchEventToCoordinate);

    const starts = mouseDowns.merge(touchStarts);
    const moves = mouseMoves.merge(touchMoves);
    const ends = mouseUps.merge(touchEnds);

    const drags = starts.concatMap(dragStartEvent => 
      moves.takeUntil(ends).map(dragEvent => {
        const x = dragEvent.x - dragStartEvent.x;
        const y = dragEvent.y - dragStartEvent.y;
        return {x, y};
      })
    );
  
    const drops = starts.concatMap(dragStartEvent => 
      ends.first().map(dragEndEvent => {
        const x = dragEndEvent.x - dragStartEvent.x;
        const y = dragEndEvent.y - dragStartEvent.y;
        return {x, y};
      })
    );
  
    return { drags, drops };
  }

}

