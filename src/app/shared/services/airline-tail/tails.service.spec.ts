import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TailService } from './tails.service';
import { Observable, of } from 'rxjs';
describe('TailService', () => {
  const mockResponse = [
    {
      'id': 176,
      'type': 'B737',
      'msn': 31214,
      'platform': 'AVANT',
      'software': 'v2.2.1',
      'acConfiguration': 'B737',
      'eis': '2015-03-12',
      'swPartNo': '',
      'swBaseline': 'PI4',
      'swInstalled': '2017-04-02',
      'mapVersion': '',
      'content': ''
    }
  ];

  const mockLopaResponse = {
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
  };

  const coverageRes = [
    {
      'tail': 'A7-APB',
      'offloads': 0,
      'flights': 9,
      'percentage': 0,
      'dateCount': {
        '2019-04-09': '0/2',
        '2019-04-10': '0/2'
      }
    }
  ];

  const lopaResetsRes = [
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
    }
  ];

  const flightLegs = [{
    'tailsign': 'N965NN',
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
    }]
  }];

  const flights = [
    {
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
    }
  ];
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [TailService]
  }));

  it('should be created', () => {
    const service: TailService = TestBed.get(TailService);
    expect(service).toBeTruthy();
  });

  it(
    'should get configuration with tail number',
    inject(
      [HttpTestingController, TailService],
      (httpMock: HttpTestingController, tailService: TailService) => {
        tailService.getTailDetail('AAL', 'N101NN').subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(mockResponse);

          httpMock.verify();
        });
      }
    )
  );

  it(
    'should get Lopa details',
    inject(
      [HttpTestingController, TailService],
      (httpMock: HttpTestingController, tailService: TailService) => {
        tailService.getLopaDetails('AAL', 'N101NN').subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(mockLopaResponse);

          httpMock.verify();
        });
      }
    )
  );

  it(
    'should get Coverage details',
    inject(
      [HttpTestingController, TailService],
      (httpMock: HttpTestingController, tailService: TailService) => {
        const dateObj = {
          fromDate: '2019-04-09',
          toDate: '2019-04-10'
        };
        tailService.getCoverageData('QTR', 'A7-APB', dateObj).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(coverageRes);

          httpMock.verify();
        });
      }
    )
  );

  it(
    'should get lopa resets',
    inject(
      [HttpTestingController, TailService],
      (httpMock: HttpTestingController, tailService: TailService) => {
        const dateObj = {
          fromDate: '2019-04-09',
          toDate: '2019-04-10'
        };
        tailService.getResetsCount('QTR', 'A7-APB', dateObj).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(lopaResetsRes);

          httpMock.verify();
        });
      }
    )
  );


  it('should get airline flight legs', inject(
    [HttpTestingController, TailService],
    (httpMock: HttpTestingController, tailService: TailService) => {
      const dateObj = {
        fromDate: '2019-04-09',
        toDate: '2019-04-10'
      };
      tailService.getAirlineAllFlightLegs('QTR', dateObj).subscribe(() => {
        const mockReq = httpMock.expectOne('http://example.com');
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(flightLegs);
        httpMock.verify();
      });
    }
  ));

  it('should get flights using airline id', inject(
    [HttpTestingController, TailService],
    (httpMock: HttpTestingController, tailService: TailService) => {
      const dateObj = {
        fromDate: '2019-04-09',
        toDate: '2019-04-10'
      };
      tailService.getFlightsByAirline('QTR', dateObj).subscribe(() => {
        const mockReq = httpMock.expectOne('http://example.com');
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(flights);
        httpMock.verify();
      });
    }
  ));

});
