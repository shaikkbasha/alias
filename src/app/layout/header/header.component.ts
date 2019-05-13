import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { OktaAuthService } from '@okta/okta-angular';
import { UserService } from '../../shared/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AirlineService } from '../../shared/services/admin/airline/airline.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  displayFullTime = true;
  currentDateTime: Date = new Date();

  private currentAirline;

  constructor(private route: ActivatedRoute,
              public oktaAuth: OktaAuthService,
              private router: Router,
              private userService: UserService,
              // private service: AirlineService,
              private airlineService: AirlineService,
              public toaster: ToastrService,
              breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe(['(max-width: 1022px)']).subscribe(result => {
      this.displayFullTime = this.getResult(result);
    });
  }

  ngOnInit() {
    this.utcTime();
    this.checkAirlineAccess(); // Check Airline Access
  }

  getResult(result) {
    if (result.matches) {
      return false;
    }
    return true;
  }
  selectAirline(icao: any) {
    console.log('selected airline: ' + icao);

    if (icao !== this.currentAirline) {
      this.userService.setCurrentAirline(icao);
      // const airline = this.airlinesList.find(function (airline) {
      //   return airline.id === icao;
      // });
      this.currentAirline = icao;
      // this.currentAirlineName = airline.name;
      // this.router.navigateByUrl(this.router.url);
      if (icao) {
        this.router.navigateByUrl('/airlines/' + icao);
      }
    }
  }

  login() {
    this.oktaAuth.loginRedirect('/home');
  }

  logout() {
    this.oktaAuth.logout('/login');
  }

  isAuthenticated() {
    return this.userService.isAuthenticated();
  }

  utcTime(): void {
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
  }

  // STO - 12/11/2018
  // Temporary function for demo purpose only
  displayCustomToast(): void {
    this.toaster.show(
      'Reported dark flight',
      'JB420R',
      null,
      'toast-error-plane'
    ); }

  checkAirlineAccess() {
    const icao = this.route.snapshot.children[0].params.airlineIcao;
    if (icao) {
      this.airlineService.getAirlineByIcao(icao)
      .subscribe(airline => {
        const data: any = airline;
        if (data.status === 404) {
          // Airline doesn't exists
          this.router.navigate(['not-found']);
        } else if (data.status === 403) {
          // Sorry don't have access to this page
          this.router.navigate(['access-denied']);
        }
      });
    }
  }

}
