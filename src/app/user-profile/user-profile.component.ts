import { Component, OnInit } from '@angular/core';
import { AppConsts } from 'app/core/constants/appConstants';
import { ApiService } from 'app/core/services/api/api.service';
import { SharedDataService } from 'app/core/services/shared/shared-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  dateRange: string = null;
  allSectors:any;
  sector:any;
  sectorDetails:any;
  constructor(private apiService: ApiService, private shareDate: SharedDataService) {
    this.shareDate.sharedData$.subscribe((data) => {
      this.dateRange = data;
      if(this.dateRange != null && this.dateRange.split(":")[0] === 'Sectors'){   
        console.log(this.dateRange);
        this.loadSectors(this.dateRange);
      }
      
    });
   }

  ngOnInit() {
    this.apiService.getOnlyJson(AppConsts.sectorsAll).subscribe((res)=>{
      this.allSectors = res;
      this.sector=res[0];
      let uri = this.uriPath(null, res[0].jindustryId);
      this.apiService.getOnlyJson(AppConsts.sectorDetails + uri).subscribe((data)=>{
      this.sectorDetails=data;
      console.log(data);
      });
     });
  }

  loadSectors(dateRange:string){
    
    let searchItem = dateRange.split(":")[3];
    let sectorId:number;
   for(let sector of this.allSectors){
     if(sector.industryName.toLowerCase() === searchItem.toLowerCase()){
       sectorId = sector.jindustryId;
       this.sector = sector;
       let uri = this.uriPath(dateRange,sectorId);
       this.apiService.getOnlyJson(AppConsts.sectorDetails + uri).subscribe((res)=>{
       this.sectorDetails=res;
       });
     }else {
      //  for(let exchange of sector.exchangeSecurities){
      //    if(exchange.ticker.toLowerCase() === searchItem.toLowerCase()){
      //      issuerId = activeComapany.jissuerId;
      //      this.issuer=activeComapany;
      //    }
      //  }
     }
 
   }
    
   if(sectorId != null){
     console.log(sectorId);
   } else {
 
     // need to show an alert box 
     console.log(sectorId +'do something');
   }
    
    
   }

   uriPath(dateRange:string, issuerId:number):string{
    let uri:string;
    if(dateRange != null){
      let date = this.dateRange.split(':');
      if(date[1] != null && date[2] != null) {
        uri= `?endDate=${date[2]}&industryId=${issuerId}&startDate=${date[1]}`;   
      } else {
        uri = `?endDate=${this.getCurrentDate(false,0)}&industryId=${issuerId}&startDate=${this.getCurrentDate(true, 30)}`;     
      }

    } else {
      uri = `?endDate=${this.getCurrentDate(false,0)}&industryId=${issuerId}&startDate=${this.getCurrentDate(true, 30)}`;   
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
