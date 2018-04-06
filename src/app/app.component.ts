import { Component } from '@angular/core';
import { Colors } from './models/colors'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //change if I figure out how to unwrap single object
  selectedShapeParent: boolean[][] = [[true]];
  colors: Colors = new Colors;
  selectedColorParent: string = this.colors.blue;

  recieveShape($event) {
    //try retreiving property of event
    this.selectedShapeParent = $event;
  }
  recieveColor($event) {
    this.selectedColorParent = $event;
  }
}
