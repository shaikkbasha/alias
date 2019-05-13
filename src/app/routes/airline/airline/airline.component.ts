import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { UserService } from '../../../shared/services/user/user.service';
import { AirlineService } from '../../../shared/services/admin/airline/airline.service';
import { UserRoleAuthGuard } from '../../../shared/guards/user-role-access/user-role-auth.guard';
@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit, OnDestroy {

  airlinenavigationSubscription;
  currentAirline = '';
  currentAirlineId = '';
  enableTVperformance = true;
  hasAccessToSeveralAirlines: boolean;
  airlinesList = [];
  openModal = false;
  isLoading = false;
  selectedIcao = '';
  filterValue = '';
  dataSource: any = [];
  selection = new SelectionModel(false, []);
  selectedAirline = {};
  displayedColumns: string[] = ['select', 'airlineName'];

  @ViewChild('airlinesModal') popUpContent;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private userService: UserService,
    private airlineService: AirlineService,
    private userRoleAuthGuard: UserRoleAuthGuard
  ) { }

  ngOnInit() {
    this.airlinenavigationSubscription = this.router.events.subscribe((event: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });

    this.loadData();

    /**Check user has tv-performance tab access */
    this.enableTVperformance = true;
    this.userRoleAuthGuard.hasAccess.subscribe(data => {
      this.enableTVperformance = this.userRoleAuthGuard.checkJBUAccess(data);
    });
    this.hasAccessToSeveralAirlines = this.userService.hasSeveralAirlines();
    if (this.hasAccessToSeveralAirlines) {
      this.isLoading = true;
      this.getAllAirlines();
    }
  }

  loadData() {
    this.currentAirlineId = this.route.snapshot.paramMap.get('airlineIcao');
    this.selectedIcao = this.currentAirlineId;
    this.airlineService.getAirlineByIcao(this.currentAirlineId)
      .subscribe(airline => {
        const data: any = airline;
        if (!data.error) {
          this.currentAirline = data[0].name;
        } else {
          this.currentAirline = null;
        }
      });
  }

  getAllAirlines() {
    this.airlineService.getAirlineForUser().subscribe(res => {
      this.isLoading = false;
      if (res.length) {
        this.formatAirlinesList(res);
      }
    }, err => console.log(err));
  }

  formatAirlinesList(airlines) {
    const airlinesArr = [];
    this.airlinesList = [];
    airlines.forEach(aln => {
      airlinesArr.push(aln['name']);
    });
    const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true });
    airlinesArr.sort(sortAlphaNum);
    airlinesArr.forEach(airline => {
      airlines.forEach(airlineObj => {
        if (airline === airlineObj['name']) {
          this.airlinesList.push({
            airlineName: airlineObj['name'],
            airlineIcao: airlineObj['icao']
          });
        }
      });
    });
    this.dataSource = new MatTableDataSource(this.airlinesList);
  }

  modalHandler() {
    this.selectedAirline = this.airlinesList.find(airline => airline['airlineIcao'] === this.selectedIcao);
    this.selection = new SelectionModel(false, [this.selectedAirline]);
    this.modalService.open(this.popUpContent, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

  filterAirline(searchText) {
    this.filterValue = searchText.trim().toLowerCase();
    this.dataSource.filter = this.filterValue;
  }

  selectedRow() {
    setTimeout(() => {
      this.selectedIcao = this.selection.selected.length ? this.selection.selected[0]['airlineIcao'] : '';
    });
  }

  navigateToAirline() {
    if (this.selectedIcao && this.selectedIcao !== this.currentAirlineId) {
      this.dataSource.filter = '';
      if (this.router) {
        const currentRoute = this.router.url.split('/')[3].split('?')[0];
        this.router.navigate(['airlines', this.selectedIcao, currentRoute]);
      }
    }
  }

  resetModal() {
    this.selectedIcao = this.currentAirlineId;
    this.dataSource.filter = '';
    this.selection.clear();
    document.body.scrollTop = 0;
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.airlinenavigationSubscription) {
      this.airlinenavigationSubscription.unsubscribe();
    }
  }

  isAirlineDropdownItemActive(instructions: any[][]): boolean {
    // https://stackoverflow.com/questions/39271654/routerlinkactive-for-routerlink-with-parameters-dynamic

    for (let i = 0; i < instructions.length; i++) {

      const isLinkActive = this.router.isActive(this.router.createUrlTree(instructions[i]), false);
      if (isLinkActive) {
        return true;
      }
    }

    return false;
  }
  isAirlineActive(instruction: any[]): boolean {
    // https://stackoverflow.com/questions/39271654/routerlinkactive-for-routerlink-with-parameters-dynamic

    // Set the second parameter to true if you want to require an exact match.
    return this.router.isActive(this.router.createUrlTree(instruction), false);
  }

}
