import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreService } from '../../../shared/services/scores/airlinescore.service';
import { AirlineScoresComponent } from './airline-scores.component';
import {
  MatButtonModule,
  MatCardModule,
  MatSort,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatTableModule,
  MatIconModule,
  MatTabsModule,
  MatPaginatorModule
} from '@angular/material';
import { ChartModule } from 'angular-highcharts';
import { ArtKpiCardComponent } from './../../../shared/modules/art-kpi-card/art-kpi-card.component';
import { ActivatedRoute } from '@angular/router';
import {NgPipesModule} from 'ngx-pipes';
import { CustomPipesModule } from 'ngx-custom-pipes';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArtefactModule } from '../../../shared/artefact.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('AirlineScoresComponent', () => {
  const mockAirlineScoreService = {
    getScoreList(): Observable<any>  {
      const response = [ {
        'tailSign' : 'N101NN',
        'tvScore' : '80',
        'signalScore' : '80',
        'channelScore' : '80'
      },
      {
        'tailSign' : 'N102NN',
        'tvScore' : '80',
        'signalScore' : '80',
        'channelScore' : '80'
      }];
      return Observable.of(response);
    }
  };
  const activatedRoute = {
    parent: {
      params: Observable.of({
        airlineIcao: 'qal'
      })
    }
  };
  let component: AirlineScoresComponent;
  let fixture: ComponentFixture<AirlineScoresComponent>;
  let scoreService: any = ScoreService;

  const httpClient: any = HttpClient;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AirlineScoresComponent, MatSort],
      imports: [
        NgPipesModule,
        CustomPipesModule,
        ArtefactModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatCardModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        MatTabsModule,
        ChartModule


      ],
      providers: [ScoreService, HttpClientModule, HttpClient,
        { provide: ActivatedRoute, useValue: activatedRoute},
        { provide: ScoreService, useValue: mockAirlineScoreService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    scoreService = TestBed.get(ScoreService);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('fetchScores', () => {
    component.id = 'qal';
    component.fromDate = '2018-10-09 10:10:10';
    component.toDate = '2018-10-09 10:10:10';
    const spy = spyOn(scoreService, 'getScoreList').and.callThrough();
    component.fetchScores();
    expect(spy).toHaveBeenCalled();
  });
  it('should be define get filter data', () => {
    const filterData = {
      'fromDate': '2019-01-23T18:30:00.000Z',
      'toDate': '2019-01-24T18:30:00.000Z'
    };
    component.getSelectedDates(filterData);
  });
});
