import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, from } from 'rxjs';
import { PeriodicTunerStatusComponent } from './periodic-tuner-status.component';
import { PeriodicTunerStatusService } from './../../../shared/services/tv-performance/periodic-tuner-status/periodic-tuner-status.service';
import { TvPerformanceDataService } from './../../../shared/services/tv-performance/tv-performance-data.service';
import { FlightPhasePipe } from './../../../shared/pipes/tv-performance/flight-phase.pipe';
import { ArtefactModule } from '../../../shared/artefact.module';
import { RemoveSpecialCharPipe } from '../../../shared/pipes/remove-special-char.pipe';

describe('PeriodicTunerStatusComponent', () => {
  let component: PeriodicTunerStatusComponent;
  let fixture: ComponentFixture<PeriodicTunerStatusComponent>;
  let periodicTunerService: PeriodicTunerStatusService;
  let dataService: TvPerformanceDataService;

  const mockPeriodicTunerService = {
    getPeriodicTunerData(): Observable<any> {
      const response = [{
        'timestamp': '2018-05-23T21:43:48Z',
        'data': [
          {
            'boardNumber': '1',
            'tunerNumber': '1',
            'status': 'not_used'
          },
          {
            'boardNumber': '1',
            'tunerNumber': '2',
            'status': 'not_used'
          },
          {
            'boardNumber': '1',
            'tunerNumber': '3',
            'status': 'not_used'
          },
          {
            'boardNumber': '1',
            'tunerNumber': '4',
            'status': 'not_used'
          },
          {
            'boardNumber': '1',
            'tunerNumber': '5',
            'status': 'not_used'
          },
          {
            'boardNumber': '1',
            'tunerNumber': '6',
            'status': 'not_used'
          },
          {
            'boardNumber': '1',
            'tunerNumber': '7',
            'status': 'not_used'
          },
          {
            'boardNumber': '1',
            'tunerNumber': '8',
            'status': 'not_used'
          },
          {
            'boardNumber': '2',
            'tunerNumber': '1',
            'status': 'not_used'
          },
          {
            'boardNumber': '2',
            'tunerNumber': '2',
            'status': 'not_used'
          },
          {
            'boardNumber': '2',
            'tunerNumber': '3',
            'status': 'not_used'
          },
          {
            'boardNumber': '2',
            'tunerNumber': '4',
            'status': 'not_used'
          },
          {
            'boardNumber': '2',
            'tunerNumber': '5',
            'status': 'not_used'
          },
          {
            'boardNumber': '2',
            'tunerNumber': '6',
            'status': 'not_used'
          },
          {
            'boardNumber': '2',
            'tunerNumber': '7',
            'status': 'not_used'
          },
          {
            'boardNumber': '2',
            'tunerNumber': '8',
            'status': 'not_used'
          },
          {
            'boardNumber': '3',
            'tunerNumber': '1',
            'status': 'not_used'
          },
          {
            'boardNumber': '3',
            'tunerNumber': '2',
            'status': 'not_used'
          },
          {
            'boardNumber': '3',
            'tunerNumber': '3',
            'status': 'not_used'
          },
          {
            'boardNumber': '3',
            'tunerNumber': '4',
            'status': 'not_used'
          },
          {
            'boardNumber': '3',
            'tunerNumber': '5',
            'status': 'not_used'
          },
          {
            'boardNumber': '3',
            'tunerNumber': '6',
            'status': 'not_used'
          },
          {
            'boardNumber': '3',
            'tunerNumber': '7',
            'status': 'not_used'
          },
          {
            'boardNumber': '3',
            'tunerNumber': '8',
            'status': 'not_used'
          },
          {
            'boardNumber': '4',
            'tunerNumber': '1',
            'status': 'not_used'
          },
          {
            'boardNumber': '4',
            'tunerNumber': '2',
            'status': 'not_used'
          },
          {
            'boardNumber': '4',
            'tunerNumber': '3',
            'status': 'not_used'
          },
          {
            'boardNumber': '4',
            'tunerNumber': '4',
            'status': 'not_used'
          },
          {
            'boardNumber': '4',
            'tunerNumber': '5',
            'status': 'not_used'
          },
          {
            'boardNumber': '4',
            'tunerNumber': '6',
            'status': 'not_used'
          },
          {
            'boardNumber': '4',
            'tunerNumber': '7',
            'status': 'not_used'
          },
          {
            'boardNumber': '4',
            'tunerNumber': '8',
            'status': 'not_used'
          },
          {
            'boardNumber': '5',
            'tunerNumber': '1',
            'status': 'not_used'
          },
          {
            'boardNumber': '5',
            'tunerNumber': '2',
            'status': 'not_used'
          },
          {
            'boardNumber': '5',
            'tunerNumber': '3',
            'status': 'not_used'
          },
          {
            'boardNumber': '5',
            'tunerNumber': '4',
            'status': 'not_used'
          },
          {
            'boardNumber': '5',
            'tunerNumber': '5',
            'status': 'not_used'
          },
          {
            'boardNumber': '5',
            'tunerNumber': '6',
            'status': 'not_used'
          },
          {
            'boardNumber': '5',
            'tunerNumber': '7',
            'status': 'not_used'
          },
          {
            'boardNumber': '5',
            'tunerNumber': '8',
            'status': 'not_used'
          },
          {
            'boardNumber': '6',
            'tunerNumber': '1',
            'status': 'not_used'
          },
          {
            'boardNumber': '6',
            'tunerNumber': '2',
            'status': 'not_used'
          },
          {
            'boardNumber': '6',
            'tunerNumber': '3',
            'status': 'not_used'
          },
          {
            'boardNumber': '6',
            'tunerNumber': '4',
            'status': 'not_used'
          },
          {
            'boardNumber': '6',
            'tunerNumber': '5',
            'status': 'not_used'
          },
          {
            'boardNumber': '6',
            'tunerNumber': '6',
            'status': 'not_used'
          },
          {
            'boardNumber': '6',
            'tunerNumber': '7',
            'status': 'not_used'
          },
          {
            'boardNumber': '6',
            'tunerNumber': '8',
            'status': 'not_used'
          },
          {
            'boardNumber': '7',
            'tunerNumber': '1',
            'status': 'not_used'
          },
          {
            'boardNumber': '7',
            'tunerNumber': '2',
            'status': 'not_used'
          },
          {
            'boardNumber': '7',
            'tunerNumber': '3',
            'status': 'not_used'
          },
          {
            'boardNumber': '7',
            'tunerNumber': '4',
            'status': 'not_used'
          },
          {
            'boardNumber': '7',
            'tunerNumber': '5',
            'status': 'not_used'
          },
          {
            'boardNumber': '7',
            'tunerNumber': '6',
            'status': 'not_used'
          },
          {
            'boardNumber': '7',
            'tunerNumber': '7',
            'status': 'not_used'
          },
          {
            'boardNumber': '7',
            'tunerNumber': '8',
            'status': 'not_used'
          }
        ]
      }];
      return Observable.of(response);
    },

    getPeriodicTunerDetails(): Observable<any> {
      const response = [{
        'timestamp': '2018-05-23T21:43:48Z',
        'authorized': 'true',
        'paired': 'true',
        'channelId': '0',
        'channelNumber': '0',
        'transponder': '0',
        'cnr': '-1.0',
        'agc': '-127.5',
        'lock': 'LOCKED',
        'tunerNumber': '6',
        'boardNumber': '1'
      }];
      return Observable.of(response);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, NgbModule, ArtefactModule],
      declarations: [
        PeriodicTunerStatusComponent,
        FlightPhasePipe,
        RemoveSpecialCharPipe
      ],
      providers: [
        { provide: PeriodicTunerStatusService, useValue: mockPeriodicTunerService },
        TvPerformanceDataService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicTunerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    periodicTunerService = TestBed.get(PeriodicTunerStatusService);
    dataService = TestBed.get(TvPerformanceDataService);
    component.flightDetails = {
      'id': '5c580079e2a2aa00148ab66f',
      'tailNumber': 'N239JB',
      'flightNumber': '3006',
      'departureTime': '2019-01-18T05:21:22Z',
      'arrivalTime': '1970-01-01T00:00:00Z',
      'departureAirport': 'JFK',
      'arrivalAirport': 'ICN',
      'icao': 'jbu',
      'dateFormat': {}
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get flightDetails', () => {
    fixture.detectChanges();
    const response = {};
    const flightData = component.flightDetails;
    component.flightDetails = {};
    spyOn(dataService, 'getData').and.returnValue(of(response));
    fixture.detectChanges();
    dataService.sendData(flightData);
    component.ngOnInit();
    expect(Object.keys(component.flightDetails)).toContain('icao');
    expect(Object.keys(component.flightDetails)).toContain('id');
  });

  it('getPeriodicTunerData()', () => {
    component.tableData = [];
    component.getPeriodicTunerData();
  });

  it('getPeriodicTunerData()', () => {
    const timeStamp = '2018-05-23T21:43:48Z';
    const boardTuner = {
      boardNumber: 1,
      tunerNumber: 2,
      status: 'not_used'
    };
    component.tableData = [];
    component.getPeriodicTunerDetails(timeStamp, boardTuner);
    expect(Object.keys(component.tooltipData)).toContain('timestamp');
    expect(Object.keys(component.tooltipData)).toContain('agc');
  });
});
