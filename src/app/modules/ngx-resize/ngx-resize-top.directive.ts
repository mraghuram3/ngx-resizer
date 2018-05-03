import { Directive, HostListener, ElementRef, AfterViewInit, Renderer2, Output, EventEmitter } from '@angular/core';

import {Observable} from 'rxjs/Rx';

import 'rxjs/add/observable/fromEvent';

@Directive({
  selector: '[appNgxResizeTop]'
})
export class NgxResizeTopDirective  implements AfterViewInit {

  startX: number;
  startY: number;

  @Output()
  drags: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  drops: EventEmitter<number> = new EventEmitter<number>();

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {

    const observables = this.getObservables(this.el.nativeElement);

    observables.drags.forEach(event => {
      // console.log('Mouse down', event);
      this.drags.emit(event.y);
    });

    observables.drops.forEach(event => {
      // console.log('Mouse move', event);
      this.drops.emit(event.y);
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


