import {Component, OnInit, AfterViewInit, EventEmitter, Output, Input, ElementRef, SimpleChanges
, HostListener, ViewChild, OnChanges} from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'art-date-picker',
  templateUrl: './artdatepicker.component.html'
})
export class ArtdatepickerComponent implements OnInit, AfterViewInit, OnChanges {

  hoveredDate: NgbDate;
  fromDate: any;
  toDate: any;
  selectedFromDate: any = new Date();
  selectedToDate: any = new Date();
  enableCalender = false;
  calenderConfig: any;
  @Input() fromdate;
  @Input() todate;
  @Input() utcConversion;
  @Output() selectedDates = new EventEmitter<any>();
  @ViewChild('d') dateRangePicker;
  constructor(calendar: NgbCalendar, private _eref: ElementRef) {
    this.calenderConfig = calendar;
  }
  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event']) handleOutsideClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      // this.enableCalender = false;
      this.dateRangePicker.close();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fromdate'] && this.fromdate) {
      this.selectedFromDate = this.fromdate;
      const fromdate = this.fromdate.toString().split('-');
      this.fromDate = {
        day: parseFloat(fromdate[2]),
        month: parseFloat(fromdate[1]),
        year: parseFloat(fromdate[0])
      };
    }
    if (changes['todate'] && this.todate) {
      this.selectedToDate = this.todate;
      const todate = this.todate.toString().split('-');
      this.toDate = {
        day: parseFloat(todate[2]),
        month: parseFloat(todate[1]),
        year: parseFloat(todate[0])
      };
    }
  }

  ngOnInit() {
    const calendar = this.calenderConfig;
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 7);
    if (this.fromdate) {
      if (this.utcConversion) {
        this.fromDate = this.getUtcConversion(this.fromdate);
        let formatDate: any = '';
        formatDate = new Date(this.fromdate).toISOString().split('T')[0].split('-');
        this.selectedFromDate = new Date(formatDate[1] + '-' + formatDate[2] + '-' + formatDate[0]);
      } else {
        const fromDate = new Date(this.fromdate);
        this.selectedFromDate = fromDate;
        this.fromDate = new NgbDate(fromDate.getFullYear(), (fromDate.getMonth() + 1), fromDate.getDate());
      }
    }
    if (this.todate) {
      if (this.utcConversion) {
        this.toDate = this.getUtcConversion(this.todate);
        let formatDate: any = '';
        formatDate = new Date(this.todate).toISOString().split('T')[0].split('-');
        this.selectedToDate = new Date(formatDate[1] + '-' + formatDate[2] + '-' + formatDate[0]);
      } else {
        const toDate = new Date(this.todate);
        this.selectedToDate = toDate;
        this.toDate = new NgbDate(toDate.getFullYear(), (toDate.getMonth() + 1), toDate.getDate());
      }
    }
  }
  ngAfterViewInit() {
    if (this.fromdate) {
      console.log(this.fromDate, this.toDate);
      if (this.utcConversion) {
        this.fromDate = this.getUtcConversion(this.fromdate);
      } else {
        const fromDate = new Date(this.fromdate);
        this.fromDate = new NgbDate(fromDate.getFullYear(), (fromDate.getMonth() + 1), fromDate.getDate());
      }
    }
    if (this.todate) {
      if (this.utcConversion) {
        this.toDate = this.getUtcConversion(this.todate);
      } else {
        const toDate = new Date(this.todate);
        this.toDate = new NgbDate(toDate.getFullYear(), (toDate.getMonth() + 1), toDate.getDate());
      }
    }
  }
  onDateSelection(date: NgbDate, id) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if (this.fromDate && this.toDate) {
      this.enableCalender = false;
      const getSelectedDates: any  = {
        fromDate: new Date(this.fromDate.month + '/' + this.fromDate.day + '/' + this.fromDate.year) ,
        toDate: new Date(this.toDate.month + '/' + this.toDate.day + '/' + this.toDate.year)
      };
      this.selectedFromDate = getSelectedDates.fromDate;
      this.selectedToDate = getSelectedDates.toDate;
      this.selectedDates.emit(getSelectedDates);
      this.dateRangePicker.close();
    }
  }
  getUtcConversion(date) {
    let formatDate: any = '';
    formatDate = new Date(date).toISOString().split('T')[0].split('-');
    formatDate = new Date(formatDate[1] + '-' + formatDate[2] + '-' + formatDate[0]);
    return new NgbDate(formatDate.getFullYear(), (formatDate.getMonth() + 1), formatDate.getDate());
  }
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    if (this.toDate && this.toDate.month && this.toDate.day && this.toDate.year) {
      this.selectedToDate = new Date(this.toDate.month + '/' + this.toDate.day + '/' + this.toDate.year);
    }
    if (this.fromDate && this.fromDate.month && this.fromDate.day && this.fromDate.year) {
      this.selectedFromDate = new Date(this.fromDate.month + '/' + this.fromDate.day + '/' + this.fromDate.year);
    }
    // this.selectedToDate = new Date(this.toDate.month + '/' + this.toDate.day + '/' + this.toDate.year);
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
}
