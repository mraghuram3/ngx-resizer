import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxResizeService } from './ngx-resize.service';

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
    NgxResizeDirective,
    NgxResizeLeftDirective,
    NgxResizeRightDirective,
    NgxResizeTopDirective,
    NgxResizeBottomDirective],
  exports: [
    NgxResizeDirective,
    NgxResizeLeftDirective,
    NgxResizeRightDirective,
    NgxResizeTopDirective,
    NgxResizeBottomDirective
  ]
})
export class NgxResizeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxResizeModule,
      providers: [ NgxResizeService ]
    };
  }
}
