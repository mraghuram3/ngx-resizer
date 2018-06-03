import { Directive, HostListener, ElementRef, AfterViewInit, Renderer2, Input, EventEmitter } from '@angular/core';

import {Observable} from 'rxjs/Rx';

import 'rxjs/add/observable/fromEvent';

import { NgxResizeService, ResizeEvent } from './ngx-resize.service';

@Directive({
  selector: '[appNgxResizeTop]'
})
export class NgxResizeTopDirective  implements AfterViewInit {

  startX: number;
  startY: number;
  resizeid = '';

  constructor(private el: ElementRef, private renderer: Renderer2, private service: NgxResizeService ) { }

  @Input('resizeId')
  set resizeId(resizeId: string) {
    this.resizeid = resizeId;
  }
  ngAfterViewInit() {

    const observables = this.getObservables(this.el.nativeElement);

    observables.drags.forEach(event => {
      const obj = new ResizeEvent();
      obj.id = this.resizeid;
      obj.resize = 'top';
      obj.type = 'drags';
      obj.y = event.y;
      this.service.resize(obj);
    });

    observables.drops.forEach(event => {
      const obj = new ResizeEvent();
      obj.id = this.resizeid;
      obj.resize = 'top';
      obj.type = 'drops';
      obj.y = event.y;
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
        const x = dragStartEvent.x - dragEvent.x;
        const y = dragStartEvent.y - dragEvent.y;
        return {x, y};
      })
    );
  
    const drops = starts.concatMap(dragStartEvent => 
      ends.first().map(dragEndEvent => {
        const x = dragStartEvent.x - dragEndEvent.x;
        const y = dragStartEvent.y - dragEndEvent.y;
        return {x, y};
      })
    );
  
    return { drags, drops };
  }

}


