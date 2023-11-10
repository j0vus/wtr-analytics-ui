import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppConsts } from "app/core/constants/appConstants";
import { ApiService } from "app/core/services/api/api.service";
import { SharedDataService } from "app/core/services/shared/shared-data.service";
import { utilityMethods } from "app/core/shared/utility";

interface VisitorDataCurrent {
  currentSessionCount: number,
  currentPageViewCount: number,
  currentSessionDuration: string,
}

@Component({
  selector: "app-topography-details",
  templateUrl: "./topography-details.component.html",
  styleUrls: ["./topography-details.component.css"],
})
export class TopographyDetailsComponent implements OnInit {
  showDetails: boolean[] = [];
  showDesktop: boolean[] = [];
  showEye: boolean[] = [];
  showContent: boolean[] = [];
  isOpen: boolean[] = [];
  isOpenArray: boolean[] = [];
  isOpenInnerArray: boolean[] = [];
  visitorSession: any[] = [];
  util: utilityMethods;
  dateRange: string = null;
  visitorCurrentData: VisitorDataCurrent = {
    currentSessionCount: 0,
    currentPageViewCount: 0,
    currentSessionDuration: "0",
  };

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private shareDate: SharedDataService
  ) {
    this.util = new utilityMethods();
    this.shareDate.sharedData$.subscribe((data) => {
      this.dateRange = data;
      if (
        this.dateRange != null &&
        this.dateRange.split(":")[0] === "Visitor Details"
      ) {
        let uri = this.util.uriPath(this.dateRange);
        this.loadVisitorDetails(uri);
      }
    });
  }

  ngOnInit(): void {
    let uri = this.util.uriPath(null);
    this.loadVisitorDetails(uri);
  }

  loadVisitorDetails(uri) {
    this.route.params.subscribe((params) => {
      let visitorId = params["id"];
      this.apiService
        .getOnlyJson(AppConsts.sessionDetails + uri + `&visitorId=` + visitorId)
        .subscribe((res: any) => {
          this.visitorSession = res?.visitorSession;
          this.visitorCurrentData.currentPageViewCount =
            res.currentPageViewCount;
          this.visitorCurrentData.currentSessionCount = res.currentSessionCount;
          this.visitorCurrentData.currentSessionDuration =
            res.currentSessionDuration;
        });
    });
  }

  toggleDetails(index: number) {
    this.isOpenArray[index] = !this.isOpenArray[index];
  }

  toggleInnerDetails(index: number, event: Event) {
    event.stopPropagation();
    this.isOpenInnerArray[index] = !this.isOpenInnerArray[index];
  }

  toggleDetailsPagePath(index: number, event: Event) {
    event.stopPropagation();
    this.isOpen[index] = !this.isOpen[index];
  }

  onMouseEnter(event: MouseEvent, j: number) {
    this.showDesktop[j] = true;
  }
}
