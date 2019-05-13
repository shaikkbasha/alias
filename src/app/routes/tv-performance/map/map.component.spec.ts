import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import LineString from 'ol/geom/LineString';
import Point from 'ol/geom/Point';
import { Stroke, Style, Circle, Icon } from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';

import { MapComponent } from './map.component';
import { SectionTitleComponent } from './../../../shared/modules/section-title/section-title.component';
import { LabelValueComponent } from './../../../shared/modules/label-value/label-value.component';
import { ArtActionToolBarComponent } from './../../../shared/modules/artactiontoolbar/artactiontoolbar.component';
import { FlightDetailsComponent } from './../../../shared/modules/flight-details/flight-details.component';
import { AntennaService } from './../../../shared/services/tv-performance/antenna/antenna.service';
import { TvPerformanceDataService } from '../../../shared/services/tv-performance/tv-performance-data.service';
import { LoadingComponent } from '../../../shared/modules/loading/loading-component';
describe('SignalComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let antennaService: AntennaService;
  let dataService: TvPerformanceDataService;

  const mockAntennaService = {
    getAntennaDetails(): Observable<any> {
      const response = [
        {
          'timeStamp': '2019-01-18T05:21:22Z',
          'antennaType': 'EMS',
          'eti': '',
          'latitude': '33.66367',
          'longitude': '-117.759026',
          'altitude': 37.7,
          'rssi': 0.1,
          'heading': 0,
          'speed': 0.1,
          'antennaState': 'Tracking',
          'commState': 'GOOD',
          'azimuth': 327.18,
          'elevation': 49.37,
          'bitFlag': 'fffe',
          'unixTime': '2019-01-18T05:19:48Z',
          'controllerState': 'TRACKING_STABLE',
          'flightPhaseId': 1,
          'event': ''
        },
        {
          'timeStamp': '2019-01-18T05:26:22Z',
          'antennaType': 'EMS',
          'eti': '',
          'latitude': '33.663662',
          'longitude': '-117.75897',
          'altitude': 35.7,
          'rssi': 1.06,
          'heading': 0,
          'speed': 0.1,
          'antennaState': 'Tracking',
          'commState': 'GOOD',
          'azimuth': 327.38,
          'elevation': 49.85,
          'bitFlag': 'fffe',
          'unixTime': '2019-01-18T05:24:48Z',
          'controllerState': 'TRACKING_STABLE',
          'flightPhaseId': 1,
          'event': ''
        }
      ];
      return Observable.of(response);
    },
    getAllAirportData(): Observable<any> {
      const response = [
        {
          'id': 169,
          'name': 'Fort Lauderdale Hollywood International Airport',
          'iata': 'FLL',
          'icao': 'KFLL',
          'city': 'Fort Lauderdale',
          'country': 'United States',
          'countryCode': 'US',
          'latitude': 26.072599,
          'longitude': -80.152702,
          'timezone': -5.0,
          'dst': 'A',
          'tzDatabaseName': 'America/New_York',
          'expectedRssi': 2.7,
          'expectedAzimuth': 221,
          'expectedElevation': 51
        },
        {
          'id': 354,
          'name': 'Norman Manley International Airport',
          'iata': 'KIN',
          'icao': 'MKJP',
          'city': 'Kingston',
          'country': 'Jamaica',
          'countryCode': 'JM',
          'latitude': 17.935699,
          'longitude': -76.787498,
          'timezone': -5.0,
          'dst': 'U',
          'tzDatabaseName': 'America/Jamaica',
          'expectedRssi': null,
          'expectedAzimuth': null,
          'expectedElevation': null
        }
      ];
      return Observable.of(response);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, NgbModule],
      declarations: [
        MapComponent,
        SectionTitleComponent,
        FlightDetailsComponent,
        LabelValueComponent,
        ArtActionToolBarComponent,
        LoadingComponent
      ],
      providers: [
        { provide: AntennaService, useValue: mockAntennaService },
        TvPerformanceDataService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    antennaService = TestBed.get(AntennaService);
    dataService = TestBed.get(TvPerformanceDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get flightDetails', () => {
    fixture.detectChanges();
    const response = {};
    const flightData = {
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
    component.flightDetails = {};
    spyOn(dataService, 'getData').and.returnValue(of(response));
    fixture.detectChanges();
    dataService.sendData(flightData);
    component.ngOnInit();
    expect(Object.keys(component.flightDetails)).toContain('icao');
    expect(Object.keys(component.flightDetails)).toContain('id');
  });

  it('should get lat lang data', () => {
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
    const airportspy = spyOn(antennaService, 'getAllAirportData').and.callThrough();
    component.airLinesCordinates = {
      source: airportspy[0],
      dest: airportspy[1]
    };
    const spy = spyOn(antennaService, 'getAntennaDetails').and.callThrough();
    component.getFlightLatAndLang();
    expect(spy).toHaveBeenCalled();
  });

  it('should call showIconPopup', () => {
    component.airLinesCordinates = {
      source: null,
      dest: null
    };
    component.showIconPopup('source');
    expect(component.geoData.isIcon).toBeTruthy();
    expect(component.geoData.data).toBeDefined();
  });
});
