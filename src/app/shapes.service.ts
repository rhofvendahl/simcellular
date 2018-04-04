import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ShapesService {
  shapes: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.shapes = database.list('shapes');
    debugger;
  }

  getShapes() {
    return this.shapes;
  }
}
