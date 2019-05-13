import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as moment from 'moment-timezone';
import { SelectionModel } from '@angular/cdk/collections';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DateFormatterService } from '../../../shared/services/dateFormatter/dateformatter.service';
import { RemovalsService } from '../../../shared/services/repair/removals/removals.services';
import 'rxjs/add/operator/filter';
import { Removal } from './removal';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { HostListener } from '@angular/core';
import { UserService } from '../../../shared/services/user/user.service';
@Component({
  selector: 'app-removal',
  templateUrl: './removal.component.html',
  styleUrls: ['./removal.component.css']
})
export class RemovalComponent implements OnInit {
  dataSource: any = [];
  actionList: any = [];
  showDetailsList: any = [];
  selection: any = new SelectionModel<Removal>(false, []);
  updatedTime: any;
  isLoading = false;
  isLoad = false;
  routeParams: any;
  modInData = [];
  modOutData = [];
  modActiveFilterMouseDown: any;
  modInActiveFilterMouseDown: any;
  modMouseDownFilter: number;
  modFilter: number;
  revisionObject = {};
  modIn1: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  modDot1: Array<any> = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
  empMod: any = [];
  fromdates: any = moment().subtract(2, 'days');
  todates: any = moment(new Date());
  actionToolBarConfig = {
    moduleName: 'Removals',
    id: 'btn-list-removal',
    filterIds: {
      filterListId: 'filter-removals-list',
      filterText: 'inp-filter-removals-text'
    },
    enableSearch: true,
    enableCreate: false,
    buttonList: []
  };
  /**Removal Table Configuration */
  removalTableCells: any = {
    labels: ['LRU PART NUMBER', 'SERIAL NUMBER ', 'REMOVAL DATE (UTC)', 'MAINTENANCE STATION', 'AIRLINE', 'TAIL', 'SOURCE', 'REPAIRED',
     'ACTIONS'],
    columns: ['lruPartNumber', 'serialNumberOFF', 'removalDate', 'maintenanceStation', 'airlineName', 'tailSign', 'source', 'isRepaired',
     'actions']
  };
  /**Removal Table Configuration */
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('reviewModal') private reviewModal: TemplateRef<any>;

  /**Navigate to previous path */
  increment = 0;
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    setTimeout(() => {
      const url = this.router.url;
      const response = this.userService.forceRedirectToBack(url, this.route.queryParams, 'repair-management/removals');
      if (response && response['isIncrement']) {
        this.increment = 0;
      } else if (response && !response['isIncrement']) {
        this.getRepairFilterDate(response['fromdates'], response['todates']);
      }
      if (this.increment === 0) {
        history.go(-1);
      }
      this.increment++;
    });
  }
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute, public toaster: ToastrService, config: NgbModalConfig, public modalService: NgbModal,
    private router: Router, private dateService: DateFormatterService,
    private removalsService: RemovalsService,
    private userService: UserService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.routeParams = params;
      if (params.fromDate && params.toDate) {
        this.fromdates = params.fromDate.replace(/(^|\D)(\d)(?!\d)/g, '$10$2');
        this.todates = params.toDate.replace(/(^|\D)(\d)(?!\d)/g, '$10$2');
      }
    });

    this.dateValidation();
    this.getRepairFilterDate(this.fromdates, this.todates);
  }


  getEvent(id) {
    this.open(this.reviewModal);
    if (id) {
      this.modInData = [];
      this.modOutData = [];
      this.isLoad = true;
      this.removalsService.getShowDetails(id).subscribe((data) => {
        this.showDetailsList = data;
        if (this.showDetailsList && this.showDetailsList.repair && this.showDetailsList.repair.repairType
          &&
          parseInt(this.showDetailsList.repair.repairType, 10) === 2) {
          this.removalsService.getActionDetails(this.showDetailsList.lruPartNumberId).subscribe((actionData) => {
            this.actionList = actionData;
            this.showDetailsList['lruPartNumDrop'] = {};
            this.actionList.forEach(item => {
              this.showDetailsList['lruPartNumDrop'][item.id] = item;
            });
          });
        }
        if (!this.showDetailsList.error) {
          if (this.showDetailsList['modDotIn']) {
            this.modInData = this.showDetailsList['modDotIn'].split(',').map(i => {
              return parseInt(i, 10);
            });
            if (this.showDetailsList.repair && this.showDetailsList.repair.modDotOut) {
              this.modOutData = this.showDetailsList.repair.modDotOut.split(',').map(i => {
                return parseInt(i, 10);
              });
            }
          }
        }
        this.isLoad = false;
      });
    }
  }
  open(content) {
    this.modalService.open(
      content,
      { centered: true, windowClass: 'hugeModal' }
    );
  }


  dateValidation() {
    const res = this.userService.dateValidation(this.fromdates, this.todates);
    if (res) {
      this.fromdates = res.fromdates;
      this.todates = res.todates;
    }
  }
  getRemovalList() {
    this.isLoading = true;
    this.dataSource.data = [];
    const getFromDate = this.fromdates.split('T');
    const getToDate = this.todates.split('T');

    this.removalsService.getRemovalsList({
      fromDate: getFromDate[0] + 'T00:00:00Z',
      toDate: getToDate[0] + 'T23:59:59Z'
    }).subscribe(list => {
      if (list && !list['error']) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].source) {
            if (list[i].source === 'health-app') {
              list[i].source = 'Health App';
            } else if (list[i].source === 'servo') {
              list[i].source = 'Servo';
            }
          }
        }
        this.dataSource = new MatTableDataSource<any>(list);
      } else {
        this.dataSource = new MatTableDataSource<any>([]);
      }
      this.updatedTime = new Date();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  getRepairSelectedDates(data) {
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource.data = [];
    }
    this.getRepairFilterDate(data.fromDate, data.toDate);
  }

  getRepairFilterDate(fromDate, toDate) {
    const dateObj = {
      fromDate: this.dateService.getDateWithPreviousRange(fromDate, 'fromDate', 2),
      toDate: this.dateService.getDateWithPreviousRange(toDate, 'toDate')
    };
    if (dateObj.fromDate.includes('T')) {
      dateObj.fromDate = dateObj.fromDate.split('T')[0];
    }
    if (dateObj.toDate.includes('T')) {
      dateObj.toDate = dateObj.toDate.split('T')[0];
    }
    this.fromdates = dateObj.fromDate;
    this.todates = dateObj.toDate;
    if (!this.routeParams.fromDate && this.routeParams.toDate) {
      this.todates = this.routeParams.toDate;
      this.router.navigate(['repair-management/removals'], { queryParams: { fromDate: this.fromdates, toDate: this.routeParams.toDate } });
    } else if (!this.routeParams.toDate && this.routeParams.fromDate) {
      this.fromdates = this.routeParams.fromDate;
      this.router.navigate(['repair-management/removals'], { queryParams: { fromDate: this.routeParams.fromDate, toDate: this.todates } });
    } else if ((!this.routeParams.fromDate && !this.routeParams.toDate) || this.routeParams.fromDate && this.routeParams.toDate) {
      this.router.navigate(['repair-management/removals'], { queryParams: { fromDate: this.fromdates, toDate: this.todates } });
    }
    this.getRemovalList();
  }

  removalsFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Data source defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.isLoading = false;
  }
}
