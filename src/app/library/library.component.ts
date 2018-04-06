import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ShapesService } from '../shapes.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { NgStyle } from '@angular/common';
import { Colors } from '../models/colors'

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  providers: [ShapesService]
})
export class LibraryComponent implements OnInit {
  @Output() shapeSender = new EventEmitter();
  @Output() colorSender = new EventEmitter();
  @Input() childColors: Colors;

  shapes: FirebaseListObservable<any[]>;
  selectedShapeKey: number = 0;


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

  selectColor(selectedColor) {
    console.log(selectedColor)
    this.colorSender.emit(selectedColor);
  }

  cellStyle(shapeCell) {
    if (shapeCell) return {"background-color": this.childColors.selected};
    return {};
  }

  colorStyle(color) {
    return {"background-color": this.childColors[color]}
  }
}
