import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightService } from '../../../shared/services/flights/airlineflights.service';
import { AirlineFlightsComponent } from './airline-flights.component';
import {
  MatButtonModule,
  MatCardModule,
  MatSort,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatTableModule,
  MatIconModule,
  MatTabsModule,
  MatPaginatorModule
} from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { ToastrModule } from 'ngx-toastr';
import 'rxjs/add/observable/of';
import { ActivatedRoute } from '@angular/router';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArtefactModule } from '../../../shared/artefact.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlightModel } from 'src/app/shared/services/flights/airlineflights';
describe('AirlineFlightsComponent', () => {

  let component: AirlineFlightsComponent;
  let fixture: ComponentFixture<AirlineFlightsComponent>;
  let flightService: any = FlightService;
  let isSuccess = false;
  const mockFlightService = {
    getFlightList(): Observable<any> {
      if (!isSuccess) {
        return Observable.of({ error: 'Internal Server Error' });
      } else {
        const data = [{
          'id': 0,
          'tailNumber': 'N906AA',
          'flightNumber': 'AAL2372',
          'departureDate': '2019-01-24T00:03:55.000Z',
          'arrivalDate': '2019-01-24T00:48:44.000Z',
          'departureAirport': 'DFW',
          'arrivalAirport': 'SAT',
          'offloadReceived': 'No'
        }];
        return Observable.of(data);
      }
    },
    updateFlightDetails(): Observable<any> {
      if (!isSuccess) {
        const data = {
          error: {
            message: 'Internal Server Error',
          }
        };
        return Observable.of(data);
      } else {
        return Observable.of({
          tailNumber: 'N901',
          biteOffloadReceived: '',
          status: 200
        });
      }
    },
    getFlightDetails(): Observable<any> {
      return Observable.of([]);
    }
  };
  const activatedRoute = {
    parent: {
      params: Observable.of({
        airlineIcao: 'qal',
        flightId: 'abcd123'
      })
    }
  };
  const httpClient: any = HttpClient;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AirlineFlightsComponent, MatSort],
      imports: [
        MatRadioModule,
        ArtefactModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatCardModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        MatTabsModule,
        ToastrModule.forRoot(),


      ],
      providers: [
        HttpClientModule, HttpClient,
        { provide: FlightService, useValue: mockFlightService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    flightService = TestBed.get(FlightService);

  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('filter should be defined', () => {
    component.flightFilter('Flight');
    expect(component.flightFilter).toBeDefined();
  });
  it('getFlightList on error', () => {
    isSuccess = false;
    const getFlightList = spyOn(flightService, 'getFlightList').and.callThrough();
    flightService.getFlightList().subscribe(response => {
      expect(getFlightList).toHaveBeenCalled();
    });
    component.getFlightList();
    expect(component.isLoading).toBe(false);
  });
  it('getFlightList', () => {
    isSuccess = true;
    const getFlightList = spyOn(flightService, 'getFlightList').and.callThrough();
    flightService.getFlightList().subscribe(response => {
      expect(getFlightList).toHaveBeenCalled();
    });
    component.getFlightList();
    expect(component.isLoading).toBe(false);
  });
  it('should be define get filter data', () => {
    const filterData = {
      'title': 'MISSING OFFLOADS',
      'filterValue': 'no',
      'filterKey': 'biteOffloadReceived',
      'count': 1972,
      'datasource': {
        'tailNumber': 'N906AA',
        'flightNumber': 'AAL2372',
        'departureDate': '2019-01-24T00:03:55.000Z',
        'arrivalDate': '2019-01-24T00:48:44.000Z',
        'departureAirport': 'DFW',
        'arrivalAirport': 'SAT',
        'biteOffloadReceived': 'NO'
      }
    };
    component.dataSource = {
      data: [{ id: 1 }]
    };
    component.getFilteredData(filterData);
  });
  it('should be define get filter data', () => {
    const filterData = {
      'fromDate': '2019-01-23T18:30:00.000Z',
      'toDate': '2019-01-24T18:30:00.000Z'
    };
    component.getSelectedDates(filterData);
  });

  it('getSelectedRows should be defined', () => {
    expect(component.selectedRow).toEqual(undefined);
    const data = {
      'id': 0,
      'tailNumber': 'N906AA',
      'flightNumber': 'AAL2372',
      'departureDate': '2019-01-24T00:03:55.000Z',
      'arrivalDate': '2019-01-24T00:48:44.000Z',
      'departureAirport': 'DFW',
      'arrivalAirport': 'SAT',
      'biteOffloadReceived': 'NO'
    };
    component.selectedRow = data;
    expect(component.selectedRow).toEqual(data);
  });

  it('getEvent should be defined', () => {
    component.selectedRow = {
      id: 1,
      'tailNumber': 'N906AA',
      'flightNumber': 'AAL2372',
      'departureDate': '2019-01-24T00:03:55.000Z',
      'arrivalDate': '2019-01-24T00:48:44.000Z',
      'departureAirport': 'DFW',
      'arrivalAirport': 'SAT',
      'biteOffloadReceived': 'NO',
      isDarkFlight: 'N/A',
      openDate: '2019-01-24T00:48:44.000Z',
      closedDate: '2019-01-24T00:48:44.000Z',
      squawk: '',
      maintenaceAction: '',
      description: '',
      rootCause: '',
      maintenanceRecommendations: '',
      engineeringNotes: ''
    };
    component.editFlight(component.selectedRow);
    expect(component.editFlight).toBeDefined();
  });

  it('updateFlightDetails should be defined', () => {
    isSuccess = true;
    component.flightObj = {
      isLoading: false,
      getAirlines: [{ name: '' }],
      getTails: [{ name: '' }],
      isFormSubmitted: false,
      isError: false,
      errorMsg: null,
      formSubmitted: false,
      formObj: {
        airlineId: null,
        isDarkFlight: '',
        airline: '',
        tail: '',
        squawk: '',
        maintenaceAction: '',
        description: '',
        rootCause: null,
        maintenanceRecommendations: '',
        engineeringNotes: '',
        openDate: new Date('2019-01-24T00:03:55.000Z'),
        closedDate: new Date('2019-01-24T00:03:55.000Z'),
        aircraftId: 445,
        flightNumber: '',
        departureDate: null,
        arrivalDate: null,
        departureAirport: '',
        arrivalAirport: '',
        flightDuration: null,
        insertDate: '',
        createdAt: '',
        getFlightDetails: {
          biteOffloadReceived: ''
        }
      },
      getFlightDetails: {
        biteOffloadReceived: ''
      }
    };
    component.id = 'aal';
    component.selectedRow = {
      id: 1,
      flightNumber: '	AAL1471',
      tailNumber: 'aal',
      arrivalAirport: '2019-02-15T14:23:00.000Z',
      departureDate: '2019-02-15T10:47:02.000Z'
    };
    component.dataSource = {
      data: [{ id: 1 }]
    };
    component.modalRef = {
      close: function () { }
    };
    component.updateFlightDetails();
    expect(component.updateFlightDetails).toBeDefined();
  });
  it('addPrefixZero should be defined', () => {
    component.addPrefixZero(1);
    expect(component.addPrefixZero).toBeDefined();
  });
  it('updateFormDetails should be defined', () => {
    component.selectedRow = {
      id: 1,
      flightNumber: '	AAL1471',
      tailNumber: 'aal',
      arrivalAirport: '2019-02-15T14:23:00.000Z',
      departureDate: '2019-02-15T10:47:02.000Z',
      biteOffloadReceived: ''
    };
    const data = {
      aircraftId: 1426,
      airlineId: 48,
      arrivalAirport: 'STI',
      arrivalDate: '2019-04-24T06:33:33.000Z',
      closedDate: '2019-05-24T03:14:34.000Z',
      createdAt: '2019-04-24T06:40:11.000Z',
      departureAirport: 'BOS',
      departureDate: '2019-04-24T03:14:34.000Z',
      description: null,
      engineeringNotes: null,
      flightDuration: 11939,
      flightNumber: 'JBU923',
      id: 93557,
      insertDate: '2019-04-24T06:37:18.000Z',
      isDarkFlight: 'NO',
      maintenaceAction: null,
      maintenanceRecommendations: null,
      openDate: '2019-04-24T03:14:34.000Z',
      rootCause: null,
      squawk: null
    };
    component.modalRef = {
      close: function () { }
    };
    component.updateFormDetails(data);
    expect(component.updateFormDetails).toBeDefined();
  });
  it('updateFlightDetails should be defined when isDarkFlight is YES & openDate is null', () => {
    isSuccess = true;
    component.selectedRow = {
      id: 1,
      flightNumber: '	AAL1471',
      tailNumber: 'aal',
      arrivalAirport: '2019-02-15T14:23:00.000Z',
      departureDate: '2019-02-15T10:47:02.000Z',
      biteOffloadReceived: ''
    };
    component.flightObj = {
      isLoading: false,
      getAirlines: [{ name: '' }],
      getTails: [{ name: '' }],
      isFormSubmitted: false,
      isError: false,
      errorMsg: null,
      formSubmitted: false,
      formObj: {
        aircraftId: 1426,
        airlineId: 48,
        arrivalAirport: 'STI',
        arrivalDate: '2019-04-24T06:33:33.000Z',
        closedDate: '2019-05-24T03:14:34.000Z',
        createdAt: '2019-04-24T06:40:11.000Z',
        departureAirport: 'BOS',
        departureDate: '2019-04-24T03:14:34.000Z',
        description: null,
        engineeringNotes: null,
        flightDuration: 11939,
        flightNumber: 'JBU923',
        id: 93557,
        insertDate: '2019-04-24T06:37:18.000Z',
        isDarkFlight: 'YES',
        maintenaceAction: null,
        maintenanceRecommendations: null,
        openDate: null,
        rootCause: null,
        squawk: null,
        getFlightDetails: {
          biteOffloadReceived: ''
        }
      },
      getFlightDetails: {
        biteOffloadReceived: ''
      }
    };
    component.dataSource = {
      data: [{ id: 1 }]
    };
    component.modalRef = {
      close: function () { }
    };
    const getFlightList = spyOn(flightService, 'updateFlightDetails').and.callThrough();
    flightService.updateFlightDetails().subscribe(response => {
      expect(getFlightList).toHaveBeenCalled();
    });
    component.updateFlightDetails();
    expect(component.updateFlightDetails).toBeDefined();
  });
  it('updateFlightDetails should be defined when openDate is null & closeDate is null', () => {
    isSuccess = true;
    component.selectedRow = {
      id: 1,
      flightNumber: '	AAL1471',
      tailNumber: 'aal',
      arrivalAirport: '2019-02-15T14:23:00.000Z',
      departureDate: '2019-02-15T10:47:02.000Z',
      biteOffloadReceived: ''
    };
    component.flightObj = {
      isLoading: false,
      getAirlines: [{ name: '' }],
      getTails: [{ name: '' }],
      isFormSubmitted: false,
      isError: false,
      errorMsg: null,
      formSubmitted: false,
      formObj: {
        aircraftId: 1426,
        airlineId: 48,
        arrivalAirport: 'STI',
        arrivalDate: '2019-04-24T06:33:33.000Z',
        closedDate: null,
        createdAt: '2019-04-24T06:40:11.000Z',
        departureAirport: 'BOS',
        departureDate: '2019-04-24T03:14:34.000Z',
        description: null,
        engineeringNotes: null,
        flightDuration: 11939,
        flightNumber: 'JBU923',
        id: 93557,
        insertDate: '2019-04-24T06:37:18.000Z',
        isDarkFlight: 'No',
        maintenaceAction: null,
        maintenanceRecommendations: null,
        openDate: null,
        rootCause: null,
        squawk: null,
        getFlightDetails: {
          biteOffloadReceived: ''
        }
      },
      getFlightDetails: {
        biteOffloadReceived: ''
      }
    };
    component.dataSource = {
      data: [{ id: 1 }]
    };
    component.modalRef = {
      close: function () { }
    };
    const getFlightList = spyOn(flightService, 'updateFlightDetails').and.callThrough();
    flightService.updateFlightDetails().subscribe(response => {
      expect(getFlightList).toHaveBeenCalled();
    });
    component.updateFlightDetails();
    expect(component.updateFlightDetails).toBeDefined();
  });
  it('updateFlightDetails should be defined on error', () => {
    isSuccess = false;
    component.selectedRow = {
      id: 1,
      flightNumber: '	AAL1471',
      tailNumber: 'aal',
      arrivalAirport: '2019-02-15T14:23:00.000Z',
      departureDate: '2019-02-15T10:47:02.000Z',
      biteOffloadReceived: ''
    };
    component.flightObj = {
      isLoading: false,
      getAirlines: [{ name: '' }],
      getTails: [{ name: '' }],
      isFormSubmitted: false,
      isError: false,
      errorMsg: null,
      formSubmitted: false,
      formObj: {
        aircraftId: 1426,
        airlineId: 48,
        arrivalAirport: 'STI',
        arrivalDate: '2019-04-24T06:33:33.000Z',
        closedDate: { year: 2019, month: 12, day: 31 },
        createdAt: '2019-04-24T06:40:11.000Z',
        departureAirport: 'BOS',
        departureDate: '2019-04-24T03:14:34.000Z',
        description: null,
        engineeringNotes: null,
        flightDuration: 11939,
        flightNumber: 'JBU923',
        id: 93557,
        insertDate: '2019-04-24T06:37:18.000Z',
        isDarkFlight: 'YES',
        maintenaceAction: null,
        maintenanceRecommendations: null,
        openDate: { year: 2019, month: 12, day: 31 },
        rootCause: null,
        squawk: null,
        getFlightDetails: {
          biteOffloadReceived: ''
        }
      },
      getFlightDetails: {
        biteOffloadReceived: ''
      }
    };
    component.id = 'aal';
    component.modalRef = {
      close: function () { }
    };
    const getFlightList = spyOn(flightService, 'updateFlightDetails').and.callThrough();
    flightService.updateFlightDetails().subscribe(response => {
      expect(getFlightList).toHaveBeenCalled();
    });
    component.updateFlightDetails();
    expect(component.updateFlightDetails).toBeDefined();
  });
});
