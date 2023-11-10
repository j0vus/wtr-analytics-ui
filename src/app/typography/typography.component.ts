
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConsts } from 'app/core/constants/appConstants';
import { ApiService } from 'app/core/services/api/api.service';
import { SharedDataService } from 'app/core/services/shared/shared-data.service';
import { HttpClient } from '@angular/common/http';
import {PageEvent} from '@angular/material/paginator';
import { utilityMethods } from 'app/core/shared/utility';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']

})
export class TypographyComponent implements OnInit {

  dateRange: string = null;  
  public pageItems:any;
  public pageSlice;
  visitorData:any;
  util:utilityMethods;
  constructor(private apiService: ApiService, private shareDate: SharedDataService, private route: Router,private http: HttpClient) {
    this.util= new utilityMethods();
    this.shareDate.sharedData$.subscribe((data) => {
      this.dateRange = data;
      if(this.dateRange != null && this.dateRange.split(":")[0] === 'Visitors'){   
        let uri = this.util.uriPath(this.dateRange);
        this.apiService.getOnlyJson(AppConsts.visitorsData + uri).subscribe((res)=>{
        this.visitorData=res;
        this.pagination();
        });
      }
      
    });
  }
   
  ngOnInit() {
    let uri = this.util.uriPath(null);
    this.apiService.getOnlyJson(AppConsts.visitorsData + uri).subscribe((res)=>{
      this.visitorData=res;
      this.pagination();
      });
    // this.shareDate.showSearchBox(false);  
  }
  
  onVisitorClick(visitorID: string) {
    this.route.navigate(['/visitor', visitorID]);
  }
  
  pagination(){
    this.pageItems=this.visitorData;
    this.pageSlice=this.pageItems.slice(0,10);
  }  

  OnPageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.pageItems.length){
      endIndex = this.pageItems.length;
    }
    this.pageSlice = this.pageItems.slice(startIndex, endIndex);
  }

}
