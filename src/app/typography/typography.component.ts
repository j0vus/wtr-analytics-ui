import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/core/services/api/api.service';
import { SharedDataService } from 'app/core/services/shared/shared-data.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  dateRange: string = null;

  constructor(private apiService: ApiService, private shareDate: SharedDataService) {
    this.shareDate.sharedData$.subscribe((data) => {
      this.dateRange = data;
      if(this.dateRange != null && this.dateRange.split(":")[0] === 'Visitors'){   
        console.log(this.dateRange);
      }
      
    });
   }

  ngOnInit() {
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

}
