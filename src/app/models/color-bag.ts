export class ColorBag {
  red = '#ff6347';
  green = '#32cd32';
  blue = '#00bfff';
  yellow = '#f5e344';
  selected: string;
  constructor(selectedColor: string) {
    this.selected = this[selectedColor];
  }
}
