import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ConnectivityService } from '../../../shared/services/airline-flights/connectivity/connectivity.service';
declare var vis: any;
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment-timezone';
import { TimelineService } from '../../../shared/services/timeline/timeline.service';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  @ViewChild('timeline') timelineContainer: ElementRef;
  flightDetails: any;
  flightStatus: any = [];
  isLoading = false;
  selection: any = new SelectionModel<any>(false, []);
  tlContainer: any;
  timeline: any;
  data: any;
  groups: any;
  isError = false;
  options: {};
  kalogdetails: any = {};
  routeParams: any;
  getTailNumber: any;
  labelValueFormat: any;
  actionToolBarConfig = {
    createLabel: '',
    moduleName: 'overview',
    id: '',
    enableSearch: false,
    enableCreate: false,
    buttonList: []
  };
  constructor(private connectivityService: ConnectivityService, private router: Router, private route: ActivatedRoute,
            private timelineService: TimelineService) {
  }

  ngOnInit() {
    this.labelValueFormat = {
      format: 'Date',
      conversionFormat: 'EEEE, MMM dd - hh:mm a',
      upperCase: true
    };
    this.route.parent.params.subscribe(params => {
      this.routeParams = params;
    });
    this.getFlightDetails();
  }

  getFlightDetails() {
    this.flightDetails = [];
    this.isError = false;
    this.isLoading = true;
    this.getTailNumber = null;
    const params = this.routeParams;
    this.connectivityService.getFlightDetails(params).subscribe(list => {
      const response: any = list;

      if (response && response.flightLeg) {
        response.flightLeg.startTime = new Date(response.flightLeg.startTime);
        response.flightLeg.endTime = new Date(response.flightLeg.endTime);
        this.flightDetails['flightNumber'] = response.flightLeg.flightNumber;
        this.flightDetails['flightLegStartTime'] = response.flightLeg.startTime;
        this.flightDetails['flightLegEndTime'] = response.flightLeg.endTime;
        this.flightDetails['arrivalAirport'] = response.flightLeg.arrivalAirport;
        this.flightDetails['departureAirport'] = response.flightLeg.departureAirport;

      }
      this.flightStatus = response.statuses;
      if (response && !response['error']) {
        const flightPhases = (response.flightPhases && !response.flightPhases.length);
        if (!response['flightLeg'] && flightPhases) {
          this.isError = true;
        } else {
          this.getTailNumber = this.routeParams.tailNumber;
          this.initializeVISTimeline(response);
          this.flightDetails['tailNumber'] = this.routeParams.tailNumber;
        }
        this.flightDetails['dateFormat'] = {
          format: 'Date',
          conversionFormat: `MM/dd/yyyy HH:mm`,
          timeZone: 'UTC'
        };
        if (!response['flightLeg']) {
          response['flightLeg'] = {};
        }
        this.connectivityService.setFlightNumber(response['flightLeg']);
      } else if (response && response['error']) {
        this.isError = true;
        this.getTailNumber = null;
      }
      this.isLoading = false;
    });
  }

  initializeVISTimeline(response) {
    this.getTimelineData(response);
    this.getTimelineGroups(response.flightLeg.type);
    setTimeout(() => {
      this.options = this.timelineService.getOptions(vis);
      this.tlContainer = this.timelineContainer.nativeElement;
      this.timeline = new vis.Timeline(this.tlContainer, null, this.options);
      this.timeline.setGroups(this.groups);
      this.timeline.setItems(this.data);
    });
  }

  getTimelineGroups(type) {
    if (type === 'OPP') {
      this.groups = new vis.DataSet([
        { id: 'OpenFlightLeg', content: '<strong class="float-left">Open Flight Legs</strong>' },
        {
          id: 'FlightPhases', content: '<strong class="float-left">Flight Phases</strong>',
          subgroupOrder: function (a, b) {
            return a.subgroupOrder - b.subgroupOrder;
          }
        }
      ]);
    } else {
      this.groups = new vis.DataSet([
        { id: 'ClosedFlightLeg', content: '<strong class="float-left">Closed Flight Legs</strong>' },
        {
          id: 'FlightPhases', content: '<strong class="float-left">Flight Phases</strong>',
          subgroupOrder: function (a, b) {
            return a.subgroupOrder - b.subgroupOrder;
          }
        }
      ]);
    }
  }

  getTimelineData(timelineData) {
    this.data = new vis.DataSet();
    let id = 1;
    let groupName = '';
    const flightLeg = timelineData.flightLeg;
    const startTime = moment.utc(flightLeg.startTime).format('YYYY-MM-DD HH:mm:ss');
    const endTime = moment.utc(flightLeg.endTime).format('YYYY-MM-DD HH:mm:ss');
    if (flightLeg.type === 'OPP') {
      groupName = 'OpenFlightLeg';
    } else {
      groupName = 'ClosedFlightLeg';
    }
    this.data.add({
      id: id,
      group: groupName,
      start: flightLeg.startTime,
      end: flightLeg.endTime,
      content: flightLeg.flightNumber + ' - ' + flightLeg.departureAirport + ' > ' + flightLeg.arrivalAirport,
      title: 'Flight Leg Start Time: <strong>' + startTime + '</strong><br>Flight Leg End Time: <strong>' + endTime,
      className: this.getOverviewClassName(timelineData.statuses),
      selectable: true
    });
    id++;
    const overviewflightPhases = timelineData.flightPhases;
    for (let j = 0; j < overviewflightPhases.length; j++) {
      const overviewflightPhase = overviewflightPhases[j];
      const sTime = moment.utc(overviewflightPhase.startTime).format('YYYY-MM-DD HH:mm:ss');
      const eTime = moment.utc(overviewflightPhase.endTime).format('YYYY-MM-DD HH:mm:ss');
      const desc = overviewflightPhase.flightPhaseDescription ? (' - ' + overviewflightPhase.flightPhaseDescription) : '';
      this.data.add({
        id: id,
        group: 'FlightPhases',
        start: overviewflightPhase.startTime,
        end: overviewflightPhase.endTime,
        content: overviewflightPhase.flightPhaseId + desc,
        title: 'Flight Phase Start Time: <strong>' + sTime + '</strong><br>Flight Phase End Time: <strong>' + eTime + '</strong>',
        subgroup: this.timelineService.getFlightPhaseOrder(overviewflightPhase.flightPhaseId),
        className: 'vis-item-default'
      });
      id++;
    }
  }

  getOverviewClassName(status) {
    let overviewClassName = '';
    const flightLegColor = [
      status.businessClassStatus.toLowerCase(),
      status.headEndStatus.toLowerCase(),
      status.firstClassStatus.toLowerCase(),
      status.systemResetStatus.toLowerCase(),
      status.economyClassStatus.toLowerCase()
    ];
    if (status.businessClassStatus === 'none' && status.economyClassStatus === 'none' &&
     status.firstClassStatus === 'none' && status.headEndStatus === 'none' && status.systemResetStatus === 'none') {
      overviewClassName = 'timeline-flightleg-grey';
    } else if (flightLegColor.indexOf('ko') !== -1) {
      overviewClassName = 'timeline-flightleg-red';
    } else if (flightLegColor.indexOf('ok') !== -1) {
      overviewClassName = 'timeline-flightleg-green';
    }
    return overviewClassName;
  }
}
