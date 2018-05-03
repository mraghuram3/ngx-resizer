import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  width = 300;
  widthBackup = 300;
  height = 200;
  heightBackup = 200;
  top = 120;
  topBackup = 120;
  left = 200;
  leftBackup = 200;


  changeInWidthDrag(event: any) {
    this.width = this.widthBackup + event;
  }

  changeInWidthDrop(event: any) {
    this.widthBackup = this.widthBackup + event;
  }

  changeInWidthLeftDrag(event: any) {
    this.width = this.widthBackup + event;
    this.left = this.leftBackup - event;
  }

  changeInWidthLeftDrop(event: any) {
    this.widthBackup = this.widthBackup + event;
    this.leftBackup = this.leftBackup - event;
  }
  changeInHeighthDrag(event: any) {
    this.height = this.heightBackup + event;
  }

  changeInHeightDrop(event: any) {
    this.heightBackup = this.heightBackup + event;
  }

  changeInHeighthTopDrag(event: any) {
    this.height = this.heightBackup + event;
    this.top = this.topBackup - event;
  }

  changeInHeightTopDrop(event: any) {
    this.heightBackup = this.heightBackup + event;
    this.topBackup = this.topBackup - event;
  }
}
