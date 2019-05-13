import { Component, OnInit, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ISubscription } from 'rxjs/Subscription';
import * as moment from 'moment-timezone';
import { FlightsService } from '../../../shared/services/airline-tail/flights/flights.service';
import { DateFormatterService } from '../../../shared/services/dateFormatter/dateformatter.service';
import { TailService } from '../../../shared/services/airline-tail/tails.service';
import { ArtupdatedtimeComponent } from '../../../shared/modules/time/artupdatedtime.component';
import { FlightService } from '../../../shared/services/flights/airlineflights.service';
import { UserService } from './../../../shared/services/user/user.service';
import { TailsDataService } from '../../../shared/services/tails/tails-data.service';

@Component({
  selector: 'app-tails-overview',
  templateUrl: './tails-overview.component.html',
  styleUrls: ['./tails-overview.component.css']
})
export class TailOverviewComponent implements OnInit, OnDestroy {
  @ViewChild(ArtupdatedtimeComponent) artUpdatedTimeComponent: ArtupdatedtimeComponent;
  airlineIcao: any;
  tailDetails: any;
  tailNumber: any;
  routeParams: any;
  options: {};
  updatedTime: any;
  fromDate: string;
  toDate: string;
  flightDetails: any;
  flightStatus: any = [];
  isError = false;
  groups: any;
  data: any;
  timeline: any;
  tlContainer: any;
  isLoading = false;
  selection: any = new SelectionModel<any>(false, []);
  fromdates: any = moment().subtract(6, 'days');
  todates: any = new Date();
  labelValueFormat: any;
  selectedFlightLeg: string;
  flightResponse: any;
  actionToolBarConfig = {
    createLabel: '',
    moduleName: 'Tailsoverview',
    id: 'btn-tail-overview',
    enableSearch: false,
    enableCreate: false,
    enableAnalyze: false,
    analyzeButton : 'Analyze Flight Leg',
    buttonList: []
  };
  isVisInitialised = true;
  noCoverageData = false;
  lopaConf: any;
  lopaOptions: any;
  getTailNumber = '';
  tailDataSubscribtion: ISubscription;
  constructor(private flightService: FlightsService, private router: Router,
    private config: NgbModalConfig, private tailDataService: TailsDataService,
    private route: ActivatedRoute, private dateService: DateFormatterService,
    private airlineFightService: FlightService,
    private tailService: TailService, private userService: UserService) {
    config.backdrop = 'static';
    config.keyboard = false;
    document.body.style.position = 'relative';
  }

  biteCoverageData: any;
   /**Navigate to previous path */
  increment = 0;
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    setTimeout(() => {
      const url = this.router.url;
      const response = this.userService.forceRedirectToBack(url, this.route.queryParams, '/overview');
      if (response && response['isIncrement']) {
        this.increment = 0;
      } else if (response && !response['isIncrement']) {
        this.processDate(response['fromdates'], response['todates']);
      }
      if (this.increment === 0) {
        history.go(-1);
      }
      this.increment++;
    });
  }
  ngOnInit() {
    this.updatedTime = new Date();
    this.route.parent.params.subscribe(params => {
      this.routeParams = params;
    });

    this.tailDataSubscribtion = this.tailDataService.getData().subscribe(data => {
      if (data['tailNumber']) {
        this.getTailNumber = data['tailNumber'];
        this.tailNumber = data['tailNumber'];
        const fromDate = moment().subtract(6, 'days');
        const toDate = new Date();
        this.processDate(fromDate, toDate);
      }
    });

    this.tailNumber = this.routeParams.tailNumber;
    this.airlineIcao = this.routeParams.airlineIcao;

    this.route.queryParams.subscribe(params => {
      if (params.fromDate && params.toDate) {
        this.fromdates = params.fromDate.replace(/(^|\D)(\d)(?!\d)/g, '$10$2');
        this.todates = params.toDate.replace(/(^|\D)(\d)(?!\d)/g, '$10$2');
        // this.refreshProcess();
      }
    });

    this.lopaOptions = {
      displayDeckName: false,
      displayCabinClassName: false,
      isClickable: false,
      onMouseOver: false
    };

    this.dateValidation();
    this.processDate(this.fromdates, this.todates);
  }
  dateValidation() {
    const res = this.userService.dateValidation(this.fromdates, this.todates);
    if (res) {
      this.fromdates = res.fromdates;
      this.todates = res.todates;
    }
  }
  processDate(fromDate, toDate) {
    const timelineDateObj = {
      fromDate: this.getDates(fromDate, 'fromDate'),
      toDate: this.getDates(toDate, 'toDate')
    };
    if (timelineDateObj.fromDate.includes('T')) {
      timelineDateObj.fromDate = timelineDateObj.fromDate.split('T')[0];
    }
    if (timelineDateObj.toDate.includes('T')) {
      timelineDateObj.toDate = timelineDateObj.toDate.split('T')[0];
    }
    this.fromdates = timelineDateObj.fromDate;
    this.todates = timelineDateObj.toDate;
    if (!this.routeParams.fromDate && this.routeParams.toDate) {
      this.todates = this.routeParams.toDate;
      this.router.navigate(['airlines/' + this.routeParams.airlineIcao + '/tails/' + this.routeParams.tailNumber + '/overview'],
        { queryParams: { fromDate: this.fromdates, toDate: this.routeParams.toDate } });
    } else if (!this.routeParams.toDate && this.routeParams.fromDate) {
      this.fromdates = this.routeParams.fromDate;
      this.router.navigate(['airlines/' + this.routeParams.airlineIcao + '/tails/' + this.routeParams.tailNumber + '/overview'],
        { queryParams: { fromDate: this.routeParams.fromDate, toDate: this.todates } });
    } else if ((!this.routeParams.fromDate && !this.routeParams.toDate) || this.routeParams.fromDate && this.routeParams.toDate) {
      let tailNo = this.routeParams.tailNumber;
      if (this.getTailNumber) {
        tailNo = this.getTailNumber;
      }
      this.router.navigate(['airlines/' + this.routeParams.airlineIcao + '/tails/' + tailNo + '/overview'],
        { queryParams: { fromDate: this.fromdates, toDate: this.todates } });
      this.getTailNumber = null;
    }
    this.getLopaDetails();
    this.getConfigurationDetails();
    this.getBiteCovergaeData();
  }
  getDates(formatDate, dateName) {
    if (/[a-z]/i.test(formatDate.toString()) === false) {
      formatDate = formatDate.split('-').join('/');
    }
    let date = new Date(formatDate);
    if (dateName === 'fromDate' && (new Date(formatDate).toString() === 'Invalid Date')) {
      date = new Date();
      date.setDate(date.getDate() - 5);
    }
    if (dateName === 'toDate' && (new Date(formatDate).toString() === 'Invalid Date')) {
      date = new Date();
    }
    const convertedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    return convertedDate.replace(/(^|\D)(\d)(?!\d)/g, '$10$2');
  }

  getSelectedDates(datas) {
    this.isLoading = true;
    this.processDate(datas.fromDate, datas.toDate);
  }

  getConfigurationDetails() {
    this.tailService.getTailDetail(this.airlineIcao, this.tailNumber).subscribe(list => {
      const response: any = list;
      this.tailDetails = response[0];
    });
  }

  getBiteCovergaeData() {
    this.noCoverageData = false;
    const dateObj = {
      fromDate: this.fromdates.split('T')[0] + 'T00:00:00Z',
      toDate: this.todates.split('T')[0] + 'T23:59:59Z'
    };
    this.tailService.getCoverageData(this.airlineIcao, this.tailNumber, dateObj).subscribe(res => {
        this.biteCoverageData = res;
    }, err => console.log(err));
  }

  getLopaDetails() {
    this.isLoading = true;
    this.tailService.getLopaDetails(this.airlineIcao, this.tailNumber).subscribe(res => {
      this.lopaConf = res;
      if (this.lopaConf.deckConfig) {
        this.getLopaResets();
      } else {
        this.isLoading = false;
      }
    }, err => console.log(err));
  }

  getLopaResets() {
    const dateObj = {
      from: this.fromdates.split('T')[0] + 'T00:00:00Z',
      to: this.todates.split('T')[0] + 'T23:59:59Z'
    };
    this.tailService.getResetsCount(this.airlineIcao, this.tailNumber, dateObj).subscribe(res => {
      this.addResetsToLopaConf(res);
      this.isLoading = false;
    }, err => console.log(err));
  }

  addResetsToLopaConf(resets) {
    const resetsArr = [];
    resets.forEach(reset => {
      const svduCls = this.getResetsClass(reset.svduResets);
      const tpmuCls = this.getResetsClass(reset.tpmuResets);
      resetsArr.push({
        seat: reset.seat,
        value: reset.svduResets + reset.tpmuResets,
        tooltip: `<div class="font-weight-bold p-1">Seat ${reset.seat}</div>
                  <div class="p-1">
                    <span class="circle ${svduCls}"></span> SVDU Resets: <span class="font-weight-bold">${reset.svduResets}</span>
                  </div>
                  <div class="p-1">
                    <span class="circle ${tpmuCls}"></span> TPMU Resets: <span class="font-weight-bold">${reset.tpmuResets}</span>
                  </div>`
      });
    });
    this.lopaConf['data'] = resetsArr;
  }

  getResetsClass(resets) {
    return resets === 0 ? 'circle-success' :
    (resets >= 1 && resets <= 4 ? 'circle-warning' : 'circle-danger');
  }

  refreshProcess() {
    this.getLopaDetails();
    this.getBiteCovergaeData();
    this.getConfigurationDetails();
  }

  ngOnDestroy() {
    document.body.style.position = 'unset';
    this.tailDataSubscribtion.unsubscribe();
  }
}
