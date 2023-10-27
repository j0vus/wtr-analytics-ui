import { Inject, Injectable, Injector } from "@angular/core";
import { AppConsts } from "app/core/constants/appConstants";
import { ApiService } from "app/core/services/api/api.service";
import { AppComponentBase } from "app/core/shared/AppComponentBase";
import { utilityMethods } from "app/core/shared/utility";
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
    mainChartVisitorData : any[] =[];
    allChartsDataMap = new Map();

    public sectorVisitChart : IChartProps = {};
    public sectorTimeChart : IChartProps = {};
    public companyTimeChart : IChartProps = {};
    public companyVisitChart : IChartProps = {};
    public mainChartVisitor : IChartProps = {};

    util:utilityMethods;

    constructor(injector: Injector){
      super(injector);
      this.util= new utilityMethods();
        // let uri:string = `?endDate=${this.util.getCurrentDate(false,0)}&startDate=${this.util.getCurrentDate(true, 60)}`;   
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
        let data =[] ;

        const columnNames = ['Company Name', 'Visitors'];  
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
            hAxis: {
              textStyle: {
                fontSize: 11 
             },
            },
            vAxis : {
              format: '0',
            },

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

        let data =[] ;
        let columnNames;
        
        if( res.body.length==10?res.body[4].value:res.body[res.body.length-1].value > 3600){

          columnNames = ['Company Name', 'Time(Hrs)'];  
          data.unshift(columnNames);

          this.industryTimeChartData.forEach((item)=>{
            let num:number = item.value /3600;
              data.push([
                item.key,
                parseFloat(num.toFixed(2)),
              ]
              )
          });
        } else if(res.body[0].value <= 60){
          
          columnNames = ['Company Name', 'Time(Seconds)'];  
          data.unshift(columnNames);

          this.industryTimeChartData.forEach((item)=>{
              data.push([
                item.key,
                item.value,
              ]
              )
          });
        } else {
          columnNames = ['Company Name', 'Time(min)'];  
          data.unshift(columnNames);

          this.industryTimeChartData.forEach((item)=>{
            let num:number = item.value /60;
              data.push([
                item.key,
                parseFloat(num.toFixed(2)),
              ]
              )
          });
        }
        
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
            hAxis: {
              textStyle: {
                fontSize: 11 
            },
          },
          vAxis : {
            format: '0',
          },

        

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

        let data =[] ;
        let columnNames;
        if(res.body.length==10?res.body[4].value:res.body[res.body.length-1].value > 3600) {
          columnNames = ['Company Ticker', 'Time(Hrs)'];  
          data.unshift(columnNames);

          this.companyTimeChartData.forEach((item)=>{
            let num:number = item.value/3600;
            
              data.push([
                item.key,
                parseFloat(num.toFixed(2)),
              ]
              )
          });
       } else if(res.body[0].value <= 60) {

        columnNames = ['Company Ticker', 'Time(Seconds)'];  
        data.unshift(columnNames);

        this.companyTimeChartData.forEach((item)=>{
            data.push([
              item.key,
              item.value,
            ]
            )
        });

       } else {
          columnNames = ['Company Ticker', 'Time(min)'];  
          data.unshift(columnNames);

          this.companyTimeChartData.forEach((item)=>{
            let num:number = item.value/60;
              data.push([
                item.key,
                parseFloat(num.toFixed(2)),
              ]
              )
          });
       }

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
            colors: ['#A61D4C'],
            hAxis: {
                textStyle: {
                  fontSize: 11 
              },
            },
            vAxis : {
              format: '0',
          },

            
          };

        this.companyTimeChart.columnNames=columnNames;
        this.companyTimeChart.title="Time Spend"  
        this.companyTimeChart.type="BarChart";
        this.companyTimeChart.data=data;
        this.companyTimeChart.options=options;
   
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

        let data =[] ;
        const columnNames = ['Company Tickers', 'Visitors'];  

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
            hAxis: {
                textStyle: {
                  fontSize: 11 
              },
            },
            vAxis : {
              format: '0',
          },

          };

        this.companyVisitChart.columnNames=columnNames;
        this.companyVisitChart.title="Visit Count"  
        this.companyVisitChart.type="LineChart";
        this.companyVisitChart.data=data;
        this.companyVisitChart.options=options;  
      });
  
    }
 
    initMainChart(uri:string) {
        this.apiService.get(AppConsts.uniqueVisitors + uri)
        .subscribe((res:any)=>{
          this.mainChartVisitorData = res.body;
          this.allChartsDataMap.set('mainChartVisitorData',res.status);

        let data =[] ;
        const columnNames = ['Date', 'Visitors'];  

        data.unshift(columnNames);

        const options = {  
          legend: 'none',  
          is3D: true,
          animation:{
            duration: 2000,
            easing: 'linear',
            startup:true
          },
          width:'100%',
          height:300,
          backgroundColor: 'white',
          pointSize: 7,
          dataOpacity: 0.5,
          hAxis: {
            textStyle: {
              fontSize: 11 
          }
          },
          vAxis : {
            // title: 'Visitor Count ',
            format: '0',
        },
     
        };

        if (this.mainChartVisitorData.length > 30 && this.mainChartVisitorData.length <= 90) {

          const weeklyData = new Map();

          this.mainChartVisitorData.forEach((item) => {
            const date = new Date(item.key);
            const dayOfWeek = date.getDay(); 
            const startDate = new Date(date);
            startDate.setDate(date.getDate() - dayOfWeek); 
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6); 

            const weekRange = `${startDate.getDate()} - ${endDate.getDate()} ${endDate.toLocaleString('en-US', { month: 'short' })} `;

            if (!weeklyData.has(weekRange)) {
              weeklyData.set(weekRange, 0);
            }

            weeklyData.set(weekRange, weeklyData.get(weekRange) + item.value);
          });

          let weeklySumData = Array.from(weeklyData, ([weekRange, value]) => ({ weekRange, value }));
          
          weeklySumData.forEach((item)=>{
            data.push([
              item.weekRange,
              item.value,
            ])
          });
             
        } else if (this.mainChartVisitorData.length > 90) {

           const monthlyData = new Map();

            this.mainChartVisitorData.forEach((item) => {
              const date = new Date(item.key);
              const monthName = date.toLocaleString('en-US', { month: 'short' }); 
              const year = date.getFullYear().toString().substr(-2); 

              const monthYearString = monthName + ' ' + year;

              if (!monthlyData.has(monthYearString)) {
                monthlyData.set(monthYearString, 0);
              }

              monthlyData.set(monthYearString, monthlyData.get(monthYearString) + item.value);
            });

            let monthlySumData = Array.from(monthlyData, ([monthYearString, value]) => ({ monthYearString, value }));

            monthlySumData.forEach((item)=>{
              data.push([
                item.monthYearString,
                item.value,
              ])
            });

       
        } else {

          const dailyData = new Map();

          this.mainChartVisitorData.forEach((item) => {
            const date = new Date(item.key);
            const dayDateStr = date.toLocaleString('en-US', { month: 'short', day: 'numeric' });

            if (!dailyData.has(dayDateStr)) {
              dailyData.set(dayDateStr, 0);
            }

            dailyData.set(dayDateStr, dailyData.get(dayDateStr) + item.value);
          });

          let dailySumData = Array.from(dailyData, ([dayDateStr, value]) => ({ dayDateStr, value }));

        dailySumData.forEach((item)=>{
            data.push([
              item.dayDateStr,
              item.value,
            ]
            )
        });
        }
  
            
        this.mainChartVisitor.columnNames=columnNames;
        this.mainChartVisitor.title="Visitors"  
        this.mainChartVisitor.type="LineChart";
        this.mainChartVisitor.data=data;
        this.mainChartVisitor.options=options;
        
        });
        
    }

     
}