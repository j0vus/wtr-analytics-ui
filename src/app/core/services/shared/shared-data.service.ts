import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  // private message = new BehaviorSubject('');
  // getMessage = this.message.asObservable();
  // constructor() { }

  // setMessage(message: any){
  //   this.message.next(message);
  // }

  // private dataSubject = new BehaviorSubject<any>(null);
  // private eventSubject = new Subject<any>();

  // sendData(data: any) {
  //   this.dataSubject.next(data);
  // }

  // getEventData() {
  //   return this.eventSubject.asObservable();
  // }

  // sendEvent(event: any) {
  //   this.eventSubject.next(event);
  // }

  // getData() {
  //   return this.dataSubject.value;
  // }


  private sharedDataSubject = new BehaviorSubject<any>(null);
  sharedData$ = this.sharedDataSubject.asObservable();

  updateSharedData(data: any) {
    this.sharedDataSubject.next(data);
  }


}
