import { TestBed, inject } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';

import { ScoreService } from './airlinescore.service';

describe('CoverageService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ScoreService]
        });
    });
    const mockResponse = {
        data: [
            {
                'tailSign' : 'N101NN',
                'tvScore' : '80',
                'signalScore' : '80',
                'channelScore' : '80'
              },
              {
                'tailSign' : 'N102NN',
                'tvScore' : '80',
                'signalScore' : '80',
                'channelScore' : '80'
              }
        ]
    };

    it(
        'should get coverages',
        inject(
            [HttpTestingController, ScoreService],
            (httpMock: HttpTestingController, scoreService: ScoreService) => {
                scoreService.getScoreList(1, '2019-11-10T00:00:00Z', '2019-11-10T00:00:00Z').subscribe(() => {
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

