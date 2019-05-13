import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { RepairsService } from './repairs.service';

describe('RepairsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [RepairsService],
  }));


  const responed = [
    {
      'id': 31,
      'removalDate': '2019-01-23 04:50:14',
      'maintenanceStationId': 21,
      'lruPartNumberId': 38,
      'serialNumberOFF': 'A0123456',
      'serialNumberON': 'A1234560',
      'modDotIn': null,
      'otherReasonOfRemoval': null,
      'aircraftId': 889,
      'createdAt': '2019-01-23 04:50:14',
      'updatedAt': '2019-01-23 04:50:14',
      'airlineName': 'HZ-AK35',
      'tailSign': 'Saudia Airlines',
      lruPartNumber: {
        'id': 38,
        'lruPartNumber': '183330-101',
        'partNumberId': 1,
        'createdAt': '2019-02-14 09:16:43',
        'updatedAt': '2019-02-14 09:16:43'
      },
      maintenanceStation: {
        'id': 21,
        'fullName': 'Servo Data 3',
        'shortName': 'LHR',
        'locationName': 'dfgdg',
        'createdAt': '2019-02-13 06:24:54',
        'updatedAt': '2019-02-13 06:24:54',
      },
      reasonOfRemoval: {
        'id': 31,
        'lruTypeId': 40,
        'description': 'Blank Screen',
        'allPN': true,
        'createdAt': '2019-01-31 10:35:51',
        'updatedAt': '2019-01-31 10:35:51'
      }
    }

  ];
  it(
    'should get repairs',
    inject(
      [HttpTestingController, RepairsService],
      (httpMock: HttpTestingController, service: RepairsService) => {
        service.getRepair().subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(responed);
          httpMock.verify();
        });
      }
    )
  );

  it(
    'should get getLru list',
    inject(
      [HttpTestingController, RepairsService],
      (httpMock: HttpTestingController, service: RepairsService) => {
        service.getLru(10).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(responed);
          httpMock.verify();
        });
      }
    )
  );
  const respone = [{
    maintenanceStation: {
      'id': 21,
      'fullName': 'Servo Data 3',
      'shortName': 'LHR',
      'locationName': 'dfgdg',
      'createdAt': '2019-02-13 06:24:54',
      'updatedAt': '2019-02-13 06:24:54',
    }
  }
  ];
  it(
    'should get MintenanceStation list',
    inject(
      [HttpTestingController, RepairsService],
      (httpMock: HttpTestingController, service: RepairsService) => {
        service.getMaintenanceStationlist().subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(respone);

          httpMock.verify();
        });
      }
    )
  );
  const resp = [
    {
      'id': 1,
      'fullName': 'dfdfgf',
      'shortName': 'gdfgfdg',
      'locationName': 'dfgdg',
      'createdAt': '2018-12-24 10:17:01',
      'updatedAt': '2018-12-24 10:17:01'
    }
  ];
  it(
    'should get Airline list',
    inject(
      [HttpTestingController, RepairsService],
      (httpMock: HttpTestingController, service: RepairsService) => {
        service.getAirlinelist().subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');
          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(resp);

          httpMock.verify();
        });
      }
    )
  );
  const respon = [{
    maintenanceStation: {
      'id': 21,
      'fullName': 'Servo Data 3',
      'shortName': 'LHR',
      'locationName': 'dfgdg',
      'createdAt': '2019-02-13 06:24:54',
      'updatedAt': '2019-02-13 06:24:54',
    }
  }
  ];
  it(
    'should get getLruName list',
    inject(
      [HttpTestingController, RepairsService],
      (httpMock: HttpTestingController, service: RepairsService) => {
        service.getLruName().subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(respon);

          httpMock.verify();
        });
      }
    )
  );
  const resped = [{
    lruPartNumber: {
      'id': 38,
      'lruPartNumber': '183330-101',
      'partNumberId': 1,
      'createdAt': '2019-02-14 09:16:43',
      'updatedAt': '2019-02-14 09:16:43'
    }
  }
  ];
  it(
    'should get getLruPartNumber list',
    inject(
      [HttpTestingController, RepairsService],
      (httpMock: HttpTestingController, service: RepairsService) => {
        service.getLruPartNumber(1).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(resped);

          httpMock.verify();
        });
      }
    )
  );
  const responses = [{
    reasonOfRemoval: {
      'id': 31,
      'lruTypeId': 40,
      'description': 'Blank Screen',
      'allPN': true,
      'createdAt': '2019-01-31 10:35:51',
      'updatedAt': '2019-01-31 10:35:51'
    }
  }
  ];
  it(
    'should get Reason Removal list',
    inject(
      [HttpTestingController, RepairsService],
      (httpMock: HttpTestingController, service: RepairsService) => {
        service.ReasonRemoval(1).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(responses);

          httpMock.verify();
        });
      }
    )
  );
  it(
    'should get Tail list',
    inject(
      [HttpTestingController, RepairsService],
      (httpMock: HttpTestingController, service: RepairsService) => {
        service.getTails(10).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(responed);

          httpMock.verify();
        });
      }
    )
  );
  it(
    'should post create list',
    inject(
      [HttpTestingController, RepairsService],
      (httpMock: HttpTestingController, service: RepairsService) => {
        service.createRemoval(10).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(responed);

          httpMock.verify();
        });
      })
  );

  it(
    'should post create repair',
    inject(
      [HttpTestingController, RepairsService],
      (httpMock: HttpTestingController, service: RepairsService) => {
        service.createRepair([{}]).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(responed);

          httpMock.verify();
        });
      })
  );

  it(
    'should get Repair Actions list',
    inject(
      [HttpTestingController, RepairsService],
      (httpMock: HttpTestingController, service: RepairsService) => {
        service.getRepairActions(1).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(responed);

          httpMock.verify();
        });
      })
  );
  const mockResponse = {
    data: [
      {'id': 176,
      'repairTailName': '31214',
      'noseNumber':  '3MJ',
      'msn': 31214,
      'type': 'B737',
      'airlineId': 8,
      'databaseName': 'AAL_N967NN',
      'platform': 'AVANT',
      'software': 'v2.2.1',
      'systemResetStatus': 0,
      'headEndStatus': 0,
      'firstClassStatus': -1,
      'businessClassStatus': -1,
      'economyClassStatus': -1,
      'connectivityStatus': -1,
      'status': 0,
      'isp': null,
      'acConfiguration': 'B737',
      'eis': '2015-03-12',
      'configStatus': '',
      'lfrf': '',
      'swPartNo': '',
      'swBaseline': 'PI4',
      'swInstalled': '2017-04-02',
      'mapVersion': '',
      'content': '',
      'createdAt': null,
      'updatedAt': null,
      'tailNumber': 'N967NN'
    }
    ]
};

it(
    'should get repair list',
    inject(
        [HttpTestingController, RepairsService],
        (httpMock: HttpTestingController, service: RepairsService) => {
          service.getRepairList({fromDate: '', toDate: ''}).subscribe(() => {
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
  'should get tail list',
  inject(
      [HttpTestingController, RepairsService],
      (httpMock: HttpTestingController, service: RepairsService) => {
        service.getShowDetails({fromDate: '', toDate: ''}).subscribe(() => {
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
  'should get tail list',
  inject(
      [HttpTestingController, RepairsService],
      (httpMock: HttpTestingController, service: RepairsService) => {
        service.getActionDetails({fromDate: '', toDate: ''}).subscribe(() => {
              const mockReq = httpMock.expectOne('http://example.com');

              expect(mockReq.cancelled).toBeFalsy();
              expect(mockReq.request.responseType).toEqual('json');
              mockReq.flush(mockResponse);

              httpMock.verify();
          });
      }
  )
);
});
