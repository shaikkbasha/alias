import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ArtefactModule } from '../../shared/artefact.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  MatPaginatorModule, MatButtonModule, MatSortModule, MatTableModule,
  MatTabsModule, MatCheckboxModule, MatProgressSpinnerModule,
  MatCardModule, MatFormFieldModule, MatInputModule
} from '@angular/material';
import { TailsComponent } from './tails.component';
import { AirlineTailService } from '../../shared/services/tails/airlinetails.service';
import { TailsDataService } from '../../shared/services/tails/tails-data.service';
import { OktaAuthService, OktaCallbackComponent } from '@okta/okta-angular';
import { LayoutComponent } from '../../../app/layout/layout.component';
import { NotFoundComponent } from '../error/not-found/not-found.component';
import { LoginComponent } from '../login/login.component';
import { HeaderComponent } from '../../../app/layout/header/header.component';
import { HasAnyAuthorityDirective } from '../../shared/directives/auth/has-any-authority.directive';
import { UserService } from '../../shared/services/user/user.service';
import { AirlineService } from '../../shared/services/admin/airline/airline.service';

describe('TailsComponent', () => {
  let component: TailsComponent;
  let fixture: ComponentFixture<TailsComponent>;
  let airlineService: AirlineService;
  let router: Router;
  let tailService: AirlineTailService;
  let tailDataService: TailsDataService;

  const spy = jasmine.createSpyObj('OktaAuthService', ['isAuthenticated', 'loginRedirect']);
  const spyUserservice = jasmine.createSpyObj('UserService', ['identity']);

  const response = [
    {
      'id': 176,
      'repairTailName': '31214',
      'type': 'B737',
      'msn': 31214,
      'airlineId': 8,
      'databaseName': 'AAL_N967NN',
      'platform': 'AVANT',
      'software': 'v2.2.1',
      'systemResetStatus': 0,
      'headEndStatus': 0,
      'firstClassStatus': -1,
      'businessClassStatus': -1,
      'economyClassStatus': -1,
      'connectivityStatus': -1,
      'status': 0,
      'isp': null,
      'acConfiguration': 'B737',
      'eis': '2015-03-12',
      'configStatus': '',
      'lfrf': '',
      'swPartNo': '',
      'swBaseline': 'PI4',
      'swInstalled': '2017-04-02',
      'mapVersion': '',
      'content': '',
      'updatedAt': null,
      'createdAt': null,
      'tailNumber': 'N967NN',
      'fleetNumber': '3MJ'
    },
    {
      'id': 261,
      'repairTailName': 'H5827',
      'type': 'A319',
      'msn': 5827,
      'airlineId': 8,
      'databaseName': 'AAL_N9013A',
      'platform': 'AVANT',
      'software': 'v2.2.1',
      'systemResetStatus': 0,
      'headEndStatus': 2,
      'firstClassStatus': -1,
      'businessClassStatus': -1,
      'economyClassStatus': -1,
      'connectivityStatus': -1,
      'status': 2,
      'isp': 'NONE',
      'acConfiguration': 'A319',
      'eis': '2013-11-21',
      'configStatus': 'ok',
      'lfrf': '',
      'swPartNo': '',
      'swBaseline': 'PI4',
      'swInstalled': '2017-07-07',
      'mapVersion': '',
      'content': '',
      'updatedAt': null,
      'createdAt': null,
      'tailNumber': 'N9013A',
      'fleetNumber': '013'
    },
    {
      'id': 271,
      'repairTailName': 'G46709',
      'type': 'A321',
      'msn': 46709,
      'airlineId': 8,
      'databaseName': 'AAL_N154AA',
      'platform': 'AVANT',
      'software': 'v2.2.1',
      'systemResetStatus': -1,
      'headEndStatus': -1,
      'firstClassStatus': -1,
      'businessClassStatus': -1,
      'economyClassStatus': -1,
      'connectivityStatus': -1,
      'status': -1,
      'isp': 'NONE',
      'acConfiguration': 'A321S/H',
      'eis': '2016-02-07',
      'configStatus': 'ok',
      'lfrf': '',
      'swPartNo': '',
      'swBaseline': 'PI4',
      'swInstalled': '2017-07-08',
      'mapVersion': '',
      'content': '',
      'updatedAt': null,
      'createdAt': null,
      'tailNumber': 'N154AA',
      'fleetNumber': '886'
    }
  ];

  const mockTailService = {
    getAircraftlist(): Observable<any> {
      return Observable.of(response);
    }
  };

  const mockAirlineService = {
    getAirlineByIcao(): Observable<any> {
      return Observable.of({});
    }
  };

  const activatedRoute = {
    parent: {
      params: Observable.of({
        airlineIcao: 'qal',
        flightId: 'abcd123'
      })
    }
  };

  const Routes = [
    {
      path: 'implicit/callback',
      component: OktaCallbackComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: '',
      component: LayoutComponent,
      children: [
        { path: 'not-found', component: NotFoundComponent },
        { path: '**', component: NotFoundComponent }
      ]
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TailsComponent,
        OktaCallbackComponent,
        LoginComponent,
        LayoutComponent,
        NotFoundComponent,
        HeaderComponent,
        HasAnyAuthorityDirective
      ],
      imports: [
        ArtefactModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(Routes),
        MatTableModule,
        MatCardModule,
        MatSortModule,
        MatCheckboxModule,
        NgbModule
      ],
      providers: [
        TailsDataService,
        { provide: OktaAuthService, useValue: spy },
        { provide: UserService, useValue: spyUserservice },
        { provide: AirlineTailService, useValue: mockTailService },
        { provide: AirlineService, useValue: mockAirlineService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(TailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tailService = TestBed.get(AirlineTailService);
    tailDataService = TestBed.get(TailsDataService);
    airlineService = TestBed.get(AirlineService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isActive should be defined', () => {
    component.isActive([]);
    expect(component.isActive).toBeDefined();
  });

  it('isDropdownItemActive should be defined', () => {
    component.isDropdownItemActive([['/flights']]);
    expect(component.isDropdownItemActive).toBeDefined();
  });

  it('should get all tails', () => {
    component.tailsList = [];
    component.currentAirlineId = 'AAL';
    const tailSpy = spyOn(tailService, 'getAircraftlist').and.callThrough();
    component.getAllTails();
    expect(tailSpy).toHaveBeenCalled();
  });

  it('should format filter value', () => {
    component.dataSource = {
      filter: []
    };
    component.filterValue = '';
    component.filterTail(' AqwA');
    expect(component.filterValue).toBe('aqwa');
  });

  it('should navigate to tail', () => {
    component.selectedTail = 'N100NN';
    component.dataSource = {
      filter: []
    };
    const spyData = spyOn(tailDataService, 'sendData').and.callThrough();
    component.navigateToTail();
    expect(spyData).toHaveBeenCalled();
  });

  it('should render modal', () => {
    component.selectedTailObj = {};
    component.selectedTail = 'N154AA';
    component.tailsList = response;
    component.modalHandler();
    expect(component.selectedTailObj['tailNumber']).toBe('N154AA');
  });

  it('should get selectedRow', () => {
    component.selectedRow();
    expect(component.selectedRow).toBeDefined();
  });

  it('should reset tails', () => {
    component.tailNumber = 'N100NN';
    component.dataSource = {
      filter: null
    };
    component.resetTails();
    expect(component.dataSource.filter).toBe('');
    expect(component.selectedTail).toBe('N100NN');
  });

  it('should validate tailNumber', () => {
    component.tailNumber = 'N967NN';
    component.isValidTailNumber(response);
    expect(component.dataSource).toBeDefined();
  });

});
