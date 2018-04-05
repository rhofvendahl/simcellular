export class Cell {
  state: boolean = false;
  nextState: boolean;
  row: number;
  column: number;
  color: string;
  constructor(public row: number, public column: number) {
  }
}
