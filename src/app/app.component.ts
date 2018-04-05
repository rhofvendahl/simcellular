import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //chagne if I figure out how to unwrap single object
  selectedShape: boolean[][] = [[true]];
  shapeReciever($event) {
    //try retreiving property of event
    this.selectedShape = $event;
  }
}
