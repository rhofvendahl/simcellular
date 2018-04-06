import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ShapesService } from '../shapes.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  providers: [ShapesService]
})
export class LibraryComponent implements OnInit {
  @Output() shapeSender = new EventEmitter();
  @Output() colorSender = new EventEmitter();

  shapes: FirebaseListObservable<any[]>;
  selectedShapeKey: number = 0;
  // selectedColor = {'background-color':'#777777'};
  selectedColor: string = '#00bfff';


  constructor(private shapesService: ShapesService) { }

  ngOnInit() {
    // debugger;
    this.shapes = this.shapesService.getShapes();
    // this.shapeSender.emit(this.shapesService.getShapeByKey(0));
    // this.colorSender.emit(this.selectedColor);
  }

  shapeClass(shape) {
    if (shape.$key == this.selectedShapeKey) return "shape selected";
    return "shape";
  }

  selectShape(shape) {
    this.selectedShapeKey = shape.$key;
    this.shapeSender.emit(shape);
  }

  selectColor(color) {
    this.selectedColor = color;
    this.colorSender.emit(color);
  }

  cellStyle() {
    return {"background-color": this.selectedColor}
  }
  cellStyle(shapeCell) {
    if (shapeCell) return {"background-color": this.selectedColor};
    return {};
  }
}
