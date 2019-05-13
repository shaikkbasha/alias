import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ReportsService } from '../../../shared/services/repair/reports/reports.services';

// Loading Pareto as a module
declare var require: any;
const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);
import pareto from 'highcharts/modules/pareto';

@Component({
  selector: 'app-report',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportComponent implements OnInit, OnDestroy {
  enableSearchToolBar = false;
  dataSource: any = [];
  isLoading = false;
  lruType = '';
  lruName = '';
  partNumber = '';
  paretoChart = {
    reasonOfRemoval: {
      chartData: [],
      categories: [],
      chartOption: {},
      isLoading: false,
      isChartLoaded: false
    },
    repairAction: {
      chartData: [],
      categories: [],
      chartOption: {},
      isLoading: false,
      isChartLoaded: false
    }
  };
  reports = {
    lruType: [],
    lruName: [],
    partNumber: [],
    updatedTime: null,
    isLRUTypeLoading: true,
    isLRUNameLoading: true,
    isPartnumberLoading: true
  };
  constructor(private reportsService: ReportsService) { }
  actionToolBarConfig = {
    createLabel: 'Create Report',
    moduleName: 'Create Report',
    id: 'btn-overview',
    filterIds : {
      filterListId: 'filter-overview-list',
      filterText: 'inp-filter-overview-text'
    },
    enableSearch: false,
    enableCreate: false,
    buttonList: []
  };
  chartOption = {
      chart: {
          type: 'column'
      },
      title: {
          text: ''
      },
      tooltip: {
          shared: true
      },
      xAxis: {
          categories: [],
          crosshair: true
      },
      yAxis: [{
          title: {
              text: ''
          }
      }, {
          title: {
              text: ''
          },
          minPadding: 0,
          maxPadding: 0,
          max: 100,
          min: 0,
          opposite: true,
          labels: {
              format: '{value}%'
          }
      }],
      series: [{
          type: 'pareto',
          name: 'Pareto',
          yAxis: 1,
          zIndex: 10,
          baseSeries: 1
      },
      {
          name: 'Reasons of Removal',
          type: 'column',
          zIndex: 2,
          data: []
      }]
  };
  ngOnInit() {

    pareto(Highcharts); // Initialize exporting module.
    this.reports.updatedTime = new Date();
    this.reportsService.getLRUType().subscribe((data) => {
      this.reports.lruType = data;
    });
  }

  getLRUName(id) {
    if (id) {
      this.paretoChart.reasonOfRemoval.chartData = [];
      this.paretoChart.repairAction.chartData = [];
      this.reports.isLRUNameLoading = true;
      this.reports.isPartnumberLoading = true;
      this.paretoChart.repairAction.isLoading = false;
      this.paretoChart.reasonOfRemoval.isChartLoaded = false;
      this.paretoChart.repairAction.isChartLoaded = false;
      this.lruName = '';
      this.partNumber = '';
      this.reportsService.getLRUName(id).subscribe((data) => {
        this.reports.lruName = data;
        this.reports.isLRUNameLoading = false;
      });
    } else {
      this.reports.lruName = [];
      this.reports.isLRUNameLoading = true;
      this.reports.isPartnumberLoading = true;
      this.paretoChart.reasonOfRemoval.chartData = [];
      this.paretoChart.repairAction.chartData = [];
    }
  }

  getPartNumber(id) {
    if (id) {
      this.paretoChart.repairAction.isLoading = false;
      this.paretoChart.reasonOfRemoval.chartData = [];
      this.paretoChart.repairAction.chartData = [];
      this.reports.isPartnumberLoading = true;
      this.paretoChart.reasonOfRemoval.isChartLoaded = false;
      this.paretoChart.repairAction.isChartLoaded = false;
      this.partNumber = '';
      this.reportsService.getPartNumber(id).subscribe((data) => {
        this.reports.partNumber = data;
        this.reports.isPartnumberLoading = false;
      });
    } else {
      this.reports.partNumber = [];
      this.reports.isPartnumberLoading = true;
      this.paretoChart.reasonOfRemoval.chartData = [];
      this.paretoChart.repairAction.chartData = [];
    }
  }

  getChartData(partNumber) {
    this.paretoChart.reasonOfRemoval.isLoading = true;
    this.paretoChart.reasonOfRemoval.isChartLoaded = false;
    this.paretoChart.reasonOfRemoval.chartData = [];
    this.paretoChart.reasonOfRemoval.categories = [];

    this.paretoChart.repairAction.isLoading = true;
    this.paretoChart.repairAction.isChartLoaded = false;
    this.paretoChart.repairAction.chartData = [];
    this.paretoChart.repairAction.categories = [];

    const d = new Date();
    d.setMonth(d.getMonth() - 3);

    const fromDate = new Date(d).getUTCFullYear() + '-' + (new Date(d).getUTCMonth() + 1) + '-' + new Date(d).getUTCDate();
    const toDate = new Date().getUTCFullYear() + '-' + (new Date().getUTCMonth() + 1) + '-' + new Date().getUTCDate();
    const params = {
      id: partNumber.partNumber,
      fromDate: fromDate + 'T00:00:00Z',
      toDate: toDate + 'T23:59:59Z'
    };
    if (partNumber.partNumber) {
      // To get reason of removals
      this.reportsService.getReasonOfRemovals(params).subscribe((data) => {
        this.paretoChart.reasonOfRemoval.isLoading = false;
        this.paretoChart.reasonOfRemoval.isChartLoaded = true;
        if (data && !data['error'] && data.length) {
          data.sort((a, b) => parseFloat(a.reasonCount) - parseFloat(b.reasonCount));
          data.sort(this.compareValues('reasonCount', 'desc'));

          const chartDatas = this.loadChartDatas(data);
          this.paretoChart.reasonOfRemoval.chartData = chartDatas.data;
          this.paretoChart.reasonOfRemoval.categories = chartDatas.categories;
        } else {
          this.paretoChart.reasonOfRemoval.chartData = [];
          this.paretoChart.reasonOfRemoval.categories = [];
        }
        this.renderParetoChart(this.chartOption);
        this.reports.updatedTime = new Date();
      });

      // To get repair actions
      this.reportsService.getRepairActions(params).subscribe((data) => {
        this.paretoChart.repairAction.isLoading = false;
        this.paretoChart.repairAction.isChartLoaded = true;
        if (!data['error']) {

          // Sort descending order
          data.sort((a, b) => parseFloat(a.repairActionCount) - parseFloat(b.repairActionCount));
          data.sort(this.compareValues('repairActionCount', 'desc'));

          const chartDatas = this.loadRepairChartDatas(data);
          this.paretoChart.repairAction.chartData = chartDatas.data;
          this.paretoChart.repairAction.categories = chartDatas.categories;
        } else {
          this.paretoChart.repairAction.chartData = [];
          this.paretoChart.repairAction.categories = [];
        }
        this.loadRepairActions(this.chartOption);
        this.reports.updatedTime = new Date();
      });
    } else {
      this.paretoChart.repairAction.isLoading = false;
      this.paretoChart.reasonOfRemoval.isLoading = false;
    }

  }

  compareValues(key, order = 'asc') {

    return function(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  loadChartDatas(data) {
    const chartDatas = {
      data: [],
      categories: []
    };
    for (let i = 0; i < data.length; i++) {
      chartDatas.data.push(data[i].reasonCount);
      chartDatas.categories.push(data[i].reasonOfRemoval);
    }
    return chartDatas;
  }

  loadRepairChartDatas(data) {
    const chartDatas = {
      data: [],
      categories: []
    };
    for (let i = 0; i < data.length; i++) {
      chartDatas.data.push(data[i].repairActionCount);
      chartDatas.categories.push(data[i].repairAction);
    }
    return chartDatas;
  }

  getReportsList() {
    if (this.lruType && this.lruName && this.partNumber) {
      this.getChartData(this.partNumber);
    } else {
      this.reports.updatedTime = new Date();
    }
  }

  renderParetoChart(chartOption) {
    chartOption.xAxis.categories = this.paretoChart.reasonOfRemoval.categories;
    chartOption.title.text = 'Reasons of Removal';
    chartOption.series[1].data = this.paretoChart.reasonOfRemoval.chartData;
    chartOption.series[1].name = 'Reasons of Removal';
    this.paretoChart.reasonOfRemoval.chartOption = new Chart(chartOption);
  }

  loadRepairActions(chartOption) {
    chartOption.xAxis.categories = this.paretoChart.repairAction.categories;
    chartOption.title.text = 'Repair Actions';
    chartOption.series[1].data = this.paretoChart.repairAction.chartData;
    chartOption.series[1].name = 'Repair Actions';
    this.paretoChart.repairAction.chartOption = new Chart(chartOption);
  }

  ngOnDestroy() {
    this.paretoChart.reasonOfRemoval.categories = [];
    this.paretoChart.reasonOfRemoval.chartData = [];
    this.paretoChart.repairAction.categories = [];
    this.paretoChart.repairAction.chartData = [];
  }
}
