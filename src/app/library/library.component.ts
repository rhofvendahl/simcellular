import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ShapesService } from '../shapes.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { NgStyle } from '@angular/common';
import { ColorBag } from '../models/color-bag';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  providers: [ShapesService]
})
export class LibraryComponent implements OnInit {
  @Output() shapeSender = new EventEmitter();
  @Output() colorSender = new EventEmitter();
  @Input() childColorBag: ColorBag;

  shapes: FirebaseListObservable<any[]>;
  selectedShapeKey = 0;


  constructor(private shapesService: ShapesService) { }

  ngOnInit() {
    this.shapes = this.shapesService.getShapes();
  }

  shapeClass(shape) {
    if (shape.$key === this.selectedShapeKey) { return 'shape selected'; }
    return 'shape';
  }

  selectShape(shape) {
    this.selectedShapeKey = shape.$key;
    this.shapeSender.emit(shape);
  }

  selectColor(selectedColor) {
    console.log(selectedColor);
    this.colorSender.emit(selectedColor);
  }

  cellStyle(shapeCell) {
    if (shapeCell) { return {'background-color': this.childColorBag.selected}; }
    return {};
  }

  colorStyle(color) {
    return {'background-color': this.childColorBag[color]};
  }
}
