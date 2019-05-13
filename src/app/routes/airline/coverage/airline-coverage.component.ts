import { AfterViewInit, TemplateRef, Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISubscription } from 'rxjs/Subscription';
import * as moment from 'moment-timezone';
import { CoverageService } from '../../../shared/services/coverage/airlinecoverage.service';
import { FlightService } from '../../../shared/services/flights/airlineflights.service';
import { FlightModel } from '../../../shared/services/flights/airlineflights';
import { DateFormatterService } from '../../../shared/services/dateFormatter/dateformatter.service';
@Component({
  selector: 'app-airline-coverage',
  templateUrl: './airline-coverage.component.html',
  styleUrls: ['./airline-coverage.component.css']
})


export class AirlineCoverageComponent implements OnInit, AfterViewInit, OnDestroy  {
  selectedTail: string;
  productsObj: any = {
    dataSource: [],

    isLoading: false,
    displayedColumns: ['flightNumber', 'arrivalAirport', 'departureAirport',
      'departureDate', 'arrivalDate', 'biteOffloadReceived']

  };
  displayedColumns: string[] = [];
  dataSource: any = [];
  updatedTime: any;
  isLoading = false;
  id: string;
  fromdates: any = moment().subtract('days', 3);
  todates: any = new Date();
  toDate: string;
  fromDate: string;
  data: any = [
    { title: 'ALL TAILS ', filterValue: 'all', filterKey: 'tail' },
    { title: 'MISSING OFFLOADS', filterValue: '100', filterKey: 'percentage', filterRule: 'yes' },
    { title: 'MISSING ALL OFFLOADS', filterValue: '0', filterKey: 'offloads', filterRule: 'yes' }
  ];
  actionToolBarConfig = {
    createLabel: 'coverage',
    moduleName: 'coverage',
    id: 'btn-coverage',
    filterIds : {
      filterListId: 'filter-coverage-list',
      filterText: 'inp-filter-coverage-text'
    },
    enableSearch: true,
    enableCreate: false,
    buttonList: []
  };
  widgetFilterObj: any = {
    allOffloads: [],
    missing: [],
    allmissing: []
  };
  navigationSubscription;
  routeSubscribtion: ISubscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('tailCoverageSort') tailCoverageSort: MatSort;
  @ViewChild('coverageTailForm') private coverageTailForm: TemplateRef<any>;
  constructor(private router: Router,
    private coverageService: CoverageService,
    private route: ActivatedRoute,
    public modalService: NgbModal,
    private flightService: FlightService,
    private dateService: DateFormatterService
  ) {
  }
  ngOnInit() {
    if (this.route.parent) {
      this.routeSubscribtion = this.route.parent.params.subscribe(params => {
        this.id = params['airlineIcao'];
        this.getCoverageData();
      });
    }
    this.getCoverageData();
  }
  ngAfterViewInit() {
    this.productsObj.dataSource.sort = this.sort;
  }
  getCoverageData() {
    const now = new Date();
    now.setDate(now.getDate() - 3);
    this.processDate(new Date(now), new Date());
    this.getCoverageList();
    this.updatedTime = new Date();
  }
  processDate(previousDate, CurrentDate) {
    const dates = this.dateService.getDates(previousDate, CurrentDate);
    this.fromDate = dates.fromDate;
    this.toDate = dates.toDate;
  }
  fetchCoverages() {
    this.coverageService.getCoverageList(this.id, this.fromDate, this.toDate).subscribe(list => {
      const ELEMENT_DATA: any = list;
      const own = this;
      const dataToMap = [];
      if (ELEMENT_DATA.error) {
        this.dataSource = new MatTableDataSource([]);
      } else {
        ELEMENT_DATA.forEach(ele => {
          const data = [];
          for (const key in ele) {
            if (typeof ele[key] !== 'object') {
              data[key] = ele[key];
              own.isColumnExist(key);
            } else {
              for (const k in ele[key]) {
                if (ele[key].hasOwnProperty(k)) {
                  data[k] = ele[key][k];
                  own.isColumnExist(k);
                }
              }
            }
          }
          dataToMap.push(data);
        });
      }
      this.dataSource = new MatTableDataSource(dataToMap);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  isColumnExist(column) {
    let isColFound = false;
    this.displayedColumns.forEach(col => {
      if (col === column) {
        isColFound = true;
      }
    });
    if (!isColFound) {
      this.displayedColumns.push(column);
    }
  }

  checkNumber(value) {
    return new Date(value).toString();
  }

  show(col, expectCol) {
    if (col === expectCol) {
      return true;
    }
    return false;
  }

  getClass(value) {
    if (value >= 90) {
      return 'circle-success';
    }
    if (value < 80) {
      return 'circle-danger';
    }
    return 'circle-warning';
  }
  getCoverageList() {
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource = [];
      this.displayedColumns = [];
    }
    this.fetchCoverages();
  }

  coverageFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Data source defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getSelectedDates(data) {
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource = [];
      this.displayedColumns = [];
    }
    this.processDate(new Date(data.fromDate), new Date(data.toDate));
    this.fetchCoverages();
  }

  getFilteredData(data) {
    this.isLoading = true;
    this.dataSource.data = [];
    const timer = setTimeout(() => {
      this.dataSource.data = data.datasource;
      this.isLoading = false;
      clearTimeout(timer);
    }, 500);
  }

  fetchFlightLists() {
    delete this.dataSource.isFiltered;
    this.flightService.getFlightList(this.id, this.fromDate, this.toDate, this.selectedTail, true).subscribe(list => {
      const data: any = list;

      if (data.error) {
        this.productsObj.dataSource = new MatTableDataSource<FlightModel>([]);
      } else {

        this.productsObj.dataSource = new MatTableDataSource<FlightModel>(data);
        this.productsObj.dataSource.sort = this.tailCoverageSort;
        this.msSortData({active: 'arrivalDate', direction: 'asc'});
      }
      this.productsObj.isLoading = false;
    });
  }

  displayAircraftFlight(tail) {
    this.selectedTail = tail;
    this.open(this.coverageTailForm);
    this.fetchFlightLists();
  }

  open(content) {
    this.productsObj.modalRef = this.modalService.open(
      content,
      { centered: true, size: 'lg' }
    );
  }
  sortData(sort, data) {
    return data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'arrivalDate': return this.compare(a.arrivalDate, b.arrivalDate, isAsc);
        case 'departureDate': return this.compare(a.departureDate, b.departureDate, isAsc);
        case 'flightNumber': return this.compare(a.flightNumber, b.flightNumber, isAsc);
        case 'arrivalAirport': return this.compare(a.arrivalAirport, b.arrivalAirport, isAsc);
        case 'departureAirport': return this.compare(a.departureAirport, b.departureAirport, isAsc);

        default: return 0;
      }
    });
  }

  msSortData(sort) {
    let data = [];
    data =  this.productsObj.dataSource.data;
    this.productsObj.dataSource = new MatTableDataSource<any>(data);

    if (!sort.active || sort.direction === '') {
      data = this.productsObj.dataSource.data;
      this.productsObj.dataSource = new MatTableDataSource<any>(data);
      this.productsObj.dataSource.sort = this.tailCoverageSort;
      return;
    }

     const stationsDataSource = this.sortData(sort, data);

    this.productsObj.dataSource = new MatTableDataSource<any>(stationsDataSource);
    this.productsObj.dataSource.sort = this.tailCoverageSort;

  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngOnDestroy() {
    this.routeSubscribtion.unsubscribe();
  }
}
