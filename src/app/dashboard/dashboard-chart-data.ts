import { Injectable } from "@angular/core";
import { AppConsts } from "app/core/constants/appConstants";
import { ApiService } from "app/core/services/api/api.service";
import { utilityMethods } from "app/core/shared/utility";
import * as Chartist from "chartist";

@Injectable({
  providedIn: "any",
})
export class DashBoardChartData {
  companyVisitChartData: any[] = [];
  companyTimeChartData: any[] = [];
  industryVisitChartData: any[] = [];
  industryTimeChartData: any[] = [];
  mainVisitorChartData: any[] = [];

  sectorVisitChart: any;
  sectorTimeChart: any;
  companyTimeChart: any;
  companyVisitChart: any;
  mainChartVisitor: any;

  util: utilityMethods;

  constructor(private apiService: ApiService) {
    this.util = new utilityMethods();
    let uri: string = `?endDate=${this.util.getCurrentDate(
      false,
      0
    )}&startDate=${this.util.getCurrentDate(true, 60)}`;
  }

  initIndustryVisitChart(uri: string) {
    this.apiService
      .get(AppConsts.industryVisitChart + uri)
      .subscribe((res: any) => {
        this.industryVisitChartData = res.body;

        const labels = this.industryVisitChartData.map((item) => item.key);
        const data = this.industryVisitChartData.map((item) => item.value);

        const dataCompletedTasksChart: any = {
          labels: labels,
          series: [data],
        };

        const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        };

        this.sectorVisitChart = new Chartist.Line(
          "#sectorVisitChart",
          dataCompletedTasksChart,
          optionsCompletedTasksChart
        );

        // start animation for the Completed Tasks Chart - Line Chart
        //   this.startAnimationFoMainChartDatarLineChart(completedTasksChart);
      });
  }

  initIndustryTimeChart(uri: string) {
    this.apiService
      .get(AppConsts.industryTimeChart + uri)
      .subscribe((res: any) => {
        this.industryTimeChartData = res.body;
        const labels = this.industryTimeChartData.map((item) => item.key);
        const data = this.industryTimeChartData.map((item) => item.value);

        const dataCompletedTasksChart: any = {
          labels: labels,
          series: [data],
        };

        const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          // low: 0,
          // high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        };

        this.sectorTimeChart = new Chartist.Line(
          "#sectorTimeChart",
          dataCompletedTasksChart,
          optionsCompletedTasksChart
        );

        //   this.startAnimationForLineChart(completedTasksChart);
      });
  }

  initCompanyTimeChart(uri: string) {
    this.apiService
      .get(AppConsts.companyTimeChart + uri)
      .subscribe((res: any) => {
        this.companyTimeChartData = res.body;

        const labels = this.companyTimeChartData.map((item) => item.key);
        const data = this.companyTimeChartData.map((item) => item.value);

        var datawebsiteViewsChart = {
          labels: labels,
          series: [data],
        };
        var optionswebsiteViewsChart = {
          axisX: {
            showGrid: false,
          },
          low: 0,
          // high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
        };
        var responsiveOptions: any[] = [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ];
        this.companyTimeChart = new Chartist.Bar(
          "#companyTimeChart",
          datawebsiteViewsChart,
          optionswebsiteViewsChart,
          responsiveOptions
        );

        // this.startAnimationForBarChart(websiteViewsChart);
      });
  }

  initCompanyVisitChart(uri: string) {
    this.apiService
      .get(AppConsts.companyVisitChart + uri)
      .subscribe((res: any) => {
        this.companyVisitChartData = res.body;
        const labels = this.companyVisitChartData.map((item) => item.key);
        const data = this.companyVisitChartData.map((item) => item.value);

        const companyVisitChartLabel: any = {
          labels: labels,
          series: [data],
        };

        const optionscompanyVisitChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          // low: 0,
          // high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        };

        this.companyVisitChart = new Chartist.Line(
          "#companyVisitedChart",
          companyVisitChartLabel,
          optionscompanyVisitChart
        );

        // this.startAnimationForLineChart(companyVisitChart);
      });
  }

  initMainChart(uri: string) {
    this.apiService
      .getOnlyJson(AppConsts.uniqueVisitors + uri)
      .subscribe((res: any) => {
        const labels = this.mainVisitorChartData.map((item) => item.key);
        const data = this.mainVisitorChartData.map((item) => item.value);

        var dataVisitorCountData = {
          labels: labels,
          series: [data],
        };

        const optionscompanyVisitChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          showPoint: false,
          axisX: {
            showGrid: false,
          },
          // low: 0,
          // high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        };

        this.mainChartVisitor = new Chartist.Line(
          "#mainChartVisitor",
          dataVisitorCountData,
          optionscompanyVisitChart
        );

        //   this.startAnimationForLineChart(companyVisitChart);
      });
  }
}
