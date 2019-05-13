import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtefactModule } from '../../../shared/artefact.module';
import { TailTimelineComponent } from './tails-timeline.component';
import { HttpClientModule } from '@angular/common/http';
import { FlightsService } from '../../../shared/services/airline-tail/flights/flights.service';
import { TailService } from '../../../shared/services/airline-tail/tails.service';
import {
  MatPaginatorModule, MatButtonModule, MatSortModule, MatTableModule,
  MatTabsModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule,
  MatCardModule, MatFormFieldModule, MatInputModule,
} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IterableChangeRecord_ } from '@angular/core/src/change_detection/differs/default_iterable_differ';
import { UserService } from './../../../shared/services/user/user.service';
import { TailsDataService } from '../../../shared/services/tails/tails-data.service';
declare var vis: any;
declare var Lopa: any;
describe('OverviewComponent', () => {
  let component: TailTimelineComponent;
  let fixture: ComponentFixture<TailTimelineComponent>;
  let flightService: FlightsService;
  let tailService: TailService;
  let tailDataService: TailsDataService;
  const spyUserservice = jasmine.createSpyObj('UserService', ['identity', 'hasAnyAuthority']);

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
      declarations: [TailTimelineComponent],
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
    fixture = TestBed.createComponent(TailTimelineComponent);
    component = fixture.componentInstance;
    flightService = TestBed.get(FlightsService);
    tailService = TestBed.get(TailService);
    tailDataService = TestBed.get(TailsDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    component.fromdates = '2019-03-13T00:00:00Z';
    component.todates = '2019-03-15T00:00:00Z';
    component.timelineRouteParams = {
      fromDate: '2019-03-13T00:00:00Z',
      toDate: '2019-03-15T00:00:00Z'
    };
    component.offloadResponse = {
      'biteOffloads': [
        {
          'id': 769787,
          'fileName': 'BITE_20190403042150_OMA_A4O-SF_OMA603.tgz',
          'flightLegStartTime': '2019-04-03T04:16:57.000Z',
          'flightLegEndTime': '2019-04-03T04:21:28.000Z',
          'uploadedTime': '2019-04-03T10:45:15.000Z',
          'flightNumber': 'OMA603',
          'departureAirport': 'OOMS',
          'arrivalAirport': 'OMDB',
          'status': 'PROCESSED',
          'leadTime': '6000seconds'
        }
      ],
      'tvperfOffloads': [
        {
          'id': 769787,
          'fileName': 'TVPERF_20190403042150_OMA_A4O-SF_OMA603.tgz',
          'flightLegStartTime': '2019-04-03T04:16:57.000Z',
          'flightLegEndTime': '2019-04-03T04:21:28.000Z',
          'uploadedTime': '2019-04-03T10:45:15.000Z',
          'flightNumber': 'OMA603',
          'departureAirport': 'OOMS',
          'arrivalAirport': 'OMDB',
          'status': 'PROCESSED',
          'leadTime': '6000seconds'
        }
      ],
      'conlogOffloads': [
        {
          'id': 769787,
          'fileName': 'CONLOG_20190403042150_OMA_A4O-SF_OMA603.tgz',
          'flightLegStartTime': '2019-04-03T04:16:57.000Z',
          'flightLegEndTime': '2019-04-03T04:21:28.000Z',
          'uploadedTime': '2019-04-03T10:45:15.000Z',
          'flightNumber': 'OMA603',
          'departureAirport': 'OOMS',
          'arrivalAirport': 'OMDB',
          'status': 'PROCESSED',
          'leadTime': '6000seconds'
        }
      ]
    };
    expect(component).toBeDefined();
  });
  it('should be defined getSelectedDates', () => {
    component.fromdates = '2019-03-13T00:00:00Z';
    component.todates = '2019-03-15T00:00:00Z';
    component.timelineRouteParams = {
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
    expect(component.isLoading).toBeFalsy();
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

  it('initializeVISTimeline should be defined', () => {
    component.initializeVISTimeline(response);
    expect(component.initializeVISTimeline).toBeDefined();
  });

  it('getClassName should be defined', () => {
    component.getClassName(response[0].statuses);
    expect(component.getClassName).toBeDefined();
  });

  it('getClassName should be defined with grey color', () => {
    const status = {
      businessClassStatus: 'none',
      headEndStatus: 'none',
      firstClassStatus: 'none',
      systemResetStatus: 'none',
      economyClassStatus: 'none'
    };
    component.getClassName(status);
    expect(component.getClassName).toBeDefined();
  });

  it('getClassName should be defined with green color', () => {
    const status = {
      headEndStatus: 'none',
      businessClassStatus: 'none',
      systemResetStatus: 'ok',
      firstClassStatus: 'none',
      economyClassStatus: 'none'
    };
    component.getClassName(status);
    expect(component.getClassName).toBeDefined();
  });

  it('should create', () => {
    const spy = spyOn(tailService, 'getTailDetail').and.callThrough();
    expect(component).toBeTruthy();

    tailService.getTailDetail('AAL', 'N101NN').subscribe((results) => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should getEvent to be defined', () => {
    component.getEvent({ moduleName: 'Tailsoverview', eventName: 'analyze' });
    expect(component.getEvent).toBeDefined();
  });

  it('should load offload data to be defined', () => {
    component.offloadResponse = {
      'biteOffloads': [
        {
          'id': 769787,
          'fileName': 'BITE_20190403042150_OMA_A4O-SF_OMA603.tgz',
          'flightLegStartTime': '2019-04-03T04:16:57.000Z',
          'flightLegEndTime': '2019-04-03T04:21:28.000Z',
          'uploadedTime': '2019-04-03T10:45:15.000Z',
          'flightNumber': 'OMA603',
          'departureAirport': 'OOMS',
          'arrivalAirport': 'OMDB',
          'status': 'PROCESSED',
          'leadTime': '6000'
        },
        {
          'id': 769787,
          'fileName': 'BITE_20190403042150_OMA_A4O-SF_OMA603.tgz',
          'flightLegStartTime': '2019-04-03T04:16:57.000Z',
          'flightLegEndTime': '2019-04-03T04:21:28.000Z',
          'uploadedTime': '2019-04-03T10:45:15.000Z',
          'flightNumber': 'OMA603',
          'departureAirport': 'OOMS',
          'arrivalAirport': 'OMDB',
          'status': 'PROCESSED',
          'leadTime': '6000'
        }
      ],
      'tvperfOffloads': [
        {
          'id': 769787,
          'fileName': 'TVPERF_20190403042150_OMA_A4O-SF_OMA603.tgz',
          'flightLegStartTime': '2019-04-03T04:16:57.000Z',
          'flightLegEndTime': '2019-04-03T04:21:28.000Z',
          'uploadedTime': '2019-04-03T10:45:15.000Z',
          'flightNumber': 'OMA603',
          'departureAirport': 'OOMS',
          'arrivalAirport': 'OMDB',
          'status': 'PROCESSED',
          'leadTime': '6000'
        }
      ],
      'conlogOffloads': [
        {
          'id': 769787,
          'fileName': 'CONLOG_20190403042150_OMA_A4O-SF_OMA603.tgz',
          'flightLegStartTime': '2019-04-03T04:16:57.000Z',
          'flightLegEndTime': '2019-04-03T04:21:28.000Z',
          'uploadedTime': '2019-04-03T10:45:15.000Z',
          'flightNumber': 'OMA603',
          'departureAirport': 'OOMS',
          'arrivalAirport': 'OMDB',
          'status': 'PROCESSED',
          'leadTime': '6000'
        }
      ]
    };
    component.data = new vis.DataSet();
    component.loadOffloadData(1);
    expect(component.loadOffloadData).toBeDefined();
  });

  it('should getseconds to be defined', () => {
    component.getLeadTimeinFormat(600000);
    expect(component.getLeadTimeinFormat).toBeDefined();
  });

});
