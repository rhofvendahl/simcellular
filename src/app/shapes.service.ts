import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ShapesService {
  shapes: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.shapes = database.list('shapes');
  }

  getShapes() {
    return this.shapes;
  }
  getShapeByKey(key: number) {
    return this.database.object('shapes/' + key);
  }
}
