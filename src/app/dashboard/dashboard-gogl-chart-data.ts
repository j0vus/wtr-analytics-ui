import { Inject, Injectable, Injector } from "@angular/core";
import { AppConsts } from "app/core/constants/appConstants";
import { ApiService } from "app/core/services/api/api.service";
import { AppComponentBase } from "app/core/shared/AppComponentBase";
import * as Chartist from "chartist";


export interface IChartProps {
  data?: any;
  title?: any;
  options?: any;
  type?: any;
  columnNames?: any;
  height?: any;
  width?: any;

  [propName: string]: any;
}

@Injectable({
    providedIn: 'any',
  })

export class DashBoardGOGChartData extends AppComponentBase  {

    companyVisitChartData : any[] = [];
    companyTimeChartData : any [] = [];
    industryVisitChartData : any[] = [];
    industryTimeChartData : any[] = [];
    allChartsDataMap = new Map();

    public sectorVisitChart : IChartProps = {};
    public sectorTimeChart : IChartProps = {};
    public companyTimeChart : IChartProps = {};
    public companyVisitChart : IChartProps = {};
    public mainChartVisitor : IChartProps = {};
  

    constructor(injector: Injector){
      super(injector);
        // let uri:string = `?endDate=${this.getCurrentDate(false,0)}&startDate=${this.getCurrentDate(true, 60)}`;   
        // this.initIndustryVisitChart(uri);
        // this.initIndustryTimeChart(uri);
        // this.initCompanyVisitChart(uri);
        // this.initCompanyTimeChart(uri); 
        // this.initMainChart(uri);
    }

    initIndustryVisitChart(uri:string){
    this.apiService.get(AppConsts.industryVisitChart+ uri
        
    ).subscribe((res:any)=>{
        this.industryVisitChartData= res.body;  
        this.allChartsDataMap.set('industryVisitChartData',res.status);
        const data =[] ;

        const columnNames = ['Company Name', 'Visit Count'];  
        data.unshift(columnNames);

        this.industryVisitChartData.forEach((item)=>{
            data.push([
              item.key,
              item.value,
            ]
            )
        });
    
        const  options = {  
            legend: 'none',  
            is3D: true,
            animation:{
              duration: 2000,
              easing: 'linear',
              startup:true
            },
            width:'100%',        
            height:300,
            backgroundColor: '#E4E4E4',
            pointSize: 7,
            dataOpacity: 0.5,
            // lineWidth:7,
            colors:['red'],



          };

        this.sectorVisitChart.columnNames=columnNames;
        this.sectorVisitChart.title="Visit Count"  
        this.sectorVisitChart.type="LineChart";
        this.sectorVisitChart.data=data;
        this.sectorVisitChart.options=options;
        // this.sectorVisitChart.height=500;
        // this.sectorVisitChart.width=300;
       
       });
    
  
    }

    initIndustryTimeChart(uri:string){
       this.apiService.get(AppConsts.industryTimeChart+ uri
    
    ).subscribe((res:any)=>{
        this.industryTimeChartData= res.body;
        this.allChartsDataMap.set('industryTimeChartData',res.status);

        const data =[] ;
        const columnNames = ['Company Name', 'Time Spend'];  
        data.unshift(columnNames);

        this.industryTimeChartData.forEach((item)=>{
            data.push([
              item.key,
              item.value,
            ]
            )
        });
        const  options = {  
            legend: 'none',  
            is3D: true,
            animation:{
              duration: 2000,
              easing: 'linear',
              startup:true
            },
            width:'100%',
            height:300,
            backgroundColor: '#E4E4E4',
            pointSize: 7,
            dataOpacity: 0.5,

        

          };

        this.sectorTimeChart.columnNames=columnNames;
        this.sectorTimeChart.title="Time Spend"  
        this.sectorTimeChart.type="LineChart";
        this.sectorTimeChart.data=data;
        this.sectorTimeChart.options=options;
        // this.sectorTimeChart.height=500;
        // this.sectorTimeChart.width=300;
  
       });
       
  
    }
  
        initCompanyTimeChart(uri:string) {
        this.apiService.get(AppConsts.companyTimeChart+
          uri
      )
      .subscribe((res: any) => {
        this.companyTimeChartData = res.body;
        this.allChartsDataMap.set('companyTimeChartData',res.status);


        const data =[] ;
        const columnNames = ['Company Ticker', 'Time Spend'];  
        data.unshift(columnNames);

        this.companyTimeChartData.forEach((item)=>{
            data.push([
              item.key,
              item.value,
            ]
            )
        });
       
        const  options = {  
            legend: 'none',  
            is3D: true,
            animation:{
              duration: 3000,
              easing: 'linear',
              startup:true
            },
            width:'100%',
            height:300,
            backgroundColor: '#E4E4E4',
            colors: ['#A61D4C']

            
          };

        this.companyTimeChart.columnNames=columnNames;
        this.companyTimeChart.title="Time Spend"  
        this.companyTimeChart.type="BarChart";
        this.companyTimeChart.data=data;
        this.companyTimeChart.options=options;
        // this.companyTimeChart.height=500;
        // this.companyTimeChart.width=300;
  

   
      });
    }
  
    initCompanyVisitChart(uri:string){
      this.apiService.get(
        AppConsts.companyVisitChart +
          uri
      )
      .subscribe((res: any) => {
        this.companyVisitChartData = res.body;
        this.allChartsDataMap.set('companyVisitChartData',res.status);

        const data =[] ;
        const columnNames = ['Company Tickers', 'Visit Count'];  

        data.unshift(columnNames);

        this.companyVisitChartData.forEach((item)=>{
            data.push([
              item.key,
              item.value,
            ]
            )
        });

        const  options = {  
            legend: 'none',  
            is3D: true,
            animation:{
              duration: 2000,
              easing: 'linear',
              startup:true
            },
            width:'100%',
            height:300,
            backgroundColor: '#E4E4E4',
            pointSize: 7,
            dataOpacity: 0.5,




          };

        this.companyVisitChart.columnNames=columnNames;
        this.companyVisitChart.title="Visit Count"  
        this.companyVisitChart.type="LineChart";
        this.companyVisitChart.data=data;
        this.companyVisitChart.options=options;
        // this.companyVisitChart.height=500;
        // this.companyVisitChart.width=300;
  
      });
  
    }
  
 
    initMainChart(uri:string) {
        this.apiService.get(AppConsts.companyVisitChart + uri)
        .subscribe((res:any)=>{

            var datawebsiteViewsChart = {
                labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
                series: [
                  [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
        
                ]
              }
              
              const optionscompanyVisitChart: any = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                showPoint: false,
                axisX: {
                  showGrid: false
                },
                // low: 0,
                // high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
            }
          
            //  this.mainChartVisitor = new Chartist.Line('#mainChartVisitor', datawebsiteViewsChart, optionscompanyVisitChart);
          
          //   this.startAnimationForLineChart(companyVisitChart);

        });
        
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