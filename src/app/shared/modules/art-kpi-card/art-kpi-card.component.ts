import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'art-kpi-card',
  templateUrl: './art-kpi-card.component.html',
  styleUrls: ['./art-kpi-card.component.css']
})
export class ArtKpiCardComponent implements OnInit, OnChanges {

  updatedTime: any;
  noCoverageData = false;
  @Input() loading: boolean;
  @Input() showTime: boolean;
  @Input() cardTitle: string;
  @Input() coverageData: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['coverageData'] && this.coverageData) {
      if (this.coverageData.length) {
        this.noCoverageData = false;
        this.coverageData = this.coverageData[0];
      } else {
        this.noCoverageData = true;
      }
    }
  }

  ngOnInit() {
    if (this.showTime) {
      const usersTimezoneName = moment.tz.guess();
      const timezoneAbbr = moment().tz(usersTimezoneName).format('hh:mm A');
      const res = timezoneAbbr.split(':');
      const localTimeZone = ('0' + res[0]).slice(-2) + ':' + res[1];
      this.updatedTime = localTimeZone;
    }
  }

}
