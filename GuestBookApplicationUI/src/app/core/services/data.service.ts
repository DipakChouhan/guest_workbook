import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  context: any;
  modelDataObject = new Subject<any>();

  constructor() { }

  buildModelDataObject(data: any, mode: String, context: any, infoMessages: any, errorMessages: any) {
    this.modelDataObject.next({
      'data': data,
      'mode': mode,
      'infoMessages': infoMessages,
      'errorMessages': errorMessages
    });
    this.context = context;
  }
}
