import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ConnectivityService } from '../../shared/services/airline-flights/connectivity/connectivity.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit, OnDestroy {
  flightnavigationSubscription;

  currentAirlineId = 'QTR';
  flightLegId = '';
  tailNumber = '';
  getFlightInoSubscription: any;
  flightNumber: any;
  constructor(private route: ActivatedRoute, private router: Router, private connectivityService: ConnectivityService) {
  }

  ngOnInit() {
    this.flightnavigationSubscription = this.router.events.subscribe((event: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });

    this.getFlightInoSubscription = this.connectivityService.flightData.subscribe(data => {
      this.flightNumber = data.flightNumber;
    });
    this.loadData();
  }

  loadData() {
    this.currentAirlineId = this.route.snapshot.paramMap.get('airlineIcao');
    this.flightLegId = this.route.snapshot.paramMap.get('flightLegId');
    this.tailNumber = this.route.snapshot.paramMap.get('tailNumber');
    console.log('AirlineComponent#loadData - currentAirlineId: ', this.currentAirlineId);
  }

  ngOnDestroy() {
    this.getFlightInoSubscription.unsubscribe();
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.flightnavigationSubscription) {
      this.flightnavigationSubscription.unsubscribe();
    }
  }

  isFlightDropdownItemActive(instructions: any[][]): boolean {
    // https://stackoverflow.com/questions/39271654/routerlinkactive-for-routerlink-with-parameters-dynamic

    for (let i = 0; i < instructions.length; i++) {

      const isLinkActive = this.router.isActive(this.router.createUrlTree(instructions[i]), false);
      if (isLinkActive) {
        return true;
      }
    }

    return false;
  }
  isFlightActive(instruction: any[]): boolean {
    // https://stackoverflow.com/questions/39271654/routerlinkactive-for-routerlink-with-parameters-dynamic

    // Set the second parameter to true if you want to require an exact match.
    return this.router.isActive(this.router.createUrlTree(instruction), false);
  }
}
