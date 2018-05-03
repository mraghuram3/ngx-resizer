import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxResizeComponent } from './ngx-resize.component';

describe('NgxResizeComponent', () => {
  let component: NgxResizeComponent;
  let fixture: ComponentFixture<NgxResizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxResizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxResizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
