// import { Cell } from './cell'
//
// export class Library {
//   glider: boolean[][];
//   toad: boolean[][];
//   beehive: boolean[][];
//   shapes: boolean[][][];
//   constructor() {
//     this.glider = [[false, true, false], [false, false, true], [true, true, true]];
//     this.toad = [[false, true, true, true], [true, true, true, false]];
//     this.beehive = [[false, true, true, false], [true, false, false, true], [false, true, true, false]];
//     this.shapes = [this.glider, this.toad, this.beehive];
//   }
// }

import { Cell } from './cell'

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
