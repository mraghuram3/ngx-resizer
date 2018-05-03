import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { NgxResizeModule } from './modules/ngx-resize/ngx-resize.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxResizeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
