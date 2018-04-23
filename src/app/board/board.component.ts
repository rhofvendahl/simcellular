import { Component, OnInit, Input } from '@angular/core';
import { Cell } from '../models/cell';
import { Game } from '../models/game';
import { Library } from '../models/library';
import { ShapesService } from '../shapes.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { ColorBag } from '../models/color-bag';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [ShapesService]
})

export class BoardComponent implements OnInit {
  @Input() selectedShape: boolean[][];
  @Input() childColorBag: ColorBag;

  game: Game = new Game(30, 30);
  animationInterval;

  constructor(private shapesService: ShapesService) {
  }

  ngOnInit() {
    this.random();
  }

  cellStyle(cell) {
    if (cell.state) { return {'background-color': cell.color}; }
    return {};
  }

  clickCell(cell) {
    if (this.selectedShape.length === 1 && cell.state) {
      cell.state = false;
    } else {
      this.game.insert(cell, this.selectedShape, this.childColorBag.selected);
    }
  }

  pause() {
    clearInterval(this.animationInterval);
  }

  stepForward() {
    clearInterval(this.animationInterval);
    this.game.update();
  }

  play() {
    clearInterval(this.animationInterval);
    this.animationInterval = setInterval(() => {this.game.update(); }, 150);
  }

  fastForward() {
    clearInterval(this.animationInterval);
    this.animationInterval = setInterval(() => {this.game.update(); }, 50);
  }

  clear() {
    clearInterval(this.animationInterval);
    this.game.clear();
  }

  random() {
    const colorArray: string[] = [
      this.childColorBag.red,
      this.childColorBag.green,
      this.childColorBag.blue,
      this.childColorBag.yellow
    ];
    this.game.random(colorArray);
  }
}
