import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AppConsts } from 'app/core/constants/appConstants';
import { ApiService } from 'app/core/services/api/api.service';
import { SharedDataService } from 'app/core/services/shared/shared-data.service';
import { utilityMethods } from 'app/core/shared/utility';




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
  util:utilityMethods;
  constructor(private apiService: ApiService, private shareDate: SharedDataService) {
     this.util = new utilityMethods();
    this.shareDate.sharedData$.subscribe((data) => {
      this.dateRange = data;
      if(this.dateRange != null && this.dateRange.split(":")[0] === 'Sectors'){   
        console.log(this.dateRange);
        this.loadSectors(this.dateRange);
      }
    
    });
   }

  ngOnInit() {
    // this.shareDate.showSearchBox(true);
    this.apiService.getOnlyJson(AppConsts.sectorsAll).subscribe((res)=>{
      this.allSectors = res;
      let searchList = [...res];
      this.sector=res[0];
      let uri = this.util.uriPath(null, res[0].jindustryId, 'industryId');
      this.apiService.getOnlyJson(AppConsts.sectorDetails + uri).subscribe((data)=>{
      this.sectorDetails=data;
      });
      searchList.unshift("industry");
      this.shareDate.updateSearchItems(searchList);
     });
  }

  loadSectors(dateRange:string){
    
    let searchItem = dateRange.split(":")[3];
    let sectorId:number;
    for(let sector of this.allSectors){
      if(sector.industryName.toLowerCase() == searchItem.toLowerCase()){
        sectorId = sector.jindustryId;
        this.sector = sector;
        let uri = this.util.uriPath(dateRange,sectorId,'industryId');
        this.apiService.getOnlyJson(AppConsts.sectorDetails + uri).subscribe((res)=>{
        this.sectorDetails=res;
        });
      }
    }    
   }
}
