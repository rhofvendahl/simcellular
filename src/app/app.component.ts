import { Component } from '@angular/core';
import { ColorBag } from './models/color-bag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedShapeParent: boolean[][] = [[true]];
  colorBag: ColorBag = new ColorBag('blue');
  recieveShape($event) {
    this.selectedShapeParent = $event;
  }
  recieveColor($event) {
    this.colorBag.selected = this.colorBag[$event];
  }
}
