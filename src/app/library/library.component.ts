import { Component, OnInit } from '@angular/core';
import { ShapesService } from '../shapes.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  providers: [ShapesService]
})
export class LibraryComponent implements OnInit {
  shapes: FirebaseListObservable<any[]>;
  selectedShape: null;

  constructor(private shapesService: ShapesService) { }

  ngOnInit() {
    // debugger;
    this.shapes = this.shapesService.getShapes();
    console.log(this.shapes);
    // debugger;
  }

  shapeClass(shape) {
    if (shape == this.selectedShape) return "shape selected";
    return "shape";
  }

  selectShape(shape) {
    this.selectedShape = shape
  }
}
