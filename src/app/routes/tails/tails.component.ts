import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { AirlineTailService } from '../../shared/services/tails/airlinetails.service';
import { TailsDataService } from '../../shared/services/tails/tails-data.service';

@Component({
  selector: 'app-tails',
  templateUrl: './tails.component.html',
  styleUrls: ['./tails.component.css']
})
export class TailsComponent implements OnInit, OnDestroy {
  navigationSubscription;
  tailsList = [];
  currentAirlineId = '';
  tailNumber = '';
  selectedTail = '';
  selectedTailObj = {};
  filterValue = '';
  isLoading = false;
  dataSource: any;
  selection = new SelectionModel(false, []);
  displayedColumns: string[] = ['select', 'tailNumber'];
  airlineSubscribtion: any;

  @ViewChild('tailsModal') popUpContent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private airlineTailService: AirlineTailService,
    private tailDataService: TailsDataService
  ) {
  }

  ngOnInit() {
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
    // this.dataSource.filterPredicate = (data: Tails, filter: string) => data.tailNumber.indexOf(filter) !== -1;
    this.loadData();
  }

  loadData() {
      this.airlineSubscribtion = this.route.parent.params.subscribe(params => {
        this.currentAirlineId = params['airlineIcao'];
        console.log('FlightsComponent#loadData - currentAirlineId: ', this.currentAirlineId);
        if (!this.tailsList.length) {
          this.getAllTails();
        }
      });
      // this.currentAirlineId = this.route.snapshot.paramMap.get('airlineIcao');
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
    this.airlineSubscribtion.unsubscribe();
  }

  getAllTails() {
    this.isLoading = true;
    this.airlineTailService.getAircraftlist(this.currentAirlineId).subscribe(res => {
      this.isLoading = false;
      this.getTableData(res);
    }, err => console.log(err));
  }

  modalHandler() {
    this.selectedTailObj = this.tailsList.find(airline => airline['tailNumber'] === this.selectedTail);
    this.selection = new SelectionModel(false, [this.selectedTailObj]);
    this.modalService.open(this.popUpContent, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

  isActive(instruction: any[]): boolean {
    // https://stackoverflow.com/questions/39271654/routerlinkactive-for-routerlink-with-parameters-dynamic

    // Set the second parameter to true if you want to require an exact match.
    return this.router.isActive(this.router.createUrlTree(instruction), false);
  }

  isDropdownItemActive(instructions: any[][]): boolean {
    // https://stackoverflow.com/questions/39271654/routerlinkactive-for-routerlink-with-parameters-dynamic

    for (let i = 0; i < instructions.length; i++) {

      const isLinkActive = this.router.isActive(this.router.createUrlTree(instructions[i]), false);
      if (isLinkActive) {
        return true;
      }
    }

    return false;
  }

  getTableData(res) {
    this.airlineSubscribtion = this.route.parent.params.subscribe(params => {
      if (params['tailNumber']) {
        this.tailNumber = params['tailNumber'];
        this.isValidTailNumber(res);
      }
    });
  }

  isValidTailNumber(res) {
      this.selectedTail = this.tailNumber;
      this.tailsList = [];
      const arrTails = [];
      if (res.length) {
        res.forEach(tail => {
          arrTails.push(tail['tailNumber']);
        });
      }
      const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true });
      arrTails.sort(sortAlphaNum);
      arrTails.forEach(tail => this.tailsList.push({tailNumber: tail}));
      const filteredTails = this.tailsList.filter( tail => {
        if (this.tailNumber === tail['tailNumber']) {
          return tail;
        }
      });
      if (filteredTails.length) {
        this.dataSource = new MatTableDataSource(this.tailsList);
        this.isLoading = false;
      } else {
        this.router.navigate(['not-found']);
      }
  }

  selectedRow() {
    setTimeout(() => {
      this.selectedTail = this.selection.selected.length ? this.selection.selected[0]['tailNumber'] : '';
    });
  }

  filterTail(searchText) {
    this.filterValue = searchText.trim().toLowerCase();
    this.dataSource.filter = this.filterValue;
  }

  navigateToTail() {
    if (this.selectedTail) {
      this.dataSource.filter = '';
      this.tailNumber = this.selectedTail;
      document.body.scrollTop = 0;
      this.tailDataService.sendData({ tailNumber: this.selectedTail });
    }
  }

  resetTails() {
    this.dataSource.filter = '';
    this.selection.clear();
    this.selectedTail = this.tailNumber;
    document.body.scrollTop = 0;
  }

}
