import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtefactModule } from '../../../shared/artefact.module';
import { ReportComponent } from './reports.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ReportsService } from '../../../shared/services/repair/reports/reports.services';
import { ArtKpiCardComponent } from '../../../shared/modules/art-kpi-card/art-kpi-card.component';
import { LoadingComponent } from '../../../shared/modules/loading/loading-component';
import { ArtActionToolBarComponent } from '../../../shared/modules/artactiontoolbar/artactiontoolbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArtupdatedtimeComponent } from '../../../shared/modules/time/artupdatedtime.component';
import { ChartModule } from 'angular-highcharts';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let reportsService: ReportsService;
  let fixture: ComponentFixture<ReportComponent>;
  const activatedRoute = {
    parent: {
      params: Observable.of({
        airlineIcao: 'qal',
        flightId: 'abcd123'
      })
    }
  };
  const mockReportsService = {
    getLRUType(): Observable<any> {
      const response = [
        {
          'id': 1,
          'fullName': 'dfdfgf',
          'shortName': 'gdfgfdg',
          'locationName': 'dfgdg',
          'createdAt': '2018-12-24 10:17:01',
          'updatedAt': '2018-12-24 10:17:01'
        }
      ];
      return Observable.of(response);
    },
    getLRUName(): Observable<any> {
      const response = [
        {
          'id': 1,
          'fullName': 'dfdfgf',
          'shortName': 'gdfgfdg',
          'locationName': 'dfgdg',
          'createdAt': '2018-12-24 10:17:01',
          'updatedAt': '2018-12-24 10:17:01'
        }
      ];
      return Observable.of(response);
    },
    getPartNumber(): Observable<any> {
      const response = [
        {
          'id': 1,
          'fullName': 'dfdfgf',
          'shortName': 'gdfgfdg',
          'locationName': 'dfgdg',
          'createdAt': '2018-12-24 10:17:01',
          'updatedAt': '2018-12-24 10:17:01'
        }
      ];
      return Observable.of(response);
    },
    getReasonOfRemovals(): Observable<any> {
      const response = [
        {
          'id': 1,
          'fullName': 'dfdfgf',
          'shortName': 'gdfgfdg',
          'locationName': 'dfgdg',
          'createdAt': '2018-12-24 10:17:01',
          'updatedAt': '2018-12-24 10:17:01'
        }
      ];
      return Observable.of(response);
    },
    getRepairActions(): Observable<any> {
      const response = [
        {
          'id': 1,
          'fullName': 'dfdfgf',
          'shortName': 'gdfgfdg',
          'locationName': 'dfgdg',
          'createdAt': '2018-12-24 10:17:01',
          'updatedAt': '2018-12-24 10:17:01'
        }
      ];
      return Observable.of(response);
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReportComponent,
        ArtKpiCardComponent,
        LoadingComponent,
        ArtActionToolBarComponent,
        ArtupdatedtimeComponent
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: activatedRoute,
        },
        {
          provide: ReportsService, useValue: mockReportsService
        }
      ],
      imports: [
        // ArtefactModule,
        NgbModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        FormsModule,
        HttpClientModule,
        ChartModule
      ],
   })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    reportsService = TestBed.get(ReportsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(reportsService, 'getLRUType').and.callThrough();
    expect(component).toBeTruthy();
  });

  it('getLRUName should be defined', () => {
    const spy = spyOn(reportsService, 'getLRUName').and.callThrough();
    component.getLRUName(1);
    expect(component.reports.isPartnumberLoading).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('getPartNumber should be defined', () => {
    const spy = spyOn(reportsService, 'getPartNumber').and.callThrough();
    component.getPartNumber(1);
    expect(component.reports.isPartnumberLoading).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });

  // it('getLRUName should be defined', () => {
  //   const spy = spyOn(reportsService, 'getReasonOfRemovals').and.callThrough();
  //   spyOn(reportsService, 'getRepairActions').and.callThrough();
  //   component.getChartData(1);
  //   expect(spy).toHaveBeenCalled();
  // });

  it('compareValues should be defined', () => {
    component.compareValues('reasonCount', 'asc');
    expect(component.compareValues).toBeDefined();
  });

  it('getReportsList should be defined', () => {
    component.lruType = '1';
    component.lruName = '1';
    component.partNumber = '1';
    component.getReportsList();

    component.lruType = '';
    component.lruName = '';
    component.partNumber = '';
    component.getReportsList();
    expect(component.compareValues).toBeDefined();
  });

  it('renderParetoChart should be defined', () => {
    const obj = {
      xAxis: {
        categories: []
      },
      title: {
        text: ''
      },
      series: [
        {
            type: 'pareto',
            name: 'Pareto',
            yAxis: 1,
            zIndex: 10,
            baseSeries: 1
        },
        {
            name: 'Complaints',
            type: 'column',
            zIndex: 2,
            data: []
        }
      ]
    };
    component.renderParetoChart(obj);
    expect(component.renderParetoChart).toBeDefined();
  });

  it('loadRepairActions should be defined', () => {
    const obj = {
      xAxis: {
        categories: []
      },
      title: {
        text: ''
      },
      series: [
        {
            type: 'pareto',
            name: 'Pareto',
            yAxis: 1,
            zIndex: 10,
            baseSeries: 1
        },
        {
            name: 'Complaints',
            type: 'column',
            zIndex: 2,
            data: []
        }
      ]
    };
    component.loadRepairActions(obj);
    expect(component.loadRepairActions).toBeDefined();
  });

});
