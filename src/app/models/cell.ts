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
