import { Cell } from './cell'

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
