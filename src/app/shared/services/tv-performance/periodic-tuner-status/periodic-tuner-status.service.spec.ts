import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PeriodicTunerStatusService } from './periodic-tuner-status.service';
describe('TunerService', () => {

  const mockResponse = {
    data: [{
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
    }]
  };

  const mockDetailsResponse = {
    data: [{
      'timestamp': '2018-05-23T21:43:48Z',
      'authorized': 'true',
      'paired': 'true',
      'channelId': '0',
      'channelNumber': '0',
      'transponder': '0',
      'cnr': '-1.0',
      'agc': '-127.5'
    }]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeriodicTunerStatusService]
    });
  });

  it('should be created', () => {
    const periodicService = TestBed.get(PeriodicTunerStatusService);
    expect(periodicService).toBeTruthy();
  });

  it(
    'should get periodic tuner data',
    inject(
      [HttpTestingController, PeriodicTunerStatusService],
      (httpMock: HttpTestingController, periodicTunerService: PeriodicTunerStatusService) => {
        const airlineIcao = 'aal';
        const flightId = '5c011a1e53b7fd001fec504a';
        periodicTunerService.getPeriodicTunerData(flightId, airlineIcao).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');
          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(mockResponse);
          httpMock.verify();
        });
      })
  );

  it(
    'should get periodic tuner details',
    inject(
      [HttpTestingController, PeriodicTunerStatusService],
      (httpMock: HttpTestingController, periodicTunerService: PeriodicTunerStatusService) => {
        const airlineIcao = 'aal';
        const flightId = '5c011a1e53b7fd001fec504a';
        const filterObj = {
          timeStamp: '2018-05-23T21:43:48Z',
          board: 2,
          tuner: 3,
        };
        periodicTunerService.getPeriodicTunerDetails(flightId, airlineIcao, filterObj).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');
          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(mockDetailsResponse);
          httpMock.verify();
        });
      })
  );
});
