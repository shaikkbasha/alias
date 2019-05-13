import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { Chart } from 'angular-highcharts';
import * as moment from 'moment-timezone';
import { DateFormatterService } from '../../../shared/services/dateFormatter/dateformatter.service';
import { ScoreService } from '../../../shared/services/scores/airlinescore.service';
@Component({
  selector: 'app-airline-scores',
  templateUrl: './airline-scores.component.html',
  styleUrls: ['./airline-scores.component.css']
})

export class AirlineScoresComponent implements OnInit, OnDestroy {
  dataAvailable = false;
  scatterChart: any;
  scoreData: any;
  seriesData: any = [];
  displayedColumns: string[] = ['tailSign', 'tvScore', 'signalScore', 'channelScore'];
  dataSource: any = [];
  updatedTime: any;
  isLoading = false;
  id: string;
  toDate: string;
  fromDate: string;
  fromdates: any = moment().subtract(3, 'days');
  todates: any = new Date();
  actionToolBarConfig = {
    createLabel: 'scores',
    moduleName: 'scores',
    id: 'btn-scores',
    filterIds: {
      filterListId: 'filter-scores-list',
      filterText: 'inp-filter-scores-text'
    },
    enableSearch: true,
    enableCreate: false,
    buttonList: []
  };
  routeSubscribtion: ISubscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('rsSort') rsSort: MatSort;

  constructor(private router: Router,
    private scoreService: ScoreService,
    private route: ActivatedRoute,
    private dateService: DateFormatterService) {

  }

  ngOnInit() {
    if (this.route.parent) {
      this.routeSubscribtion = this.route.parent.params.subscribe(params => {
        this.id = params['airlineIcao'];
        this.getScoreData();
      });
    }
    this.getScoreData();
  }
  processDate(previousDate, CurrentDate) {
    const dates = this.dateService.getDates(previousDate, CurrentDate);
    this.fromDate = dates.fromDate;
    this.toDate = dates.toDate;
  }
  getScoreData() {
    const now = new Date();
    now.setDate(now.getDate() - 3);
    this.processDate(new Date(now), new Date());
    this.getScoreList();
    this.updatedTime = new Date();
  }
  fetchScores() {
    this.scoreService.getScoreList(this.id, this.fromDate, this.toDate).subscribe(list => {
      const data: any = list;
      this.scoreData = list;
      this.seriesData = [];
      this.scoreData.forEach(element => {
        let channelScore: any = 0;
        if (element['channelScore'] !== null) {
          channelScore =  parseFloat(parseFloat(element['channelScore']).toFixed(1));
        }
        let signalScore: any = 0;
        if (element['signalScore'] !== null) {
          signalScore =  parseFloat(parseFloat(element['signalScore']).toFixed(1));
        }
        this.seriesData.push({
          type: 'scatter',
          name: element['tailSign'],
          color: 'rgba(180,37,115, .5)',
          data: [[signalScore, channelScore]]
        });
      });
       this.renderChart();
      console.log(this.seriesData);
      if (data.error) {
        this.dataSource = new MatTableDataSource<any>([]);
      } else {
        if (data.length) {
          this.dataAvailable =  true;
        } else {
          this.dataAvailable =  false;
        }
        this.dataSource = new MatTableDataSource<any>(data);
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }
  getScoreList() {
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource.data = [];
    }
    this.fetchScores();
  }

  renderChart() {
   this.scatterChart  = new Chart({
      chart: {
        type: 'scatter',
        zoomType: 'xy'
      },
      title: {
        text: null
      },
      xAxis: {
        title: {
          text: 'Signal Score'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true,
        max: 100,
        min: 0,
        tickInterval: 20
      },
      yAxis: {
        title: {
          text: 'Channel Score'
        },
        max: 100,
        min: 0,
        tickInterval: 20
      },
      legend: {
        enabled : false
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: false,
                lineColor: 'rgb(100,100,100)'
              }
            },
            symbol: 'circle'
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: 'Signal Score: <b>{point.x}</b><br> Channel Score: <b>{point.y}</b> '
          }
        }
      },
      credits: {
        enabled: false
      },
      series: this.seriesData
    });
  }

  getSelectedDates(data) {
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource.data = [];
    }
    this.processDate(new Date(data.fromDate), new Date(data.toDate));
    this.fetchScores();
  }

  searchFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Data source defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy() {
    this.routeSubscribtion.unsubscribe();
  }
}
