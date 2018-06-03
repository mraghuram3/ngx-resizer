import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NgxResizeService {
    private eventSource: Subject<ResizeEvent> = new Subject<ResizeEvent>();
    public events: Observable<ResizeEvent> = this.eventSource.asObservable();

    constructor() {
    }

    resize(obj: ResizeEvent) {
            this.emitEvent(obj);
    }

    private emitEvent(event: ResizeEvent) {
        if (this.eventSource) {
            this.eventSource.next(event);
        }
    }

}

export class ResizeEvent{
    resize: string;
    type: string;
    id: string;
    x: number;
    y: number;
}
