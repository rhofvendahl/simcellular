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

  placeShape(insertCell: Cell, shape: boolean[][], color: string) {
    for (let shapeRow = 0; shapeRow < shape.length; shapeRow++) {
      for (let shapeCol = 0; shapeCol < shape[0].length; shapeCol++) {
        let cell = this.inRangeCell(shapeRow + insertCell.row, shapeCol + insertCell.column)
        cell.state = shape[shapeRow][shapeCol];
        cell.color = color;
      }
    }
  }

  inRangeCell(row: number, col: number) {
    let inRangeRow: number = (row + this.board.length) % this.board.length;
    let inRangeCol: number = (col + this.board[0].length) % this.board[0].length;
    return this.board[inRangeRow][inRangeCol];
  }

  tallyNeighbors(cellRow: number, cellCol: number) {
    let neighborTally: number = 0;
    for (let row = cellRow-1; row <= cellRow+1; row++) {
      for (let col = cellCol-1; col <= cellCol+1; col++) {
        let inRangeCell: Cell = this.inRangeCell(row, col);
        if (inRangeCell.state) neighborTally++;
      }
    }
    if (this.board[cellRow][cellCol].state) neighborTally--;
    return neighborTally;
  }
  // getNeighbors(cellRow: number, cellCol: number) {
  //   let neighbors: Cell[] = [];
  //   for (let row = cellRow-1; row <= cellRow+1; row++) {
  //     for (let col = cellCol-1; col <= cellCol+1; col++) {
  //       let inRangeCell: Cell = this.inRangeCell(row, col);
  //       if (inRangeCell.state) neighbors.push(inRangeCell);
  //     }
  //   }
  //   if (this.board[cellRow][cellCol].state) neighborTally--;
  //   return neighborTally;
  // }
  findNextState() {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[0].length; col++) {
        let cell = this.board[row][col];
        let tally = this.tallyNeighbors(row, col);
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
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[0].length; col++) {
        let cell = this.board[row][col];
        cell.state = cell.nextState;
      }
    }
  }
}
