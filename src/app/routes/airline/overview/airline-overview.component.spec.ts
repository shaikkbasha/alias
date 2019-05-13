import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TailService } from 'src/app/shared/services/airline-tail/tails.service';
import { TimelineService } from 'src/app/shared/services/timeline/timeline.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AirlineOverviewComponent } from './airline-overview.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ArtefactModule } from '../../../shared/artefact.module';
import { Observable, of } from 'rxjs';
import { OktaAuthService } from '@okta/okta-angular';
import { InjectionToken, NO_ERRORS_SCHEMA, DebugElement, EventEmitter } from '@angular/core';
import { UserRoleAuthGuard } from 'src/app/shared/guards/user-role-access/user-role-auth.guard';

describe('AirlineOverviewComponent', () => {
  let component: AirlineOverviewComponent;
  let fixture: ComponentFixture<AirlineOverviewComponent>;
  let tailService: TailService;
  let timelineService: TimelineService;
  const spy = jasmine.createSpyObj('OktaAuthService', ['isAuthenticated']);
  const spyUserservice = jasmine.createSpyObj('UserService', ['identity']);
  const tailsResp = [{
    'tailSign': 'N965NN',
    'fleetNumber': '3MG',
    'flightDetails': [{
      'flightLeg': {
        'id': 387,
        'flightNumber': '1555',
        'departureAirport': 'LAS',
        'arrivalAirport': 'LAX',
        'endTime': '2018-12-17T18:35:10Z',
        'startTime': '2018-12-17T16:39:16Z'
      },
      'flightPhases': null,
      'statuses': {
        'systemResetStatus': 'ok',
        'headEndStatus': 'ok',
        'firstClassStatus': 'none',
        'businessClassStatus': 'none',
        'economyClassStatus': 'none'
      }
    },
    {
      'flightLeg': {
        'id': 389,
        'flightNumber': '1467',
        'departureAirport': 'KSTL',
        'arrivalAirport': 'KSTL',
        'endTime': '2018-12-17T23:14:20Z',
        'startTime': '2018-12-17T19:00:49Z'
      },
      'flightPhases': null,
      'statuses': {
        'systemResetStatus': 'ok',
        'headEndStatus': 'ko',
        'firstClassStatus': 'none',
        'businessClassStatus': 'none',
        'economyClassStatus': 'none'
      }
    }]
  }];

  const flightsResp = [{
    'id': 67368,
    'tailNumber': 'B-LNQ',
    'flightNumber': 'CRK613',
    'departureDate': '2019-04-29T14:15:49.000Z',
    'arrivalDate': '2019-04-29T17:44:55.000Z',
    'departureAirport': 'KIX',
    'arrivalAirport': 'HKG',
    'isDarkFlight': 'N/A',
    'biteOffloadReceived': 'NA'
  },
  {
    'id': 67801,
    'tailNumber': 'B-LNO',
    'flightNumber': 'CRK708',
    'departureDate': '2019-04-29T17:55:00.000Z',
    'arrivalDate': '2019-04-29T22:20:57.000Z',
    'departureAirport': 'DPS',
    'arrivalAirport': 'HKG',
    'isDarkFlight': 'N/A',
    'biteOffloadReceived': 'NA'
  },
  {
    'id': 67971,
    'tailNumber': 'B-LNP',
    'flightNumber': 'CRK782',
    'departureDate': '2019-04-29T23:05:59.000Z',
    'arrivalDate': '2019-04-30T00:43:33.000Z',
    'departureAirport': 'MNL',
    'arrivalAirport': 'HKG',
    'isDarkFlight': 'N/A',
    'biteOffloadReceived': 'NA'
  }];
  const dateObj = {
    fromDate: '2019-03-13T00:00:00Z',
    toDate: '2019-03-15T00:00:00Z'
  };
  const mockService = {
    getAirlineAllFlightLegs(): Observable<any> {
      return Observable.of(tailsResp);
    },

    getFlightsByAirline(): Observable<any> {
      return Observable.of(flightsResp);
    }

  };
  const activatedRoute = {
    parent: {
      params: Observable.of({
        airlineIcao: 'AAL'
      }),
    },
    queryParams: Observable.of(dateObj)
  };
  const router = {
    navigate: jasmine.createSpy('navigate')
  };
  const mockUserservice = {
    hasAnyAuthority(): Promise<any> {
      return new Promise<any>(resolve => resolve(true));
    },
    getAuthenticationState(): Observable<any> {
      return Observable.of([]);
    },
    setCurrentAirline: function (icao) { },
    isAuthenticated: function () { return true; },
    forceRedirectToBack: function () {
      return {
        isIncrement: false,
        fromdates: '2019-03-14',
        todates: '2019-03-15'
      };
    },
    dateValidation: function (fromdates, todates) {
      return {
        fromdates: '2019-03-14',
        todates: '2019-03-15'
      };
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AirlineOverviewComponent],
      imports: [
        RouterTestingModule, ArtefactModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router, useValue: router },
        { provide: TailService, useValue: mockService },
        { provide: UserService, useValue: mockUserservice },
        {
          provide: UserRoleAuthGuard, useValue: {
            checkJBUAccess: function () { },
            getAccess: function () { },
            canActivateChild: function () { },
            hasAccess: Observable.of({
              accessToAllAirlines: true,
              hasAirlineAccess: true
            })
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    timelineService = TestBed.get(TimelineService);
    tailService = TestBed.get(TailService);
  });

  it('should be defined statusCircle', () => {
    expect(component.statusCircle('ko')).toBe('<i class="circle timeline-flightleg-red"></i>');
    expect(component.statusCircle('none')).toBe('<i class="circle timeline-flightleg-grey"></i>');
    expect(component.statusCircle('ok')).toBe('<i class="circle timeline-flightleg-green"></i>');
  });

  it('should create', () => {
    component.overviewFromdate = '2019-03-13T00:00:00Z';
    component.overviewTodate = '2019-03-15T00:00:00Z';
    component.overviewRoutePars = {
      fromDate: '2019-03-13T00:00:00Z',
      toDate: '2019-03-15T00:00:00Z'
    };
    expect(component).toBeDefined();
  });

  it('should check selectedTail', () => {
    const e = {
      moduleName: 'AirlineOverview',
      eventName: 'analyze'
    };
    component.selectedTail = '1555|N965NN';
    component.overviewEvent(e);
    expect(router.navigate).toHaveBeenCalledWith(['/airlines/AAL/tails/N965NN/overview']);
  });

  it('should check getSelDates', () => {
    component.getSelDates(dateObj);
    expect(component.isLoadingOverView).toBeDefined();
  });

  it('should check overviewDateProcess', () => {
    component.overviewDateProcess(dateObj);
    expect(component.overviewFromdate).toBe('2019-03-13');
    expect(component.overviewTodate).toBe('2019-03-15');
  });
});
