import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ISubscription } from 'rxjs/Subscription';
import * as moment from 'moment-timezone';
import { FlightsService } from '../../../shared/services/airline-tail/flights/flights.service';
import { DateFormatterService } from '../../../shared/services/dateFormatter/dateformatter.service';
import { TailsDataService } from '../../../shared/services/tails/tails-data.service';
import { Flights } from './flights';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit, OnDestroy {

  routeParams: any = {
    airlineId: null
  };
  airlineIcao = '';
  tailNumber = '';
  updatedTime: any;
  dataSource: any = [];
  isLoading = false;
  toDate: string;
  fromDate: string;
  fromdates: any = moment().subtract(3, 'days');
  todates: any = new Date();
  selection: any = new SelectionModel<any>(false, []);
  displayedColumns: string[] = [
    'status',
    'flightNumber',
    'departureAirport',
    'arrivalAirport',
    'startTime',
    'endTime'
  ];
  actionToolBarConfig = {
    createLabel: '',
    moduleName: 'flights',
    id: '',
    enableSearch: true,
    enableCreate: false,
    filterIds: {
      filterListId: 'filter-flights-list',
      filterText: 'inp-filter-flights-text'
    },
    buttonList: []
  };
  tailObj: any = {
    formObj: null,
    selectedRow: [],
    selectedIndex: null
  };
  tailDataSubscribtion: ISubscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public flightsService: FlightsService,
    private dateService: DateFormatterService,
    private tailDataService: TailsDataService
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.airlineIcao = params.airlineIcao;
      this.tailNumber = params.tailNumber;
    });

    this.tailDataSubscribtion = this.tailDataService.getData().subscribe(data => {
      if (data['tailNumber']) {
        this.tailNumber = data['tailNumber'];
        this.router.navigate(['airlines', this.airlineIcao, 'tails', this.tailNumber, 'flight-legs']);
        this.updateFlights();
      }
    });

    this.updateFlights();

  }

  /** Fetch Airlines List **/
  getFlightsList() {
    this.isLoading = true;
    this.dataSource.data = [];
    const dateObj = {
      fromDate: this.fromDate,
      toDate: this.toDate
    };
    const fields = ['flightLeg', 'statuses'];
    this.flightsService.getFlights(this.airlineIcao, this.tailNumber, dateObj, fields).subscribe(list => {
      const flightList = [];
      this.updatedTime = new Date();
      if (list && !list['error'] && !list['message']) {
        list.forEach(element => {
          const flightLegWithStatus = {
            id: element.flightLeg.id,
            flightNumber: element.flightLeg.flightNumber,
            departureAirport: element.flightLeg.departureAirport,
            arrivalAirport: element.flightLeg.arrivalAirport,
            startTime: element.flightLeg.startTime,
            endTime: element.flightLeg.endTime,
            status: this.getStatusClassName(element.statuses),
            statuses: {
              businessClass: this.getStatusClassName(element.statuses.businessClassStatus),
              economyClass: this.getStatusClassName(element.statuses.economyClassStatus),
              firstClass: this.getStatusClassName(element.statuses.firstClassStatus),
              headEnd: this.getStatusClassName(element.statuses.headEndStatus),
              systemReset: this.getStatusClassName(element.statuses.systemResetStatus)
            }
          };
          flightList.push(flightLegWithStatus);
        });
        this.dataSource = new MatTableDataSource<any>(flightList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.dataSource = new MatTableDataSource<Flights>([]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      this.isLoading = false;
    });
  }

  getStatusClassName(status) {
    if (status.headEndStatus && status.businessClassStatus && status.economyClassStatus &&
      status.firstClassStatus && status.systemResetStatus) {
      let statusClassName = '';
      const flightLegStatusColor = [
        status.businessClassStatus.toLowerCase(),
        status.headEndStatus.toLowerCase(),
        status.firstClassStatus.toLowerCase(),
        status.economyClassStatus.toLowerCase(),
        status.systemResetStatus.toLowerCase()
      ];
      if (status.economyClassStatus === 'none' && status.businessClassStatus === 'none' &&
        status.headEndStatus === 'none' && status.firstClassStatus === 'none' && status.systemResetStatus === 'none') {
        statusClassName = 'timeline-flightleg-grey';
      } else if (flightLegStatusColor.indexOf('ko') !== -1) {
        statusClassName = 'timeline-flightleg-red';
      } else if (flightLegStatusColor.indexOf('ok') !== -1) {
        statusClassName = 'timeline-flightleg-green';
      }
      return statusClassName;
    } else {
      const singleStatus = status.toLowerCase();
      if (singleStatus === 'none') {
        return 'timeline-flightleg-grey';
      } else if (singleStatus === 'ko') {
        return 'timeline-flightleg-red';
      } else if (singleStatus === 'ok') {
        return 'timeline-flightleg-green';
      }
    }
  }

  getEvent(data) {
  }

  updateFlights() {
    const now = new Date();
    now.setDate(now.getDate() - 3);
    this.fromdates = now;
    this.todates = new Date();
    this.processDate(new Date(now), new Date());
    this.updatedTime = this.todates;
    this.getFlightsList();
  }


  flightsFilter(filterValue) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Data source defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.isLoading = false;
  }

  processDate(previousDate, CurrentDate) {
    const dates = this.dateService.getDates(previousDate, CurrentDate);
    this.fromDate = dates.fromDate;
    this.toDate = dates.toDate;
  }

  getSelectedDates(data) {
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource.data = [];
    }
    this.processDate(new Date(data.fromDate), new Date(data.toDate));
    this.getFlightsList();
  }

  selectedRow() {
    if (this.selection.selected.length === 1) {
      this.tailObj['selectedIndex'] = this.dataSource.data.findIndex(
        x => x.id === this.selection.selected[0].id
      );
      this.tailObj.selectedRow = [this.selection.selected[0]];
    } else {
      this.tailObj.selectedRow = this.selection.selected;
    }
  }

  ngOnDestroy() {
    this.tailDataSubscribtion.unsubscribe();
  }
}
