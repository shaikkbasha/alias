import { TestBed, inject } from '@angular/core/testing';
import { TimelineService } from './timeline.service';

describe('TimelineService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TimelineService]
        });
    });
    it(
        'getFlightPhaseOrder should be defined',
        inject(
            [TimelineService],
            (service: TimelineService) => {
                service.getFlightPhaseOrder(1);
                service.getFlightPhaseOrder(2);
                service.getFlightPhaseOrder(3);
                service.getFlightPhaseOrder(4);
                service.getFlightPhaseOrder(5);
                service.getFlightPhaseOrder(6);
                service.getFlightPhaseOrder(7);
                service.getFlightPhaseOrder(8);
                service.getFlightPhaseOrder(9);
                service.getFlightPhaseOrder(10);
                expect(service.getFlightPhaseOrder).toBeDefined();
            }
        )
    );

    it('should get the class name green', inject([TimelineService],
        (service: TimelineService) => {
            const status = {
                'systemResetStatus': 'ok',
                'headEndStatus': 'ok',
                'firstClassStatus': 'none',
                'businessClassStatus': 'none',
                'economyClassStatus': 'none'
            };
            const className = service.getClassName(status);
            expect(className).toBe('timeline-flightleg-green');
        }
    ));

    it('should get the class name red', inject([TimelineService],
        (serv: TimelineService) => {
            const status = {
                'systemResetStatus': 'ok',
                'headEndStatus': 'ko',
                'firstClassStatus': 'none',
                'businessClassStatus': 'none',
                'economyClassStatus': 'none'
            };
            const className = serv.getClassName(status);
            expect(className).toBe('timeline-flightleg-red');
        }
    ));

    it('should get the class name grey', inject([TimelineService],
        (ser: TimelineService) => {
            const status = {
                'systemResetStatus': 'none',
                'headEndStatus': 'none',
                'firstClassStatus': 'none',
                'businessClassStatus': 'none',
                'economyClassStatus': 'none'
            };
            const className = ser.getClassName(status);
            expect(className).toBe('timeline-flightleg-grey');
        }
    ));

    it('should get Time Difference', inject([TimelineService],
        (service: TimelineService) => {
            const timediff = service.getTimeDifference('2018-12-18T11:31:40Z', '2018-12-18T16:02:02Z');
            expect(timediff).toBe('04h 30m 22s ');
        }
    ));

    it('should get Time Difference branch cover', inject([TimelineService],
        (service: TimelineService) => {
            const timediff = service.getTimeDifference('2018-12-18T11:31:00Z', '2018-12-18T16:02:00Z');
            expect(timediff).toBe('04h 31m 0s ');
        }
    ));

});

