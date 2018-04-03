import { Component, OnInit } from '@angular/core';

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

export class Cell {
  state: boolean;
  nextState: boolean;
  row: number;
  column: number;
  constructor(row, column) {
    this.state = false;
    this.row = row;
    this.column = column;
  }
}

export class Game {
  board: Cell[][];
  constructor(rows, columns) {
    this.board = [];
    for (let i = 0; i < rows; i++) {
      let row: Cell[] = [];
      for (let j = 0; j < columns; j++) {
        row.push(new Cell(i, j));
      }
      this.board.push(row);
    }
  }

  placeShape(insertCell, shape) {
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[0].length; j++) {
        this.board[i + insertCell.row][j + insertCell.column].state = shape[i][j];
      }
    }
  }

  toRow(maybeRow) {
    return (maybeRow + this.board.length) % this.board.length;
  }

  toCol(maybeCol) {
    return (maybeCol + this.board[0].length) % this.board[0].length;
  }

  tallyNeighbors(cellRow, cellCol) {
    let neighborTally: number = 0;
    //going through rows
    for (let i = cellRow-1; i <= cellRow+1; i++) {
      //going through column entries for a given row
      for (let j = cellCol-1; j <= cellCol+1; j++) {
        let inRangeCell: Cell = this.board[this.toRow(i)][this.toCol(j)];
        // console.log(cellRow, cellCol, this.toRow(i), this.toCol(j));
        if (inRangeCell.state) neighborTally++;

      }
    }
    if (this.board[cellRow][cellCol].state) neighborTally--;
    return neighborTally;
  }

  findNextState() {
    //going through rows
    for (let i = 0; i < this.board.length; i++) {
      //going through column entries for a given row
      for (let j = 0; j < this.board[0].length; j++) {
        let cell = this.board[i][j];
        let tally = this.tallyNeighbors(i, j);
        if (cell.state) {
          let shouldSurvive: boolean = (tally == 2 || tally == 3)
          cell.nextState = shouldSurvive;
        } else {
          let shouldGenerate: boolean = (tally == 3)
          cell.nextState = shouldGenerate;
        }
      }
    }
  }

  renderNextState() {
    //going through rows
    for (let i = 0; i < this.board.length; i++) {
      //going through column entries for a given row
      for (let j = 0; j < this.board[0].length; j++) {
        let cell = this.board[i][j];
        cell.state = cell.nextState;
      }
    }
  }
}

export class Library {
  glider: boolean[][];
  toad: boolean[][];
  beehive: boolean[][];
  shapes: boolean[][][];
  constructor() {
    this.glider = [[false, true, false], [false, false, true], [true, true, true]];
    this.toad = [[false, true, true, true], [true, true, true, false]];
    this.beehive = [[false, true, true, false], [true, false, false, true], [false, true, true, false]];
    this.shapes = [this.glider, this.toad, this.beehive];
  }
}
