import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  options: {};
  getOptions(vis) {
    this.options = {
      stack: false,
      showCurrentTime: false,
      clickToUse: true,
      editable: false,
      margin: {
        item: 10,
        axis: 5
      },
      moment: function (date) {
        return vis.moment(date).utc();
      }
    };
    return this.options;
  }

  getFlightPhaseOrder(flightPhaseId) {
    switch (flightPhaseId) {
      case 6:
        return 4;
      case 7:
        return 3;
      case 8:
        return 2;
      case 9:
        return 1;
      default:
        return flightPhaseId;
    }

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

  getFormattedText(text) {
    return (text.toString().indexOf('00') >= 0) ? '0' : text;
  }

}
