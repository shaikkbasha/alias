import { TestBed, inject } from '@angular/core/testing';

import { PrintService } from './print.service';

describe('PrintService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [PrintService]
  }));

  it('should be created', () => {
    const service: PrintService = TestBed.get(PrintService);
    expect(service).toBeTruthy();
  });

  it(
    'should be defined print function',
    inject(
        [ PrintService],
        (printService: PrintService) => {
          printService.print('print-repair-info', '');
        }
    )
  );

});


