import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {


  private sharedDataSubject = new BehaviorSubject<any>(null);
  sharedData$ = this.sharedDataSubject.asObservable();
  
  private searchItems = new BehaviorSubject<any>(null);
  sharedSearchItems$ = this.searchItems.asObservable();

  private searchBox = new BehaviorSubject<any>(null);
  searchBoxShow$ = this.searchBox.asObservable();


  updateSharedData(data: any) {
    this.sharedDataSubject.next(data);
  }

  updateSearchItems(data:any){
    this.searchItems.next(data);
  }

  showSearchBox(data:any){
   this.searchBox.next(data);
  }


}
