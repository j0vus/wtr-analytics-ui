import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AppConsts } from 'app/core/constants/appConstants';
import { ApiService } from 'app/core/services/api/api.service';
import { SharedDataService } from 'app/core/services/shared/shared-data.service';
import { utilityMethods } from 'app/core/shared/utility';


@Pipe({
  name: 'nullToZero'
})
export class NullToZeroPipe implements PipeTransform {
  transform(value: number | null): string {
    if(value === null){
      return value === null ? '0' : `${value}`;
    } else {
      let totalSeconds = Math.floor(value);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      if (hours >= 1 ) {
        return formattedTime;
      } else if (minutes >= 1) {
        return `${formattedTime}`;
      } else {
        return `${formattedTime}`;
      }

    }
    
  }
}


@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength: number): string {
    if (value?.length > maxLength) {
      return value.slice(0, maxLength) + '...'; 
    }
    return value; 
  }
}

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
  util:utilityMethods;
  constructor(private apiService: ApiService, private shareDate: SharedDataService) {
    this.util = new utilityMethods();
    this.shareDate.sharedData$.subscribe((data) => {
      this.dateRange = data;
      if(this.dateRange != null && this.dateRange.split(":")[0] === 'Companies'){   
        this.loadCompanies(this.dateRange);
      }
    });
   }

  ngOnInit() {
    // this.shareDate.showSearchBox(true);
    this.apiService.getOnlyJson(AppConsts.issuersAll).subscribe((res)=>{
      this.allActiveCompanies = res;
      let searchList = [...res];
      this.issuer=res[0];
      let uri = this.util.uriPath(null, res[0].jissuerId, 'sectorId');
      this.apiService.getOnlyJson(AppConsts.companyDetails + uri).subscribe((data)=>{
      this.issuerDetails=data;
      });
      searchList.unshift("issuer");
      this.shareDate.updateSearchItems(searchList);
     });
  }

  
  loadCompanies(dateRange:string){
   let searchItem = dateRange.split(":")[3];
   let issuerId:number;

    for(let activeComapany of this.allActiveCompanies){
      if(activeComapany.issuerName.toLowerCase() == searchItem.toLowerCase()){
        issuerId = activeComapany.jissuerId;
        this.issuer = activeComapany;
        let uri = this.util.uriPath(dateRange,issuerId, 'sectorId');
        this.apiService.getOnlyJson(AppConsts.companyDetails +uri).subscribe((data)=>{
        this.issuerDetails=data;
        });
    
      }
    }
   
  }

}
