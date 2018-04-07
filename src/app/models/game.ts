import { Cell } from './cell'

export class Game {
  board: Cell[][];
  constructor(rows, columns) {
    this.board = [];

    for (let row = 0; row < rows; row++) {
      let newRow: Cell[] = [];
      for (let column = 0; column < columns; column++) {
        newRow.push(new Cell(row, column));
      }
      this.board.push(newRow);
    }

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        let cell: Cell = this.board[row][column];
        cell.neighbors= this.getNeighbors(cell);
      }
    }
  }

  inRangeCell(row: number, col: number) {
    let inRangeRow: number = (row + this.board.length) % this.board.length;
    let inRangeCol: number = (col + this.board[0].length) % this.board[0].length;
    return this.board[inRangeRow][inRangeCol];
  }

  getNeighbors(cell: Cell) {
    let neighbors: Cell[] = [];
    for (let row = cell.row-1; row <= cell.row+1; row++) {
      for (let col = cell.column-1; col <= cell.column+1; col++) {
        let neighbor: Cell = this.inRangeCell(row, col);
        if (neighbor != cell) neighbors.push(neighbor);
      }
    }
    return neighbors;
  }

  pad(hexNumber: string) {
    if (hexNumber.length == 1) return "0" + hexNumber;
    return hexNumber;
  }

  averageColor(cells: Cell[]) {
    let redDecimalSum: number = 0;
    let greenDecimalSum: number = 0;
    let blueDecimalSum: number = 0;

    cells.forEach(function(cell) {
      let redHex: string = cell.color.substr(1, 2);
      redDecimalSum += parseInt(redHex, 16);
      let greenHex: string = cell.color.substr(3, 2);
      greenDecimalSum += parseInt(greenHex, 16);
      let blueHex: string = cell.color.substr(5, 2);
      blueDecimalSum += parseInt(blueHex, 16);
    });

    let redHexAverage: string = (Math.ceil(redDecimalSum / 3)).toString(16);
    let greenHexAverage: string = (Math.ceil(greenDecimalSum / 3)).toString(16);
    let blueHexAverage: string = (Math.ceil(blueDecimalSum / 3)).toString(16);

    let color: string = "#" + this.pad(redHexAverage) + this.pad(greenHexAverage) + this.pad(blueHexAverage);
    return color;
  }

  update() {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[0].length; col++) {
        let cell: Cell = this.board[row][col];
        let liveNeighbors: Cell[] = cell.neighbors.filter(cell => cell.state);
        let tally: number = liveNeighbors.length;

        let shouldSurvive: boolean = (tally == 2 || tally == 3);
        let shouldGenerate: boolean = (tally == 3)

        if (cell.state) {
          cell.nextState = shouldSurvive;
        } else if (shouldGenerate) {
          cell.nextState = true;

          if (Math.random() < .8) {
            cell.color = liveNeighbors[Math.floor(Math.random()*liveNeighbors.length)].color;
          } else {
            cell.color = this.averageColor(liveNeighbors);
          }
        }
      }
    }

    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[0].length; col++) {
        let cell = this.board[row][col];
        cell.state = cell.nextState;
      }
    }
  }

  insert(insertCell: Cell, shape: boolean[][], color: string) {
    for (let shapeRow = 0; shapeRow < shape.length; shapeRow++) {
      for (let shapeCol = 0; shapeCol < shape[0].length; shapeCol++) {
        let cell = this.inRangeCell(shapeRow + insertCell.row, shapeCol + insertCell.column)
        cell.state = shape[shapeRow][shapeCol];
        cell.color = color;
      }
    }
  }

  clear() {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[0].length; col++) {
        let cell = this.board[row][col];
        cell.state = false;
        cell.nextState = false;
      }
    }
  }

  random(colorArray: string[]) {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[0].length; col++) {
        let cell = this.board[row][col];
        cell.state = (Math.random() < .2);
        cell.color = colorArray[Math.floor(Math.random()*colorArray.length)];
      }
    }
  }
}
