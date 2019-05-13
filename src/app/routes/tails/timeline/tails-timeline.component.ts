import { Component, OnInit, ElementRef, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ISubscription } from 'rxjs/Subscription';
import * as moment from 'moment-timezone';
declare var vis: any;

import { DateFormatterService } from '../../../shared/services/dateFormatter/dateformatter.service';
import { FlightsService } from '../../../shared/services/airline-tail/flights/flights.service';
import { ArtupdatedtimeComponent } from '../../../shared/modules/time/artupdatedtime.component';
import { FlightService } from '../../../shared/services/flights/airlineflights.service';
import { OffloadService } from '../../../shared/services/offloads/airlineoffloads.service';
import { UserService } from './../../../shared/services/user/user.service';
import { TimelineService } from '../../../shared/services/timeline/timeline.service';
import { TailsDataService } from '../../../shared/services/tails/tails-data.service';
@Component({
  selector: 'app-tails-timeline',
  templateUrl: './tails-timeline.component.html',
  styleUrls: ['./tails-timeline.component.css']
})
export class TailTimelineComponent implements OnInit, OnDestroy {
  @ViewChild('timeline') timelineContainer: ElementRef;
  @ViewChild(ArtupdatedtimeComponent) artUpdatedTimeComponent: ArtupdatedtimeComponent;
  updatedTime: any;
  flightDetails: any;
  flightStatus: any = [];
  isLoading = false;
  selection: any = new SelectionModel<any>(false, []);
  fromdates: any = moment().subtract(6, 'days');
  todates: any = new Date();
  tlContainer: any;
  timeline: any;
  data: any;
  groups: any;
  isError = false;
  toDate: string;
  fromDate: string;
  options: {};
  timelineRouteParams: any;
  tailDetails: any;
  tailNumber: any;
  airlineIcao: any;
  selectedFlightLeg: string;
  flightResponse: any;
  offloadResponse: any;
  actionToolBarConfig = {
    createLabel: '',
    moduleName: 'TailsTimeline',
    id: 'btn-tail-overview',
    enableSearch: false,
    enableCreate: false,
    enableAnalyze: false,
    analyzeButton: 'Analyze Flight Leg',
    buttonList: []
  };
  isVisInitialised = true;
  getTailNumber = '';
  tailDataSubscribtion: ISubscription;
  constructor(
    private flightService: FlightsService,
    private router: Router,
    private config: NgbModalConfig,
    private route: ActivatedRoute,
    private dateService: DateFormatterService,
    private offloadService: OffloadService,
    private airlineFightService: FlightService,
    private userService: UserService,
    private timelineService: TimelineService,
    private tailDataService: TailsDataService,
    ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  biteCoverageData: any;
  /**Navigate to previous path */
  increment = 0;
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    setTimeout(() => {
      const timelineUrl = this.router.url;
      const timelineResponse = this.userService.forceRedirectToBack(timelineUrl, this.route.queryParams, '/timeline');
      if (timelineResponse && timelineResponse['isIncrement']) {
        this.increment = 0;
      } else if (timelineResponse && !timelineResponse['isIncrement']) {
        this.processDate(timelineResponse['fromdates'], timelineResponse['todates']);
      }
      if (this.increment === 0) {
        history.go(-1);
      }
      this.increment++;
    });
  }
  ngOnInit() {
    this.updatedTime = new Date();
    this.route.parent.params.subscribe(params => {
      this.timelineRouteParams = params;
    });

    this.tailDataSubscribtion = this.tailDataService.getData().subscribe(data => {
      if (data['tailNumber']) {
        this.getTailNumber = data['tailNumber'];
        this.tailNumber = data['tailNumber'];
        const fromDate = moment().subtract(6, 'days');
        const toDate = new Date();
        this.processDate(fromDate, toDate);
      }
    });

    this.tailNumber = this.timelineRouteParams.tailNumber;
    this.airlineIcao = this.timelineRouteParams.airlineIcao;

    this.route.queryParams.subscribe(params => {
      if (params.fromDate && params.toDate) {
        this.fromdates = this.dateService.dateReplace(params, 'fromDate');
        this.todates = this.dateService.dateReplace(params, 'toDate');
      }
    });
    const res = this.userService.dateValidation(this.fromdates, this.todates);
    if (res) {
      this.fromdates = res.fromdates;
      this.todates = res.todates;
    }
    this.processDate(this.fromdates, this.todates);
  }

  processDate(fromDate, toDate) {
    const dateObj = {
      fromDate: this.dateService.getDateWithPreviousRange(fromDate, 'fromDate', 5),
      toDate: this.dateService.getDateWithPreviousRange(toDate, 'toDate')
    };
    if (dateObj.fromDate.includes('T')) {
      dateObj.fromDate = this.dateService.dateZoneSplit(dateObj, 'fromDate');
    }
    if (dateObj.toDate.includes('T')) {
      dateObj.toDate = this.dateService.dateZoneSplit(dateObj, 'toDate');
    }
    this.fromdates = dateObj.fromDate;
    this.todates = dateObj.toDate;
    if (!this.timelineRouteParams.fromDate && this.timelineRouteParams.toDate) {
      this.todates = this.timelineRouteParams.toDate;
      this.router.navigate(['airlines/' + this.airlineIcao + '/tails/' +
      this.tailNumber + '/timeline'],
        { queryParams: { fromDate: this.fromdates, toDate: this.timelineRouteParams.toDate } });
    } else if (!this.timelineRouteParams.toDate && this.timelineRouteParams.fromDate) {
      this.fromdates = this.timelineRouteParams.fromDate;
      this.router.navigate(['airlines/' + this.airlineIcao + '/tails/' +
      this.tailNumber + '/timeline'],
        { queryParams: { fromDate: this.timelineRouteParams.fromDate, toDate: this.todates } });
    } else if ((!this.timelineRouteParams.fromDate && !this.timelineRouteParams.toDate) ||
    this.timelineRouteParams.fromDate && this.timelineRouteParams.toDate) {

      let tailNo = this.tailNumber;
      if (this.getTailNumber) {
        tailNo = this.getTailNumber;
      }
      this.router.navigate(['airlines/' + this.airlineIcao + '/tails/' + tailNo + '/timeline'],
        { queryParams: { fromDate: this.fromdates, toDate: this.todates } });
      this.getTailNumber = null;
    }
    this.getFlightDetailsByTails();
  }

  getFlightDetailsByTails() {
    this.flightResponse = [];
    this.flightDetails = [];
    this.isError = false;
    this.isLoading = true;
    const getFromDate = this.fromdates.split('T');
    const getToDate = this.todates.split('T');
    const fields = '';
    const dateObj = {
      fromDate: getFromDate[0] + 'T00:00:00Z',
      toDate: getToDate[0] + 'T23:59:59Z'
    };

    this.offloadService.getOffloadListByFileType(this.airlineIcao, dateObj.fromDate, dateObj.toDate,
      this.tailNumber).subscribe(list => {
        this.offloadResponse = list;
      });
    this.airlineFightService.getFlightList(this.airlineIcao, dateObj.fromDate, dateObj.toDate,
      this.tailNumber, false).subscribe(list => {
        this.flightResponse = list;
      });
    this.flightService.getFlights(this.airlineIcao, this.tailNumber, dateObj, fields).subscribe(list => {
      const response: any = list;
      this.isLoading = false;
      const flightLeg = response;
      setTimeout(() => {
        for (let i = 0; i < flightLeg.length; i++) {
          if (flightLeg[i].flightLeg.type === 'OPP') {
            flightLeg[i].flightLeg.flightLegTypes = 'OpenFlightLeg';
          } else {
            flightLeg[i].flightLeg.flightLegTypes = 'ClosedFlightLeg';
          }
        }
        flightLeg.flights = this.flightResponse;
        if ((flightLeg && flightLeg.length) || flightLeg.flights.length
          || (this.offloadResponse && (this.offloadResponse.biteOffloads.length || this.offloadResponse.tvperfOffloads.length
            || this.offloadResponse.conlogOffloads.length))) {
          this.initializeVISTimeline(flightLeg);
        } else {
          this.isError = true;
        }
      });
    });

  }

  initializeVISTimeline(response) {

    this.getTimelineData(response);
    this.getTimelineGroups();
    this.options = this.timelineService.getOptions(vis);
    this.timelineContainer.nativeElement.innerText = '';
    this.tlContainer = this.timelineContainer.nativeElement;
    this.timeline = new vis.Timeline(this.tlContainer, null, this.options);
    this.timeline.setGroups(this.groups);
    this.timeline.setItems(this.data);
    const obj = this;
    this.timeline.on('select', function (properties) {
      obj.selectedFlightLeg = properties.items[0];
      if (obj.selectedFlightLeg && obj.selectedFlightLeg.toString().indexOf('ph') === -1) {
        obj.timeline.setSelection(obj.selectedFlightLeg);
        obj.actionToolBarConfig.enableAnalyze = true;
      } else {
        obj.timeline.setSelection([]);
        obj.actionToolBarConfig.enableAnalyze = false;
      }
    });
  }
  getEvent(params) {
    if (params.moduleName === 'Tailsoverview') {
      if (params.eventName === 'analyze') {
        this.router.navigate(['/airlines/' + this.airlineIcao + '/tails/'
          + this.tailNumber + '/flight-legs/' + this.selectedFlightLeg + '/overview']);
      }
    }

  }
  getTimelineGroups() {
    this.groups = new vis.DataSet([
      { id: 'Flights', content: '<strong class="float-left">Flights</strong>' },
      { id: 'BiteOffloads', content: '<strong class="float-left">BITE Offloads</strong>' },
      { id: 'TVperfOffloads', content: '<strong class="float-left">TV Offloads</strong>' },
      { id: 'ConnOffloads', content: '<strong class="float-left">Connectivity Offloads</strong>' },
      { id: 'OpenFlightLeg', content: '<strong class="float-left">Open Flight Legs</strong>' },
      { id: 'ClosedFlightLeg', content: '<strong class="float-left">Closed Flight Legs</strong>' },
      {
        id: 'FlightPhases', content: '<strong class="float-left">Flight Phases</strong>',
        subgroupOrder: function (a, b) {
          return a.subgroupOrder - b.subgroupOrder;
        }
      }
    ]);
  }

  getTimelineData(timelineData) {
    this.data = new vis.DataSet();
    let id = 1;
    for (let i = 0; i < timelineData.flights.length; i++) {
      const flightData = timelineData.flights;
      const startTime = moment.utc(flightData[i].departureDate).format('YYYY-MM-DD HH:mm:ss');
      const endTime = moment.utc(flightData[i].arrivalDate).format('YYYY-MM-DD HH:mm:ss');
      const timeDiff = this.getTimeDifference(startTime, endTime);
      this.data.add({
        id: 'ph' + id,
        group: 'Flights',
        start: flightData[i].departureDate,
        end: flightData[i].arrivalDate,
        content: '<span id=' + flightData[i].id + '>' + flightData[i].flightNumber + ' - ' +
          flightData[i].departureAirport + ' > ' + flightData[i].arrivalAirport + '</span>',
        title: 'Flight Number: <strong>' + flightData[i].flightNumber +
          '</strong><br> Origin: <strong>' + flightData[i].departureAirport +
          '</strong><br> Destination: <strong>' + flightData[i].arrivalAirport +
          '</strong><br> Departure Time (UTC): <strong>' + startTime +
          '</strong><br> Arrival Time (UTC): <strong>' + endTime +
          '</strong><br> Duration: <strong>' + timeDiff,
        className: 'timeline-flight',
        selectable: true,
      });
      id++;
    }

    id = this.loadOffloadData(id);
    if (timelineData) {
      for (let i = 0; i < timelineData.length; i++) {
        const flightLeg = timelineData[i].flightLeg;
        const startTime = moment.utc(flightLeg.startTime).format('YYYY-MM-DD HH:mm:ss');
        const endTime = moment.utc(flightLeg.endTime).format('YYYY-MM-DD HH:mm:ss');
        const flightLegTypes = timelineData[i].flightLeg.flightLegTypes;
        const legTimeDiff = this.getTimeDifference(startTime, endTime);
        this.data.add({
          id: flightLeg.id,
          group: flightLegTypes,
          start: flightLeg.startTime,
          end: flightLeg.endTime,
          content: '<span id=' + flightLeg.id + '>' + flightLeg.flightNumber + ' - ' +
            flightLeg.departureAirport + ' > ' + flightLeg.arrivalAirport + '</span>',
          title: 'Flight Number: <strong>' + flightLeg.flightNumber +
            '</strong><br> Origin: <strong>' + flightLeg.departureAirport +
            '</strong><br> Destination: <strong>' + flightLeg.arrivalAirport +
            '</strong><br> Start Time (UTC): <strong>' + startTime +
            '</strong><br> End Time (UTC): <strong>' + endTime +
            '</strong><br> Duration: <strong>' + legTimeDiff,
          className: this.getClassName(timelineData[i].statuses),
          selectable: true,
        });
        id++;
        const flightPhases = timelineData[i].flightPhases;
        for (let j = 0; j < flightPhases.length; j++) {
          const flightPhase = flightPhases[j];
          const sTime = moment.utc(flightPhase.startTime).format('YYYY-MM-DD HH:mm:ss');
          const eTime = moment.utc(flightPhase.endTime).format('YYYY-MM-DD HH:mm:ss');
          const desc = flightPhase.flightPhaseDescription ? (' - ' + flightPhase.flightPhaseDescription) : '';
          const phaseTimeDiff = this.getTimeDifference(sTime, eTime);
          this.data.add({
            id: 'ph' + id,
            group: 'FlightPhases',
            start: flightPhase.startTime,
            end: flightPhase.endTime,
            content: flightPhase.flightPhaseId + desc,
            title: 'Flight Phase: <strong>' + flightPhase.flightPhaseId + desc +
              '</strong><br>Start Time (UTC): <strong>' + sTime + '</strong><br>End Time (UTC): <strong>' + eTime + '</strong>' +
              '</strong><br> Duration: <strong>' + phaseTimeDiff,
            subgroup:  this.timelineService.getFlightPhaseOrder(flightPhase.flightPhaseId),
            className: 'vis-item-default'
          });
          id++;
        }
      }
    }
  }

  loadOffloadData(id) {
    if (this.offloadResponse) {
      if (this.offloadResponse.biteOffloads && this.offloadResponse.biteOffloads.length) {
        this.offloadResponse.biteOffloads.forEach(biteOffload => {
          this.dataObjPush(biteOffload, id, 'BiteOffloads');
          id++;
        });
      }

      if (this.offloadResponse.conlogOffloads && this.offloadResponse.conlogOffloads.length) {
        this.offloadResponse.conlogOffloads.forEach(conlogOffload => {
          this.dataObjPush(conlogOffload, id, 'ConnOffloads');
          id++;
        });
      }

      if (this.offloadResponse.tvperfOffloads && this.offloadResponse.tvperfOffloads.length) {
        this.offloadResponse.tvperfOffloads.forEach(tvperfOffload => {
          this.dataObjPush(tvperfOffload, id, 'TVperfOffloads');
          id++;
        });
      }
      return id;
    }
  }

  dataObjPush(flightData: any, id: number, fieldName: string) {
    const startTime = moment.utc(flightData.flightLegStartTime).format('YYYY-MM-DD HH:mm:ss');
    const endTime = moment.utc(flightData.flightLegEndTime).format('YYYY-MM-DD HH:mm:ss');
    const uploadTime = moment.utc(flightData.uploadedTime).format('YYYY-MM-DD HH:mm:ss');
    const leadTime = this.getLeadTimeinFormat(flightData.leadTime);
    this.data.add({
      id: 'ph' + id,
      group: fieldName,
      start: flightData.flightLegStartTime,
      end: flightData.flightLegEndTime,
      content: '<span id=' + flightData.id + '>' + flightData.fileName + '</span>',
      title: 'File Name: <strong>' + flightData.fileName + '</strong><br>Start Time (UTC): <strong>'
        + startTime + '</strong><br>End Time (UTC): <strong>' + endTime +
        '</strong><br>Upload Time (UTC): <strong>' + uploadTime +
        '</strong><br>Lead Time: <strong>' + leadTime,
      className: 'timeline-flight',
      selectable: true,
    });
  }

  getLeadTimeinFormat(seconds) {
    const numdays = Math.floor(seconds / 86400);
    const numdaysConv = (numdays.toString().length === 1) ? '0' + numdays : numdays;
    const numhours = Math.floor((seconds % 86400) / 3600);
    const numhoursConv = (numhours.toString().length === 1) ? '0' + numhours : numhours;
    const numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
    const numminutesConv = (numminutes.toString().length === 1) ? '0' + numminutes : numminutes;
    const numseconds = ((seconds % 86400) % 3600) % 60;
    const numsecondsConv = (numseconds.toString().length === 1) ? '0' + numseconds : numseconds;
    return numdaysConv + 'd ' + numhoursConv + 'h ' + numminutesConv + 'm ' + numsecondsConv + 's';
  }
  getClassName(status) {
    let className = '';
    const flightLegColor = [
      status.businessClassStatus.toLowerCase(),
      status.headEndStatus.toLowerCase(),
      status.firstClassStatus.toLowerCase(),
      status.systemResetStatus.toLowerCase(),
      status.economyClassStatus.toLowerCase()
    ];
    if (status.businessClassStatus === 'none' && status.economyClassStatus === 'none' &&
      status.firstClassStatus === 'none' && status.headEndStatus === 'none' && status.systemResetStatus === 'none') {
      className = 'timeline-flightleg-grey';
    } else if (flightLegColor.indexOf('ko') !== -1) {
      className = 'timeline-flightleg-red';
    } else if (flightLegColor.indexOf('ok') !== -1) {
      className = 'timeline-flightleg-green';
    }
    return className;
  }

  getSelectedDates(datas) {
    this.isLoading = true;
    this.processDate(datas.fromDate, datas.toDate);
    this.timelineContainer.nativeElement.innerText = '';
  }

  getTimeDifference(startTime, endTime) {
    const dateB = moment(endTime);
    const dateC = moment(startTime);
    const diffInMilliSeconds = dateB.diff(dateC);
    const timeDiff = moment.utc(diffInMilliSeconds).format('HH:mm:ss');
    const timeSplit = timeDiff.split(':');
    return this.getFormattedText(timeSplit[0]) + 'h '
      + this.getFormattedText(timeSplit[1]) + 'm ' +
      this.getFormattedText(timeSplit[2]) + 's ';
  }

  getFormattedText(text) {
    return (text.toString().indexOf('00') >= 0) ? '0' : text;
  }

  ngOnDestroy() {
    this.tailDataSubscribtion.unsubscribe();
  }

}
