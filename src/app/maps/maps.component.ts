import { Component, OnInit } from '@angular/core';
import { AppConsts } from 'app/core/constants/appConstants';
import { ApiService } from 'app/core/services/api/api.service';
import { SharedDataService } from 'app/core/services/shared/shared-data.service';
import { utilityMethods } from 'app/core/shared/utility';
// import { EChartsOption } from 'echarts';
// import * as echarts from 'echarts';

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  worldMap:any[]=[];  
  dateRange: string = null;
  util:utilityMethods;
  constructor(private apiService: ApiService, private shareDate: SharedDataService) {
    this.util = new utilityMethods();
    this.shareDate.sharedData$.subscribe((data) => {
        this.dateRange = data;
        if(this.dateRange != null && this.dateRange.split(":")[0] === 'Location'){
            this.drawRegionsMap(this.dateRange);
        }
   });
}


  ngOnInit() {

    google.charts.load('current', {
        'packages':['geochart'],
      });
      google.charts.setOnLoadCallback(()=>{
        this.drawRegionsMap(null);
      });

       
    
  }

   drawRegionsMap(dateRange) {
    let util = new utilityMethods();
    let uri
    if(dateRange != null){
        console.log('again');
         uri = this.util.uriPath(this.dateRange);
    }else{
         uri = util.uriPath(null);
    }
    
    this.apiService.getOnlyJson(AppConsts.visitorsCountByCountry + uri).subscribe((res)=>{
        this.worldMap=res;
        let data = [];
        const columnNames = ['Country', 'Popularity'];  
        data.unshift(columnNames); 
        this.worldMap.forEach(item=>{
            data.push([
            item.countryName,
            item.count,    
            ]);
        });

        var datas = google.visualization.arrayToDataTable(data);
      
          var options = {
            width:'100%',        
            height:600,
            colorAxis: {colors: ['lightblue', 'darkblue']}

              // legend:  {textStyle: {color: 'blue', fontSize: 16}}
            //   legend:'none'
      
          };
      
          var chartss = new google.visualization.GeoChart(document.getElementById('regions_div'));
      
          chartss.draw(datas, options);
    });
    
  }
//   mapOption:EChartsOption= {};
//   mapFunction():void {
//     echarts.registerMap('USA', worldMap, {
//         Alaska: {
//           left: -131,
//           top: 25,
//           width: 15
//         },
//         Hawaii: {
//           left: -110,
//           top: 28,
//           width: 5
//         },
//         'Puerto Rico': {
//           left: -76,
//           top: 26,
//           width: 2
//         }
//       });
//       this.mapOption = {
//         title: {
//           text: 'USA Population Estimates (2012)',
//           subtext: 'Data from www.census.gov',
//           sublink: 'http://www.census.gov/popest/data/datasets.html',
//           left: 'right'
//         },
//         tooltip: {
//           trigger: 'item',
//           showDelay: 0,
//           transitionDuration: 0.2
//         },
//         visualMap: {
//           left: 'right',
//           min: 500000,
//           max: 38000000,
//           inRange: {
//             color: [
//               '#313695',
//               '#4575b4',
//               '#74add1',
//               '#abd9e9',
//               '#e0f3f8',
//               '#ffffbf',
//               '#fee090',
//               '#fdae61',
//               '#f46d43',
//               '#d73027',
//               '#a50026'
//             ]
//           },
//           text: ['High', 'Low'],
//           calculable: true
//         },
//         toolbox: {
//           show: true,
//           //orient: 'vertical',
//           left: 'left',
//           top: 'top',
//           feature: {
//             dataView: { readOnly: false },
//             restore: {},
//             saveAsImage: {}
//           }
//         },
//         series: [
//           {
//             name: 'USA PopEstimates',
//             type: 'map',
//             roam: true,
//             map: 'USA',
//             emphasis: {
//               label: {
//                 show: true
//               }
//             },
//             data: [
//               { name: 'Alabama', value: 4822023 },
//               { name: 'Alaska', value: 731449 },
//               { name: 'Arizona', value: 6553255 },
//               { name: 'Arkansas', value: 2949131 },
//               { name: 'California', value: 38041430 },
//               { name: 'Colorado', value: 5187582 },
//               { name: 'Connecticut', value: 3590347 },
//               { name: 'Delaware', value: 917092 },
//               { name: 'District of Columbia', value: 632323 },
//               { name: 'Florida', value: 19317568 },
//               { name: 'Georgia', value: 9919945 },
//               { name: 'Hawaii', value: 1392313 },
//               { name: 'Idaho', value: 1595728 },
//               { name: 'Illinois', value: 12875255 },
//               { name: 'Indiana', value: 6537334 },
//               { name: 'Iowa', value: 3074186 },
//               { name: 'Kansas', value: 2885905 },
//               { name: 'Kentucky', value: 4380415 },
//               { name: 'Louisiana', value: 4601893 },
//               { name: 'Maine', value: 1329192 },
//               { name: 'Maryland', value: 5884563 },
//               { name: 'Massachusetts', value: 6646144 },
//               { name: 'Michigan', value: 9883360 },
//               { name: 'Minnesota', value: 5379139 },
//               { name: 'Mississippi', value: 2984926 },
//               { name: 'Missouri', value: 6021988 },
//               { name: 'Montana', value: 1005141 },
//               { name: 'Nebraska', value: 1855525 },
//               { name: 'Nevada', value: 2758931 },
//               { name: 'New Hampshire', value: 1320718 },
//               { name: 'New Jersey', value: 8864590 },
//               { name: 'New Mexico', value: 2085538 },
//               { name: 'New York', value: 19570261 },
//               { name: 'North Carolina', value: 9752073 },
//               { name: 'North Dakota', value: 699628 },
//               { name: 'Ohio', value: 11544225 },
//               { name: 'Oklahoma', value: 3814820 },
//               { name: 'Oregon', value: 3899353 },
//               { name: 'Pennsylvania', value: 12763536 },
//               { name: 'Rhode Island', value: 1050292 },
//               { name: 'South Carolina', value: 4723723 },
//               { name: 'South Dakota', value: 833354 },
//               { name: 'Tennessee', value: 6456243 },
//               { name: 'Texas', value: 26059203 },
//               { name: 'Utah', value: 2855287 },
//               { name: 'Vermont', value: 626011 },
//               { name: 'Virginia', value: 8185867 },
//               { name: 'Washington', value: 6897012 },
//               { name: 'West Virginia', value: 1855413 },
//               { name: 'Wisconsin', value: 5726398 },
//               { name: 'Wyoming', value: 576412 },
//               { name: 'Puerto Rico', value: 3667084 }
//             ]
//           }
//         ]
//       };
//   }  

  initGoogleMaps(){

    var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
    var mapOptions = {
        zoom: 13,
        center: myLatlng,
        scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        styles: [{
            "featureType": "water",
            "stylers": [{
                "saturation": 43
            }, {
                "lightness": -11
            }, {
                "hue": "#0088ff"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{
                "hue": "#ff0000"
            }, {
                "saturation": -100
            }, {
                "lightness": 99
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#808080"
            }, {
                "lightness": 54
            }]
        }, {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ece2d9"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ccdca1"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#767676"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#b8cb93"
            }]
        }, {
            "featureType": "poi.park",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.sports_complex",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.medical",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.business",
            "stylers": [{
                "visibility": "simplified"
            }]
        }]

    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        title: "Hello World!"
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
  }

}
