import { Component, OnInit } from '@angular/core';
import { AppConsts } from 'app/core/constants/appConstants';
import { ApiService } from 'app/core/services/api/api.service';
import { SharedDataService } from 'app/core/services/shared/shared-data.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  dateRange: string = null;
  allActiveCompanies:any ;
  issuer:any;
  issuerDetails:any;
  constructor(private apiService: ApiService, private shareDate: SharedDataService) {
    this.shareDate.sharedData$.subscribe((data) => {
      this.dateRange = data;
      if(this.dateRange != null && this.dateRange.split(":")[0] === 'Companies'){   
        this.loadCompanies(this.dateRange);
      }
      
    });
   }

  ngOnInit() {

    this.apiService.getOnlyJson(AppConsts.issuersAll).subscribe((res)=>{
      this.allActiveCompanies = res;
      this.issuer=res[0];
      let uri = this.uriPath(null, res[0].jissuerId);
      this.apiService.getOnlyJson(AppConsts.companyDetails + uri).subscribe((data)=>{
      this.issuerDetails=data;
      console.log(data);
      });
     });
  }

  
  loadCompanies(dateRange:string){
   let searchItem = dateRange.split(":")[3];
   let issuerId:number;

  for(let activeComapany of this.allActiveCompanies){
    if(activeComapany.issuerName.toLowerCase() === searchItem.toLowerCase()){
      // console.log(activeComapany.issuerName);
      issuerId = activeComapany.jissuerId;
      this.issuer = activeComapany;
    }else {
      for(let exchange of activeComapany.exchangeSecurities){
        if(exchange.ticker.toLowerCase() === searchItem.toLowerCase()){
          issuerId = activeComapany.jissuerId;
          this.issuer=activeComapany;
        }
      }
    }

    let uri = this.uriPath(dateRange,issuerId);
    this.apiService.getOnlyJson(AppConsts.companyDetails +uri).subscribe((data)=>{
    this.issuerDetails=data;
    console.log(this.issuerDetails);
    });

  }
   
  if(issuerId != null){
    console.log(issuerId);
  } else {

    // need to show an alert box 
    console.log(issuerId +'do something');
  }
   
   
  }

  uriPath(dateRange:string, issuerId:number):string{
    let uri:string;
    if(dateRange != null){
      let date = this.dateRange.split(':');
      if(date[1] != null && date[2] != null) {
        uri= `?endDate=${date[2]}&sectorId=${issuerId}&startDate=${date[1]}`;   
      } else {
        uri = `?endDate=${this.getCurrentDate(false,0)}&sectorId=${issuerId}&startDate=${this.getCurrentDate(true, 30)}`;     
      }

    } else {
      uri = `?endDate=${this.getCurrentDate(false,0)}&sectorId=${issuerId}&startDate=${this.getCurrentDate(true, 30)}`;   
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
