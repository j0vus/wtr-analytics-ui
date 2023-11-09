import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { AppConsts } from 'app/core/constants/appConstants';
import { ApiService } from 'app/core/services/api/api.service';
import { SharedDataService } from 'app/core/services/shared/shared-data.service';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']

})
export class TypographyComponent implements OnInit {

  dateRange: string = null;  

  visitorData:any;
  constructor(private apiService: ApiService, private shareDate: SharedDataService, private route: Router,private http: HttpClient) {
    this.shareDate.sharedData$.subscribe((data) => {
      this.dateRange = data;
      if(this.dateRange != null && this.dateRange.split(":")[0] === 'Visitors'){   
        console.log(this.dateRange);
        let uri = this.uriPath(this.dateRange);
        this.apiService.getOnlyJson(AppConsts.visitorsData + uri).subscribe((res)=>{
        this.visitorData=res;
        this.pagination();
        });
      }
      
    });
  }
   
  ngOnInit() {
    let uri = this.uriPath(null);
    this.apiService.getOnlyJson(AppConsts.visitorsData + uri).subscribe((res)=>{
      this.visitorData=res;
      this.pagination();
      });
    this.shareDate.showSearchBox(false);  
  }
  
  uriPath(dateRange:string):string{
    let uri:string;
    if(dateRange != null){
      let date = this.dateRange.split(':');
      if(date[1] != null && date[2] != null) {
        uri= `?endDate=${date[2]}&startDate=${date[1]}`;   
      } else {
        uri = `?endDate=${this.getCurrentDate(false,0)}&startDate=${this.getCurrentDate(true, 30)}`;     
      }

    } else {
      uri = `?endDate=${this.getCurrentDate(false,0)}&startDate=${this.getCurrentDate(true, 30)}`;   
    }

    return uri;
  }
   
  getCurrentDate(isPrevious: boolean, days: number): string {
    const currentDate = new Date();
    if (isPrevious) {
      currentDate.setDate(currentDate.getDate() - days);
    }
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    // 2023-08-31 in this format
    return `${year}-${month}-${day}`;
  }

  onVisitorClick(visitorID: string) {
    this.route.navigate(['/visitor', visitorID]);
  }

  public pageItems;
  public pageSlice;
  pagination(){
    this.pageItems=this.visitorData;
    this.pageSlice=this.pageItems.slice(0,10);
  }  

  pageSize;
  OnPageChange(event: PageEvent){
    console.log(event);
    if(this.pageSize !== event.pageSize){
      // window.scroll(0,0);
      // window.scrollTo(0, 0);
      // document.documentElement.scrollTop = 200; // Scroll to the top of the document's content
      requestAnimationFrame(() => {
        document.documentElement.scrollTop = 200;
      });
  
    }
    this.pageSize=event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.pageItems.length){
      endIndex = this.pageItems.length;
    }
    this.pageSlice = this.pageItems.slice(startIndex, endIndex);
  }

}
