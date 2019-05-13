import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user/user.service';
import { UserRoleAuthGuard } from '../../../shared/guards/user-role-access/user-role-auth.guard';
import * as moment from 'moment-timezone';
import { ArtupdatedtimeComponent } from '../../../shared/modules/time/artupdatedtime.component';
import { DateFormatterService } from 'src/app/shared/services/dateFormatter/dateformatter.service';
import { HostListener } from '@angular/core';
import { TailService } from 'src/app/shared/services/airline-tail/tails.service';
import { TimelineService } from '../../../shared/services/timeline/timeline.service';
import { ISubscription } from 'rxjs/Subscription';
declare var vis: any;
@Component({
    selector: 'app-home',
    templateUrl: './airline-overview.component.html',
    styleUrls: ['./airline-overview.component.scss']
})
export class AirlineOverviewComponent implements OnInit {
    @ViewChild('timeline') overviewTimelineContainer: ElementRef;
    @ViewChild(ArtupdatedtimeComponent) artUpdatedTimeComponent: ArtupdatedtimeComponent;
    enableTVperformance = true;
    flights: any;
    isLoadingOverView = false;
    airlineIcao = '';
    timeline: any;
    tailLegs = [];
    aloviewupdatedTime: any = new Date();
    overviewFromdate: any = moment().subtract(4, 'days');
    overviewTodate: any = new Date();
    overviewRoutePars: any;
    overviewTLData: any;
    selectedTail: string;
    timelineData: any;
    isError = false;
    overViewToolBarConfig = {
        createLabel: '',
        moduleName: 'AirlineOverview',
        id: 'btn-airline-overview',
        enableSearch: false,
        enableCreate: false,
        enableAnalyze: false,
        analyzeButton: 'Analyze Flight Leg',
        buttonList: []
    };
    routeSubscribtion: ISubscription;
    overViewTails = [];
    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
        private userRoleAuthGuard: UserRoleAuthGuard, private dateService: DateFormatterService,
        private tailService: TailService, private timelineService: TimelineService) { }
    increment = 0;
    @HostListener('window:popstate', ['$event'])
    onPopState(event) {
        setTimeout(() => {
            const overViewResp = this.userService.forceRedirectToBack(this.router.url, this.route.queryParams, '/overview');
            if (overViewResp && overViewResp['isIncrement']) {
                this.increment = 0;
            } else if (overViewResp && !overViewResp['isIncrement']) {
                this.overviewDateProcess(overViewResp);
            }
            if (this.increment === 0) {
                history.go(-1);
            }
            this.increment++;
        });
    }
    ngOnInit() {
        if (this.route.parent) {
            this.routeSubscribtion = this.route.parent.params.subscribe(pars => {
                this.overviewRoutePars = pars;
                this.airlineIcao = pars['airlineIcao'];
                this.init();
            });
        }
        this.route.queryParams.subscribe(params => {
            if (params.fromDate && params.toDate) {
                this.overviewFromdate = this.dateService.dateReplace(params, 'fromDate');
                this.overviewTodate = this.dateService.dateReplace(params, 'toDate');
            }
        });
    }

    init() {
        const dateValidateRes = this.userService.dateValidation(this.overviewFromdate, this.overviewTodate);
        if (dateValidateRes) {
            this.overviewFromdate = dateValidateRes.fromdates;
            this.overviewTodate = dateValidateRes.todates;
        }
        this.overviewDateProcess({ fromDate: moment().subtract(4, 'days'), toDate: new Date() });
    }

    getOverViewFlightLegsData() {
        this.isError = false;
        this.isLoadingOverView = true;
        const dateObjs = {
            fromDate: this.overviewFromdate,
            toDate: this.overviewTodate
        };
        this.tailService.getAirlineAllFlightLegs(this.airlineIcao, dateObjs).subscribe(tailsResp => {
            if (tailsResp && tailsResp.length > 0) {
                this.tailLegs = tailsResp;
                this.overViewTails = this.getBadFlights(this.tailLegs);
            }
            this.tailService.getFlightsByAirline(this.airlineIcao, dateObjs).subscribe(flightsData => {
                this.flights = flightsData;
                if (this.flights.length > 0) {
                    this.initTimeline(this.overViewTails);
                    this.isLoadingOverView = false;
                } else if (this.flights.length === 0 && tailsResp.length === 0) {
                    this.isError = true;
                    this.isLoadingOverView = false;
                }

            }, err => {
                console.log('Error in Flights Get !Date:', dateObjs);
                this.isLoadingOverView = false;
            });
        }, err => {
            console.log('Error in All Tails! Date:', dateObjs);
            this.isError = true;
            this.isLoadingOverView = false;
        });
    }

    getSelDates(event) {
        this.isLoadingOverView = true;
        this.overviewDateProcess(event);
    }

    overviewDateProcess(dateObjs) {
        const dates = {
            fromDate: this.dateService.getDateWithPreviousRange(dateObjs.fromDate, 'fromDate', 5),
            toDate: this.dateService.getDateWithPreviousRange(dateObjs.toDate, 'toDate')
        };
        this.overviewFromdate = dates.fromDate;
        this.overviewTodate = dates.toDate;
        if (!this.overviewRoutePars.fromDate && this.overviewRoutePars.toDate) {
            this.overviewTodate = this.overviewRoutePars.toDate;
            this.router.navigate([`airlines/${this.airlineIcao}/overview`],
                { queryParams: { fromDate: this.overviewFromdate, toDate: this.overviewRoutePars.toDate } });
        } else if (!this.overviewRoutePars.toDate && this.overviewRoutePars.fromDate) {
            this.overviewFromdate = this.overviewRoutePars.fromDate;
            this.router.navigate([`airlines/${this.airlineIcao}/overview`],
                { queryParams: { fromDate: this.overviewRoutePars.fromDate, toDate: this.overviewTodate } });
        } else if (!this.overviewRoutePars.fromDate && !this.overviewRoutePars.toDate) {
            this.router.navigate([`airlines/${this.airlineIcao}/overview`],
                { queryParams: { fromDate: this.overviewFromdate, toDate: this.overviewTodate } });
        }
        this.getOverViewFlightLegsData();
    }

    initTimeline(tails: any) {
        this.overviewTimelineData(tails);
        const overviewTimeline = new vis.DataSet(this.timelineData);
        if (this.tailLegs.length > 0) {
            this.setTimelineOpts(overviewTimeline);
        } else {
            setTimeout(() => {
                this.setTimelineOpts(overviewTimeline);
            }, 500);
        }
    }

    setTimelineOpts(overviewTimeline) {
        const options = this.timelineService.getOptions(vis);
        this.overviewTimelineContainer.nativeElement.innerText = '';
        const tlContainer = this.overviewTimelineContainer.nativeElement;
        this.timeline = new vis.Timeline(tlContainer, this.overviewTLData, overviewTimeline, options);
        const obj = this;
        this.timeline.on('select', function (e) {
            obj.selectedTail = e.items[0];
            if (obj.selectedTail && obj.selectedTail.toString().indexOf('|') !== -1 &&
                obj.selectedTail.toString().indexOf('flight') === -1) {
                obj.timeline.setSelection(obj.selectedTail);
                obj.overViewToolBarConfig.enableAnalyze = true;
            } else {
                obj.timeline.setSelection([]);
                obj.overViewToolBarConfig.enableAnalyze = false;
            }
        });
        this.timeline.on('click', function (e) {
            if (e.what === 'group-label') {
                obj.router.navigate([`airlines/${obj.airlineIcao}/tails/${e.group}/overview`]);
            }
        });
    }

    overviewTimelineData(tails: any) {
        this.overviewTLData = new vis.DataSet();
        this.timelineData = [];
        tails.forEach((tail, key) => {
            const flightLegs = tail.flightDetails;
            this.timelineData.push({
                id: tail.tailSign,
                content: `<strong class="float-left cursor-pointer toolbar-search-icon">
            ${tail.fleetNumber !== null ? tail.fleetNumber : ''}
            <br> ${tail.fleetNumber !== null ? '(' + tail.tailSign + ')' : tail.tailSign}</strong>`,
                subgroupOrder: function (a, b) {
                    return a.subgroupOrder - b.subgroupOrder;
                }
            });
            flightLegs.forEach((fLeg, fkey) => {
                const startDate = moment.utc(fLeg.flightLeg.startTime).format('YYYY-MM-DD HH:mm:ss');
                const endDate = moment.utc(fLeg.flightLeg.endTime).format('YYYY-MM-DD HH:mm:ss');
                let content = `<span id="${fLeg.flightLeg.id}"> ${fLeg.flightLeg.flightNumber} - ${fLeg.flightLeg.departureAirport}>`;
                content += `${fLeg.flightLeg.arrivalAirport}</span>`;
                let title = `Flight Number: <strong> ${fLeg.flightLeg.flightNumber}</strong><br>`;
                title += `Origin: <strong> ${fLeg.flightLeg.departureAirport} </strong><br>`;
                title += `Destination: <strong> ${fLeg.flightLeg.arrivalAirport}</strong> <br>`;
                title += `Start Time (UTC): <strong> ${startDate}</strong><br>`;
                title += `End Time (UTC): <strong> ${endDate}</strong><br>`;
                title += `Duration: <strong> ${this.timelineService.getTimeDifference(startDate, endDate)}</strong><br>`;
                title += `<br> System Reset ${this.statusCircle(fLeg.statuses.systemResetStatus)}<br>`;
                title += `Head-End ${this.statusCircle(fLeg.statuses.headEndStatus)}<br>`;
                title += `First Class ${this.statusCircle(fLeg.statuses.firstClassStatus)}<br>`;
                title += `Bussiness Class ${this.statusCircle(fLeg.statuses.businessClassStatus)}<br>`;
                title += `Economy Class ${this.statusCircle(fLeg.statuses.economyClassStatus)}<br>`;
                this.overviewTLData.add({
                    id: `${fLeg.flightLeg.flightNumber}|${tail.tailSign}|${(key + 1) + (fkey + 1)}${fLeg.id}`,
                    group: tail.tailSign,
                    start: startDate,
                    end: endDate,
                    content: content,
                    title: title,
                    subgroup: 0,
                    className: this.timelineService.getClassName(fLeg.statuses),
                    selectable: true
                });
            });
        });
        if (this.flights.length > 0) {
            this.flights.forEach(flight => {
                if (this.timelineData.findIndex(data => data.id === flight.tailNumber) === -1) {
                    this.timelineData.push({
                        id: flight.tailNumber,
                        content: `<strong class="float-left cursor-pointer toolbar-search-icon"> <br>
                            ${flight.tailNumber}</strong>`,
                        subgroupOrder: function (a, b) {
                            return a.subgroupOrder - b.subgroupOrder;
                        }
                    });
                }
                const startDate = moment.utc(flight.departureDate).format('YYYY-MM-DD HH:mm:ss');
                const endDate = moment.utc(flight.arrivalDate).format('YYYY-MM-DD HH:mm:ss');
                let content = `<span id="${flight.id}"> ${flight.flightNumber} - ${flight.departureAirport}>`;
                content += `${flight.arrivalAirport}</span>`;
                let title = `Flight Number: <strong> ${flight.flightNumber}</strong><br>`;
                title += `Origin: <strong> ${flight.departureAirport} </strong><br>`;
                title += `Destination: <strong> ${flight.arrivalAirport}</strong> <br>`;
                title += `Departure Time (UTC): <strong> ${startDate}</strong><br>`;
                title += `Arrival Time (UTC): <strong> ${endDate}</strong><br>`;
                title += `Duration: <strong> ${this.timelineService.getTimeDifference(startDate, endDate)}</strong>`;
                this.overviewTLData.add({
                    id: `${flight.flightNumber}|${flight.tailNumber}|${flight.id}|flight`,
                    group: flight.tailNumber,
                    start: startDate,
                    end: endDate,
                    content: content,
                    title: title,
                    selectable: true,
                    subgroup: 1,
                    className: 'overview-flight-item timeline-flight'
                });
            });
        }
    }

    overviewEvent(e) {
        if (e.moduleName === 'AirlineOverview') {
            if (e.eventName === 'analyze') {
                const tailData = this.selectedTail.split('|');
                this.router.navigate([`/airlines/${this.airlineIcao}/tails/${tailData[1]}/overview`]);
            }
        }
    }

    getBadFlights(tails: any) {
        tails.forEach(tail => {
            tail['badlegs'] = 0;
            tail.flightDetails.forEach(flightDetail => {
                flightDetail['badlegs'] = 0;
                Object.keys(flightDetail.statuses).forEach(status => {
                    if (flightDetail.statuses[status].toLowerCase() === 'ko') {
                        flightDetail['badlegs'] += 1;
                    }
                });
                tail['badlegs'] += flightDetail['badlegs'];
            });
        });
        return tails.sort((a, b) => (a.badlegs < b.badlegs) ? 1 : ((b.badlegs < a.badlegs) ? -1 : 0));
    }

    statusCircle(status: string) {
        let circleClass = '';
        if (status.toLowerCase() === 'ko') {
            circleClass = 'timeline-flightleg-red';
        } else if (status.toLowerCase() === 'none') {
            circleClass = 'timeline-flightleg-grey';
        } else if (status.toLowerCase() === 'ok') {
            circleClass = 'timeline-flightleg-green';
        }
        return `<i class="circle ${circleClass}"></i>`;
    }
}
