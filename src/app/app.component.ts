import { Component } from '@angular/core';
import { ColorBag } from './models/color-bag'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //change if I figure out how to unwrap single object
  selectedShapeParent: boolean[][] = [[true]];
  colorBag: ColorBag = new ColorBag("blue");
//colorbag is defined here
  recieveShape($event) {
    //try retreiving property of event
    this.selectedShapeParent = $event;
  }
  recieveColor($event) {
    this.colorBag.selected = this.colorBag[$event];
  }
}
