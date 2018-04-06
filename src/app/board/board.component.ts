import { Component, OnInit, Input } from '@angular/core';
import { Cell } from '../models/cell'
import { Game } from '../models/game'
import { Library } from '../models/library'
import { ShapesService } from '../shapes.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [ShapesService]
})

export class BoardComponent implements OnInit {
  @Input() selectedShape: boolean[][];
  @Input() selectedColor: string;

  game: Game;
  playState: boolean;
  animationInterval;

  constructor(private shapesService: ShapesService) {
    this.playState = false;
    this.game = new Game(40, 40);
    // this.shapeSelected = [];
    // this.library = new Library();
  }

  ngOnInit() {
    console.log(this.shapesService.getShapeByKey(0));
  }

  cellClass(cell) {
    if (cell.state) {
      return "cell black";
    } else {
      return "cell white"
    }
  }

  cellStyle(cell) {
    let color: string;
    if (cell.state) color = cell.color;
    else color = "#eeeeee";
    return {"background-color": color};
  }

  clickCell(cell) {
    if (this.selectedShape.length == 1 && cell.state) {
      cell.state = false;
    } else {
      this.game.placeShape(cell, this.selectedShape, this.selectedColor);
    }
  }

  togglePlay() {
    this.playState = !this.playState;
    if (this.playState) {
      this.animationInterval = setInterval(() => {this.game.updateBoard()}, 100);
    } else {
      clearInterval(this.animationInterval);
    }
  }

  togglePlayButton() {
    if (this.playState) {
      return "Pause";
    } else {
      return "Play";
    }
  }

  nextState() {
    this.game.updateBoard();
    // this.game.renderNextState();
  }
}
