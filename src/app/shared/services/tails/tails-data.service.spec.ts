import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TailsDataService } from './tails-data.service';

describe('TailsDataService', () => {

  let tailsDataService: TailsDataService;
  let tail;
  let subject;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TailsDataService]
    });

    tailsDataService = TestBed.get(TailsDataService);

    tail = {
      tailsNumber:  ''
    };
    subject = new BehaviorSubject(tail);
  });

  it('should be created', () => {
    expect(tailsDataService).toBeTruthy();
  });

  it('should update and return data', () => {
    tail = {
     tailNumber: 'N123NN'
    };
    let resp;
    tailsDataService.tailDetails = tail;
    tailsDataService.getData().subscribe(response => {
      resp = response;
    });
    tailsDataService.sendData(tail);
    expect(resp).toEqual(tail);
  });
  it('should clear data', () => {
    let resp;
    tailsDataService.tailDetails = tail;
    tailsDataService.getData().subscribe(response => {
      resp = response;
    });
    tailsDataService.clearData();
    expect(resp).toEqual(tail);
  });

});
