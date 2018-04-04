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
  selectedShapeKey: number = 0;

  constructor(private shapesService: ShapesService) { }

  ngOnInit() {
    // debugger;
    this.shapes = this.shapesService.getShapes();
  }

  shapeClass(shape) {
    if (shape.$key == this.selectedShapeKey) return "shape selected";
    return "shape";
  }

  selectShape(shape) {
    this.selectedShapeKey = shape.$key
    console.log(shape.$key);
  }
}
