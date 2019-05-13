import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtefactModule } from '../../../shared/artefact.module';
import { TailOverviewComponent } from './tails-overview.component';
import { HttpClientModule } from '@angular/common/http';
import { FlightsService } from '../../../shared/services/airline-tail/flights/flights.service';
import { TailService } from '../../../shared/services/airline-tail/tails.service';
import { UserService } from './../../../shared/services/user/user.service';
import { TailsDataService } from '../../../shared/services/tails/tails-data.service';

import {
  MatPaginatorModule, MatButtonModule, MatSortModule, MatTableModule,
  MatTabsModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule,
  MatCardModule, MatFormFieldModule, MatInputModule,
} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, observable } from 'rxjs';
declare var vis: any;
declare var Lopa: any;
const spyUserservice = jasmine.createSpyObj('UserService', ['identity', 'hasAnyAuthority']);

describe('OverviewComponent', () => {
  let component: TailOverviewComponent;
  let fixture: ComponentFixture<TailOverviewComponent>;
  let flightService: FlightsService;
  let tailService: TailService;
  let tailsDataService: TailsDataService;

  const response = [{
    'flightLeg': {
      'flightNumber': 'UAL264',
      'departureAirport': 'KDEN',
      'arrivalAirport': 'KSFO',
      'startTime': '2018-12-09T18:17:45Z',
      'endTime': '2018-12-09T22:16:17Z',
      'type': 'OPP'
    },
    'flightPhases': [
      {
        'flightPhaseId': 1,
        'flightPhaseDescription': 'PRE-FLIGHT',
        'startTime': '2018-12-09T18:17:45.000Z',
        'endTime': '2018-12-09T19:06:43.000Z'
      },
    ],
    'statuses': {
      'systemResetStatus': 'ok',
      'headEndStatus': 'ko',
      'firstClassStatus': 'none',
      'businessClassStatus': 'warning',
      'economyClassStatus': 'none',
    }
  }];
  const mockAntennaService = {
    getFlights(): Observable<any> {
      return Observable.of(response);
    }
  };
  const mockTailService = {
    getTailDetail(): Observable<any> {
      return Observable.of(response);
    },

    getCoverageData(): Observable<any> {
      return Observable.of([
        {
          'tail': 'N101NN',
          'offloads': 30,
          'flights': 21,
          'percentage': 70,
          'dateCount': {
            '2018-12-10': '1/1'
          }
        }
      ]);
    },
    getLopaDetails(): Observable<any> {
      return Observable.of([
        {
          'deckConfig': [
            {
              'deckName': 'upper',
              'cabinClassConfig': [
                {
                  'cabinClass': 'Business Class',
                  'cabinClassName': 'B/C',
                  'seatType': 'large',
                  'seatConfig': '1-2-1',
                  'cabinClassOrder': 2,
                  'seatLetters': 'AEFK',
                  'startRow': 10,
                  'endRow': 18,
                  'noSeats': []
                },
                {
                  'cabinClass': 'First Class',
                  'cabinClassName': 'F/C',
                  'seatType': 'large',
                  'seatConfig': '2-2-2',
                  'cabinClassOrder': 1,
                  'seatLetters': 'ABEFJK',
                  'startRow': 1,
                  'endRow': 6,
                  'noSeats': []
                },
                {
                  'cabinClass': 'Economy Class',
                  'cabinClassName': 'E/C',
                  'seatType': 'small',
                  'seatConfig': '3-3-3',
                  'cabinClassOrder': 3,
                  'seatLetters': 'ABCEFGIJK',
                  'startRow': 25,
                  'endRow': 48,
                  'noSeats': []
                }
              ],
              'data': [
              ]
            }
          ]
        }
      ]);
    },

    getResetsCount(): Observable<any> {
      return Observable.of([
        {
          'seat': '16A',
          'svduResets': 1,
          'tpmuResets': 1
        },
        {
          'seat': '1F',
          'svduResets': 1,
          'tpmuResets': 1
        },
        {
          'seat': '26B',
          'svduResets': 4,
          'tpmuResets': 4
        },
        {
          'seat': '27B',
          'svduResets': 1,
          'tpmuResets': 1
        }
      ]);
    }
  };
  const activatedRoute = {
    parent: {
      params: Observable.of({
        airlineIcao: 'qal',
        flightId: 'abcd123'
      }),
    },
    queryParams: Observable.of({
      fromDate: '2019-03-14T00:00:00Z',
      toDate: '2019-03-17T00:00:00Z'
    })
  };
  const mockRouter = {
    navigate: function (params, path) {
    }
  };
  const mockUserservice = {
    hasAnyAuthority():  Promise<any> {
      return new Promise<any>(resolve => resolve(true));
    },
    getAuthenticationState(): Observable<any> {
      return Observable.of([]);
    },
    setCurrentAirline: function(icao) {},
    isAuthenticated: function() { return true; },
    forceRedirectToBack: function() {
      return {
        isIncrement: false,
        fromdates: '2019-03-14',
        todates: '2019-03-15'
      };
    },
    dateValidation: function(fromdates, todates) {
      return {
        fromdates: '2019-03-14',
        todates: '2019-03-15'
      };
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TailOverviewComponent],
      imports: [
        ArtefactModule,
        HttpClientModule,
      ],
      providers: [
        { provide: FlightsService, useValue: mockAntennaService },
        { provide: TailService, useValue: mockTailService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: UserService, useValue: mockUserservice },
        TailsDataService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TailOverviewComponent);
    component = fixture.componentInstance;
    flightService = TestBed.get(FlightsService);
    tailService = TestBed.get(TailService);
    tailsDataService = TestBed.get(TailsDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    component.fromdates = '2019-03-13T00:00:00Z';
    component.todates = '2019-03-15T00:00:00Z';
    component.routeParams = {
      fromDate: '2019-03-13T00:00:00Z',
      toDate: '2019-03-15T00:00:00Z'
    };
    expect(component).toBeDefined();
  });

  it('should get flightDetails', () => {
    fixture.detectChanges();
    const res = {};
    component.getTailNumber = '';
    spyOn(tailsDataService, 'getData').and.returnValue(of(res));
    fixture.detectChanges();
    tailsDataService.sendData({tailNumber: 'N100NN'});
    component.ngOnInit();
  });

  it('should be defined getSelectedDates', () => {
    component.fromdates = '2019-03-13T00:00:00Z';
    component.todates = '2019-03-15T00:00:00Z';
    component.routeParams = {
      fromDate: null,
      toDate: '2019-03-15T00:00:00Z'
    };
    const spy = spyOn(flightService, 'getFlights').and.callThrough();
    const dateObj = {
      fromDate: '2019-03-14T00:00:00Z',
      toDate: '2019-03-16T00:00:00Z'
    };
    const params = {
      tailNumber: '1',
      airlineIcao: 'aal',
      flightLegId: '1080'
    };
    const fields = '';
    flightService.getFlights(params.airlineIcao, params.tailNumber, dateObj, fields).subscribe(res => {
      expect(spy).toHaveBeenCalled();
    });
    component.getSelectedDates({ fromDate: new Date(), toDate: new Date() });
    // expect(component.isLoading).toBeFalsy();
  });

  it('should create', () => {
    const spy = spyOn(flightService, 'getFlights').and.callThrough();
    expect(component).toBeTruthy();
    const params = {
      tailNumber: '1',
      airlineIcao: 'aal',
      flightLegId: '1080'
    };
    const dateObj = {
      fromDate: '2019-02-08T00:00:00Z',
      toDate: '2019-02-10T23:59:59Z'
    };
    const fields = '';
    flightService.getFlights(params.airlineIcao, params.tailNumber, dateObj, fields).subscribe((results) => {
      expect(spy).toHaveBeenCalled();
    });
  });
  it('should create', () => {
    const spy = spyOn(tailService, 'getTailDetail').and.callThrough();
    expect(component).toBeTruthy();

    tailService.getTailDetail('AAL', 'N101NN').subscribe((results) => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should get bite covergae data', () => {
    component.fromdates = '2019-03-13T00:00:00Z';
    component.todates = '2019-03-15T00:00:00Z';
    component.airlineIcao = 'AAL';
    component.tailNumber = 'N101NN';
    const spy = spyOn(tailService, 'getCoverageData').and.callThrough();
    component.getBiteCovergaeData();
    expect(spy).toHaveBeenCalled();
  });

  it('should get lopa details', () => {
    component.fromdates = '2019-03-13T00:00:00Z';
    component.todates = '2019-03-15T00:00:00Z';
    component.tailNumber = 'N101NN';
    component.airlineIcao = 'AAL';
    const spy = spyOn(tailService, 'getLopaDetails').and.callThrough();
    component.getLopaDetails();
    expect(spy).toHaveBeenCalled();
  });

  it('should get lopa resets', () => {
    component.fromdates = '2019-03-13T00:00:00Z';
    component.todates = '2019-03-15T00:00:00Z';
    component.airlineIcao = 'AAL';
    component.tailNumber = 'N101NN';
    const spy = spyOn(tailService, 'getResetsCount').and.callThrough();
    component.getLopaResets();
    expect(spy).toHaveBeenCalled();
  });

  it('should format lopa resets', () => {
    component.lopaConf = {};
    const resets = [
      {
        'seat': '16A',
        'svduResets': 1,
        'tpmuResets': 1
      },
      {
        'seat': '1F',
        'svduResets': 1,
        'tpmuResets': 1
      },
      {
        'seat': '26B',
        'svduResets': 4,
        'tpmuResets': 4
      },
      {
        'seat': '27B',
        'svduResets': 1,
        'tpmuResets': 1
      }
    ];
    component.addResetsToLopaConf(resets);
    expect(component.lopaConf.data).toBeDefined();
  });

  it('should excecute refresh process', () => {
    const lopaSpy = spyOn(component, 'getLopaDetails').and.callThrough();
    const coverageSpy = spyOn(component, 'getBiteCovergaeData').and.callThrough();
    const configurationSpy = spyOn(component, 'getConfigurationDetails').and.callThrough();
    component.refreshProcess();
    expect(lopaSpy).toHaveBeenCalled();
    expect(coverageSpy).toHaveBeenCalled();
    expect(configurationSpy).toHaveBeenCalled();
  });

  it('should get css class based on resets', () => {
    const warn = component.getResetsClass(3);
    expect(warn).toBe('circle-warning');
    const succ = component.getResetsClass(0);
    expect(succ).toBe('circle-success');
    const dang = component.getResetsClass(6);
    expect(dang).toBe('circle-danger');
  });

});
