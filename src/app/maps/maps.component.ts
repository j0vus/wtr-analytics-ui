import { Component, OnInit } from "@angular/core";
import { AppConsts } from "app/core/constants/appConstants";
import { ApiService } from "app/core/services/api/api.service";
import { SharedDataService } from "app/core/services/shared/shared-data.service";
import { utilityMethods } from "app/core/shared/utility";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from "rxjs";

declare const google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}
@Component({
  selector: "app-maps",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.css"],
})
export class MapsComponent implements OnInit {
  worldMap: any[] = [];
  dateRange: string = null;
  util: utilityMethods;
  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private apiService: ApiService,
    private shareDate: SharedDataService
  ) {
    this.util = new utilityMethods();
    this.shareDate.sharedData$.subscribe((data) => {
      this.dateRange = data;
      if (
        this.dateRange != null &&
        this.dateRange.split(":")[0] === "Location"
      ) {
        this.drawRegionsMap(this.dateRange);
      }
    });
  }

  ngOnInit() {
    google.charts.load("current", {
      packages: ["geochart"],
    });
    google.charts.setOnLoadCallback(() => {
      this.drawRegionsMap(null);
    });
  }

  drawRegionsMap(dateRange) {
    this.blockUI.start('Loading... Map');
    let util = new utilityMethods();
    let uri: string;
    if (dateRange != null) {
      uri = this.util.uriPath(this.dateRange);
    } else {
      uri = util.uriPath(null);
    }

    this.apiService
      .getOnlyJson(AppConsts.visitorsCountByCountry + uri).pipe(
        finalize(() => this.blockUI.stop()))
      .subscribe((res) => {
        this.worldMap = res;
        let data = [];
        const columnNames = ["Country", "Visitors"];
        data.unshift(columnNames);
        this.worldMap.forEach((item) => {
          data.push([item.countryName, item.count]);
        });

        var datas = google.visualization.arrayToDataTable(data);

        var options = {
          width: "100%",
          height: 600,
          colorAxis: { colors: ["lightblue", "darkblue"] },

          // legend:  {textStyle: {color: 'blue', fontSize: 16}}
          //   legend:'none'
        };

        var chartss = new google.visualization.GeoChart(
          document.getElementById("regions_div")
        );

        chartss.draw(datas, options);
      });
  }

  initGoogleMaps() {
    var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
    var mapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
      styles: [
        {
          featureType: "water",
          stylers: [
            {
              saturation: 43,
            },
            {
              lightness: -11,
            },
            {
              hue: "#0088ff",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "geometry.fill",
          stylers: [
            {
              hue: "#ff0000",
            },
            {
              saturation: -100,
            },
            {
              lightness: 99,
            },
          ],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#808080",
            },
            {
              lightness: 54,
            },
          ],
        },
        {
          featureType: "landscape.man_made",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#ece2d9",
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#ccdca1",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#767676",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#ffffff",
            },
          ],
        },
        {
          featureType: "poi",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "landscape.natural",
          elementType: "geometry.fill",
          stylers: [
            {
              visibility: "on",
            },
            {
              color: "#b8cb93",
            },
          ],
        },
        {
          featureType: "poi.park",
          stylers: [
            {
              visibility: "on",
            },
          ],
        },
        {
          featureType: "poi.sports_complex",
          stylers: [
            {
              visibility: "on",
            },
          ],
        },
        {
          featureType: "poi.medical",
          stylers: [
            {
              visibility: "on",
            },
          ],
        },
        {
          featureType: "poi.business",
          stylers: [
            {
              visibility: "simplified",
            },
          ],
        },
      ],
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
      position: myLatlng,
      title: "Hello World!",
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
  }
}
