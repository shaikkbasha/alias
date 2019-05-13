import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDatepicker } from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as moment from 'moment-timezone';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DateFormatterService } from '../../../shared/services/dateFormatter/dateformatter.service';
import { RepairsService } from 'src/app/shared/services/repair/repairs/repairs.service';
import { HostListener } from '@angular/core';
import { UserService } from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.css']
})
export class RepairsComponent implements OnInit {
  dataSource: any = [];
  selection: any = new SelectionModel<any>(false, []);
  updatedTime: any;
  isLoading = false;
  isLoad = false;
  repairRoutePars: any;
  actionList: any = [];
  showDetailsList: any = [];
  repairModInData = [];
  repairModOutData = [];
  modActiveFilterMouseDown: any;
  modInActiveFilterMouseDown: any;
  revisionObject = {};
  repairModIn1: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  repairModDot1: Array<any> = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
  empMod: any = [];
  repairActionToolBarConfig = {
    createLabel: '',
    moduleName: 'Repairs',
    id: 'btn-overview',
    filterIds: {
      filterListId: 'filter-repairs-list',
      filterText: 'inp-filter-repairs-text'
    },
    enableSearch: true,
    enableCreate: false,
    buttonList: []
  };
  fromdates: any = moment().subtract(2, 'days');
  todates: any = moment(new Date());
  modMouseDownFilter: number;
  modFilter: number;

  /**repair Table Configuration */
  repairTableCells: any = {
    labels: ['LRU PART NUMBER', 'SERIAL NUMBER ', 'REPAIR DATE (UTC)', 'REPAIR STATION', 'AIRLINE', 'TAIL', 'ACTIONS'],
    columns: ['lruPartNumber', 'serialNumberOFF', 'repairDate', 'repairStation', 'airlineName', 'tailSign', 'actions']
  };
  @ViewChild('reviewModal') private reviewModal: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('repairLruSerialSort') repairLruSerialSort: MatSort;
  /**Navigate to previous path */
  increment = 0;
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    setTimeout(() => {
      const repairUrl = this.router.url;
      const repairResponse = this.userService.forceRedirectToBack(repairUrl, this.route.queryParams, 'repair-management/repairs');
      if (repairResponse && repairResponse['isIncrement']) {
        this.increment = 0;
      } else if (repairResponse && !repairResponse['isIncrement']) {
        this.getFilterDate(repairResponse['fromdates'], repairResponse['todates']);
      }
      if (this.increment === 0) {
        history.go(-1);
      }
      this.increment++;
    });
  }
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute, public toaster: ToastrService, conf: NgbModalConfig, public modalService: NgbModal,
    private router: Router, private dateService: DateFormatterService, private repairServices: RepairsService,
    private userService: UserService
  ) {
    conf.backdrop = 'static';
    conf.keyboard = false;
  }
  ngOnInit() {
    this.route.queryParams.subscribe(repairPars => {
      this.repairRoutePars = repairPars;
      if (repairPars.fromDate && repairPars.toDate) {
        this.fromdates = repairPars.fromDate.replace(/(^|\D)(\d)(?!\d)/g, '$10$2');
        this.todates = repairPars.toDate.replace(/(^|\D)(\d)(?!\d)/g, '$10$2');
      }
    });
    this.dateValidation();
    this.getFilterDate(this.fromdates, this.todates);
  }
  dateValidation() {
    const res = this.userService.dateValidation(this.fromdates, this.todates);
    if (res) {
      this.fromdates = res.fromdates;
      this.todates = res.todates;
    }
  }
  getEvent(id) {
    this.open(this.reviewModal);
    if (id) {
      this.repairModInData = [];
      this.repairModOutData = [];
      this.isLoad = true;
      this.repairServices.getShowDetails(id).subscribe((data) => {
        this.showDetailsList = data;
        if (parseInt(this.showDetailsList.repairType, 10) === 2) {
          this.repairServices.getActionDetails(this.showDetailsList.removal.lruPartNumberId).subscribe((actionData) => {
            this.actionList = actionData;
            this.showDetailsList['lruPartNumDrop'] = {};
            this.actionList.forEach(item => {
              this.showDetailsList['lruPartNumDrop'][item.id] = item;
            });
          });
        }
        if (!this.showDetailsList.error) {
          if (this.showDetailsList.removal.modDotIn) {
            this.repairModInData = this.showDetailsList.removal.modDotIn.split(',').map(i => {
              return parseInt(i, 10);
            });

            if (this.showDetailsList && this.showDetailsList.modDotOut) {
              this.repairModOutData = this.showDetailsList.modDotOut.split(',').map(i => {
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

  getRepairList() {
    this.isLoading = true;
    this.dataSource.data = [];
    const dateObj = {
      fromDate: this.fromdates.split('T')[0] + 'T00:00:00Z',
      toDate: this.todates.split('T')[0] + 'T23:59:59Z'
    };
    this.repairServices.getRepairList(dateObj).subscribe(repiars => {
      if (repiars && !repiars['error']) {
        this.dataSource = new MatTableDataSource<any>(repiars);
        this.dataSource.sort = this.repairLruSerialSort;
        this.msSortData({ active: 'arrivalDate', direction: 'asc' });
      } else {
        this.dataSource = new MatTableDataSource<any>([]);
      }
      this.updatedTime = new Date();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  getSelectedDates(data) {
    this.isLoading = true;
    if (this.dataSource) {
      this.dataSource.data = [];
    }
    this.getFilterDate(data.fromDate, data.toDate);
  }

  getFilterDate(fromDate, toDate) {
    const repairsDateObj = {
      fromDate: this.dateService.getDateWithPreviousRange(fromDate, 'fromDate', 2),
      toDate: this.dateService.getDateWithPreviousRange(toDate, 'toDate')
    };
    if (repairsDateObj.fromDate.includes('T')) {
      repairsDateObj.fromDate = repairsDateObj.fromDate.split('T')[0];
    }
    if (repairsDateObj.toDate.includes('T')) {
      repairsDateObj.toDate = repairsDateObj.toDate.split('T')[0];
    }
    this.fromdates = repairsDateObj.fromDate;
    this.todates = repairsDateObj.toDate;
    const url = ['repair-management/repairs'];
    if (!this.repairRoutePars.fromDate && this.repairRoutePars.toDate) {
      this.todates = this.repairRoutePars.toDate;
      this.router.navigate(url, { queryParams: { fromDate: this.fromdates, toDate: this.repairRoutePars.toDate } });
    } else if (!this.repairRoutePars.toDate && this.repairRoutePars.fromDate) {
      this.fromdates = this.repairRoutePars.fromDate;
      this.router.navigate(url, { queryParams: { fromDate: this.repairRoutePars.fromDate, toDate: this.todates } });
    } else if ((!this.repairRoutePars.fromDate && !this.repairRoutePars.toDate) ||
      this.repairRoutePars.fromDate && this.repairRoutePars.toDate) {
      this.router.navigate(url, { queryParams: { fromDate: this.fromdates, toDate: this.todates } });
    }
    this.getRepairList();
  }

  repairFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.isLoading = false;
  }
  msSortData(sort) {
    let data = [];
    data = this.dataSource.data;
    this.dataSource = new MatTableDataSource<any>(data);

    if (!sort.active || sort.direction === '') {
      data = this.dataSource.data;
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.sort = this.repairLruSerialSort;
      return;
    }
    const stationsDataSource = this.sortData(sort, data);
    this.dataSource = new MatTableDataSource<any>(stationsDataSource);
    this.dataSource.sort = this.repairLruSerialSort;
  }
  sortData(sort, data) {
    return data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'lruPartNumber': return this.compare(a.lruPartNumber, b.lruPartNumber, isAsc);
        case 'serialNumberOFF': return this.compare(a.serialNumberOFF, b.serialNumberOFF, isAsc);
        case 'repairDate': return this.compare(a.repairDate, b.repairDate, isAsc);
        case 'repairStation': return this.compare(a.repairStation, b.repairStation, isAsc);
        case 'airlineName': return this.compare(a.airlineName, b.airlineName, isAsc);
        case 'tailSign': return this.compare(a.tailSign, b.tailSign, isAsc);
        default: return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
