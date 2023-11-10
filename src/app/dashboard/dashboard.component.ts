import { Component, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "app/core/services/api/api.service";
import { SharedDataService } from "app/core/services/shared/shared-data.service";
import * as Chartist from "chartist";
import {
  DashBoardGOGChartData,
  IChartProps,
} from "./dashboard-gogl-chart-data";
import { DashBoardChartData } from "./dashboard-chart-data";
import { Subject, Subscription, finalize, first, interval, takeUntil } from "rxjs";
import { AppConsts } from "app/core/constants/appConstants";
import { utilityMethods } from "app/core/shared/utility";
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  public sectorVisitChart: IChartProps = {};
  public sectorTimeChart: IChartProps = {};
  public companyTimeChart: IChartProps = {};
  public companyVisitChart: IChartProps = {};
  public mainChartVisitor: IChartProps = {};

  isGChart: boolean = true;
  isChartish: boolean = false;
  dateRange: string = null;
  private unsubscribe$ = new Subject<void>();
  private intervalSubscription: Subscription | undefined;
  mostVisitedocByCountry: any;
  util: utilityMethods;

  @BlockUI() blockUI: NgBlockUI;


  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private shareDate: SharedDataService,
    private gChartsData: DashBoardGOGChartData,
    private chartsData: DashBoardChartData,
    private ngZone: NgZone
  ) {
    this.util = new utilityMethods();
    this.shareDate.sharedData$.subscribe((data) => {
      this.dateRange = data;
      if (
        this.dateRange != null &&
        this.dateRange.split(":")[0] === "Dashboard"
      ) {
        let uri = this.util.uriPath(this.dateRange);
        this.blockUI.start();
        this.apiService
          .getOnlyJson(AppConsts.mostViewedDocByCountry + uri).pipe(
            finalize(() => this.blockUI.stop())
            )
          .subscribe((res) => {
            this.mostVisitedocByCountry = res;
          });
        
        if (this.isGChart) {
          this.initGCharts(this.dateRange);
        }
        if (this.isChartish) {
          this.initCharts(this.dateRange);
        }
      }
    });
  }

  ngOnInit(): void {
    // chartist chart
    if (this.isChartish) {
      this.initCharts(null);
    }
    // google charts
    if (this.isGChart) {
      this.initGCharts(null);
    }
    let uri = this.util.uriPath(null);
    this.apiService
      .getOnlyJson(AppConsts.mostViewedDocByCountry + uri)
      .subscribe((res) => {
        this.mostVisitedocByCountry = res;
        // this.blockUI.stop();
      });
  }

  initCharts(dateRange: string) {
    let uri = this.util.uriPath(dateRange);

    this.chartsData.initIndustryVisitChart(uri);
    this.chartsData.initIndustryTimeChart(uri);
    this.chartsData.initCompanyVisitChart(uri);
    this.chartsData.initCompanyTimeChart(uri);
    this.chartsData.initMainChart(uri);

    this.startAnimationForLineChart(this.chartsData.mainChartVisitor);
    this.startAnimationForLineChart(this.chartsData.sectorTimeChart);
    this.startAnimationForLineChart(this.chartsData.sectorVisitChart);
    this.startAnimationForLineChart(this.chartsData.companyVisitChart);
    this.startAnimationForBarChart(this.chartsData.companyTimeChart);
  }

  initGCharts(dateRange: string) {
    this.blockUI.start('Loading... Charts');
    let uri = this.util.uriPath(dateRange);

    this.gChartsData.initIndustryVisitChart(uri);
    this.gChartsData.initIndustryTimeChart(uri);
    this.gChartsData.initCompanyVisitChart(uri);
    this.gChartsData.initCompanyTimeChart(uri);
    this.gChartsData.initMainChart(uri);

    this.sectorVisitChart = this.gChartsData.sectorVisitChart;
    this.sectorTimeChart = this.gChartsData.sectorTimeChart;
    this.companyVisitChart = this.gChartsData.companyVisitChart;
    this.companyTimeChart = this.gChartsData.companyTimeChart;
    this.mainChartVisitor = this.gChartsData.mainChartVisitor;

    google.charts.load("current", { packages: ["corechart"] });
    // google.charts.load('current', {'packages': ['line']});
    google.charts.setOnLoadCallback(() => {
      this.checkForDataArrival();
    });
  }

  checkForDataArrival(): void {
    interval(1000)
      .pipe(
        takeUntil(this.unsubscribe$),
        first((_) => this.gChartsData.allChartsDataMap.size === 5)
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          const currentSize = this.gChartsData.allChartsDataMap.size;

          if (currentSize === 5) {
            this.drawChart();

            this.unsubscribe$.next();
            this.unsubscribe$.complete();

            if (this.intervalSubscription) {
              this.intervalSubscription.unsubscribe();
            }
          }
        });
      });
  }

  drawChart() {
    var chart1 = new google.visualization.LineChart(
      document.getElementById("sectorVisitChart")
    );
    chart1.draw(
      google.visualization.arrayToDataTable(this.sectorVisitChart.data),
      this.sectorVisitChart.options
    );

    var chart2 = new google.visualization.LineChart(
      document.getElementById("sectorTimeChart")
    );
    chart2.draw(
      google.visualization.arrayToDataTable(this.sectorTimeChart.data),
      this.sectorTimeChart.options
    );

    var chart3 = new google.visualization.ColumnChart(
      document.getElementById("companyTimeChart")
    );
    chart3.draw(
      google.visualization.arrayToDataTable(this.companyTimeChart.data),
      this.companyTimeChart.options
    );

    var chart4 = new google.visualization.LineChart(
      document.getElementById("companyVisitedChart")
    );
    chart4.draw(
      google.visualization.arrayToDataTable(this.companyVisitChart.data),
      this.companyVisitChart.options
    );

    var chart5 = new google.visualization.LineChart(
      document.getElementById("mainChartVisitor")
    );
    chart5.draw(
      google.visualization.arrayToDataTable(this.mainChartVisitor.data),
      this.mainChartVisitor.options
    );

    this.blockUI.stop();
    this.gChartsData.allChartsDataMap.clear();
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on("draw", function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq = 0;
  }

  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function (data) {
      if (data.type === "bar") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq2 = 0;
  }
}
