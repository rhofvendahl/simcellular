import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //change if I figure out how to unwrap single object
  selectedShapeParent: boolean[][] = [[true]];
  selectedColorParent: string = "#00bfff";
  shapeReciever($event) {
    //try retreiving property of event
    this.selectedShapeParent = $event;
  }
  colorReciever($event) {
    this.selectedColorParent = $event;
    console.log("color recieved", this.selectedColorParent)
  }
}
