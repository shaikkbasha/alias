import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FlightsComponent } from './flights.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import { Observable, of } from 'rxjs';
import { ArtefactModule } from '../../../shared/artefact.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlightsService } from '../../../shared/services/airline-tail/flights/flights.service';
import { TailsDataService } from '../../../shared/services/tails/tails-data.service';


describe('TailComponent', () => {
  let component: FlightsComponent;
  let fixture: ComponentFixture<FlightsComponent>;
  let flightService: FlightsService;
  let tailDataService: TailsDataService;
  let isSuccess = false;
  const mockFlightsService = {
    getFlights(): Observable<any> {
      if (isSuccess) {
        const response = {
          error: 'Error',
          message: 'Internal Server Error',

        };
        return Observable.of(response);
      } else {
        const response = [
          {
            'flightLeg': {
              'id': '1234',
              'flightNumber': '28',
              'departureAirport': 'LAX',
              'arrivalAirport': 'JFK',
              'startTime': '2019-01-14T21:32:15Z',
              'endTime': '2019-01-15T04:52:39Z'
            },
            'flightPhases': [],
            'statuses': {
              'businessClassStatus': 'none',
              'economyClassStatus': 'none',
              'firstClassStatus': 'none',
              'headEndStatus': 'none',
              'systemResetStatus': 'none',
            }
          },
          {
            'flightLeg': {
              'id': '234',
              'flightNumber': '29',
              'departureAirport': 'LAX',
              'arrivalAirport': 'JFK',
              'startTime': '2019-01-14T21:32:15Z',
              'endTime': '2019-01-15T04:52:39Z'
            },
            'flightPhases': [],
            'statuses': {
              'businessClassStatus': 'none',
              'economyClassStatus': 'none',
              'firstClassStatus': 'ko',
              'headEndStatus': 'none',
              'systemResetStatus': 'ok',
            },
          },
          {
            'flightLeg': {
              'id': '234',
              'flightNumber': '29',
              'departureAirport': 'LAX',
              'arrivalAirport': 'JFK',
              'startTime': '2019-01-14T21:32:15Z',
              'endTime': '2019-01-15T04:52:39Z'
            },
            'flightPhases': [],
            'statuses': {
              'businessClassStatus': 'none',
              'economyClassStatus': 'none',
              'firstClassStatus': 'ok',
              'headEndStatus': 'none',
              'systemResetStatus': 'ok',
            },
          }];
        return Observable.of(response);
      }
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlightsComponent],
      imports: [
        ArtefactModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        RouterTestingModule,
        RouterModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: FlightsService, useValue: mockFlightsService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        TailsDataService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    flightService = TestBed.get(FlightsService);
    tailDataService = TestBed.get(TailsDataService);
  });

  it('should create', () => {
    isSuccess = false;
    const spy = spyOn(flightService, 'getFlights').and.callThrough();
    expect(component).toBeTruthy();
    flightService.getFlights('aal', '1', { fromDate: '', toDate: '' }, '').subscribe((results) => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('getFlights error', () => {
    isSuccess = true;
    const spy = spyOn(flightService, 'getFlights').and.callThrough();
    expect(component).toBeTruthy();
    flightService.getFlights('aal', '1', { fromDate: '', toDate: '' }, '').subscribe((results) => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('getEvent should be defined', () => {
    component.getEvent('');
    expect(component.getEvent).toBeDefined();
  });

  it('flightsFilter should be defined', () => {
    component.flightsFilter('');
    expect(component.flightsFilter).toBeDefined();
  });

  it('processDate should be defined', () => {
    component.processDate(new Date(), new Date());
    expect(component.processDate).toBeDefined();
  });

  it('getSelectedDates should be defined', () => {
    component.getSelectedDates({ fromDate: new Date(), toDate: new Date() });
    expect(component.getSelectedDates).toBeDefined();
  });


  it('selectedRow should be defined', () => {
    component.dataSource = {
      data: [{ id: 1 }],
      findIndex: 0
    };
    component.selectedRow();
    expect(component.selectedRow).toBeDefined();

    component.selection = {
      selected: [
        {
          'id': '1234',
          'flightNumber': '29',
          'departureAirport': 'LAX',
          'arrivalAirport': 'JFK',
          'startTime': '2019-01-14T21:32:15Z',
          'endTime': '2019-01-15T04:52:39Z',
          'status': 'timeline-flightleg-grey',
          'statuses': {
            'businessClass': 'timeline-flightleg-grey',
            'economyClass': 'timeline-flightleg-grey',
            'firstClass': 'timeline-flightleg-grey',
            'headEnd': 'timeline-flightleg-grey',
            'systemReset': 'timeline-flightleg-grey',
          }
        }
      ]
    };
    component.selectedRow();
    expect(component.selectedRow).toBeDefined();
  });

  it('should set dates and get flight deatils', () => {
    component.fromdates = null;
    component.todates = null;
    component.updatedTime = null;
    const processSpy = spyOn(component, 'processDate').and.callThrough();
    const updateSpy = spyOn(component, 'getFlightsList').and.callThrough();
    component.updateFlights();
    expect(component.fromdates).toBeDefined();
    expect(component.fromdates).toBeDefined();
    expect(processSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalled();
  });

});
