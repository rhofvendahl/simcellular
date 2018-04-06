export class Colors {
  red: string = "#ff6347";
  green: string = "#32cd32";
  blue: string = "#00bfff";
  yellow: string = "#f5e344";
  selected: string;
  constructor(selectedColor: string) {
    this.selected = this[selectedColor];
  }
}
