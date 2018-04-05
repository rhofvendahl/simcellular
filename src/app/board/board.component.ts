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

  game: Game;
  playState: boolean;
  animationInterval;

  constructor(private shapesService: ShapesService) {
    this.playState = false;
    this.game = new Game(20, 20);
    this.shapeSelected = [];
    this.library = new Library();
  }

  ngOnInit() {
    console.log(this.shapesService.getShapeByKey(0));
  }

  cellClass(currentCell) {
    if (currentCell.state) {
      return "cell black";
    } else {
      return "cell white"
    }
  }

  clickCell(cell) {
    this.game.placeShape(cell, this.selectedShape);
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
