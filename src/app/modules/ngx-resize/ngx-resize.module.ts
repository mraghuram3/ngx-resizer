import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NgxResizeComponent } from './ngx-resize.component';

import { NgxResizeLeftDirective } from './ngx-resize-left.directive';
import { NgxResizeRightDirective } from './ngx-resize-right.directive';
import { NgxResizeTopDirective } from './ngx-resize-top.directive';
import { NgxResizeBottomDirective } from './ngx-resize-bottom.directive';
import { NgxResizeDirective } from './ngx-resize.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxResizeComponent,
    NgxResizeDirective,
    NgxResizeLeftDirective,
    NgxResizeRightDirective,
    NgxResizeTopDirective,
    NgxResizeBottomDirective],
  exports: [
    NgxResizeComponent,
    NgxResizeDirective,
    NgxResizeLeftDirective,
    NgxResizeRightDirective,
    NgxResizeTopDirective,
    NgxResizeBottomDirective
  ]
})
export class NgxResizeModule { }
