import { Component, OnInit } from '@angular/core';
import { Cell } from '../models/cell'
import { Game } from '../models/game'
import { Library } from '../models/library'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  game: Game;
  playState: boolean;
  animationInterval;
  shapeSelected: boolean[][];
  library: Library;
  constructor() {
    this.playState = false;
    this.game = new Game(20, 20);
    this.shapeSelected = [];
    this.library = new Library();
  }

  ngOnInit() {
  }

  cellClass(currentCell) {
    if (currentCell.state) {
      return "cell black";
    } else {
      return "cell white"
    }
  }

  shapeCellClass(currentCell) {
    if (currentCell) return "shapeCell grey";
    else return "shapeCell white"
  }

  clickCell(currentCell) {
    if (this.shapeSelected.length > 0) {
      //place shape
      this.game.placeShape(currentCell, this.shapeSelected);
    } else {
      //flip single cell
      currentCell.state = !currentCell.state;
    }
  }

  clickShape(currentShape) {
    this.shapeSelected = currentShape;
  }

  togglePlay() {
    this.playState = !this.playState;
    if (this.playState) {
      this.animationInterval = setInterval(() => {this.nextState()}, 50);
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
    this.game.findNextState();
    this.game.renderNextState();
  }
}
