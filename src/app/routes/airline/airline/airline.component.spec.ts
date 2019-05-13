import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, ActivatedRoute, Routes, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCheckboxModule, MatTableModule } from '@angular/material';
import { OktaAuthService } from '@okta/okta-angular';
import { Observable } from 'rxjs';
import { AirlineComponent } from './airline.component';
import { UserService } from '../../../shared/services/user/user.service';
import { AirlineService } from '../../../shared/services/admin/airline/airline.service';
import { AccessDeniedComponent } from '../../error/access-denied/access-denied.component';
import { UserRoleAuthGuard } from '../../../shared/guards/user-role-access/user-role-auth.guard';
import { ArtefactModule } from '../../../shared/artefact.module';

class MockUserService {
  hasAirlineAccess(icao) {
    return true;
  }
}

class MockAirlineService {

}
const routes: Routes = [
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  }
];
describe('AirlineComponent', () => {
  const spy = jasmine.createSpyObj('OktaAuthService', ['isAuthenticated']);
  let component: AirlineComponent;
  let userService: MockUserService;
  // let airlineService: MockAirlineService;
  let airlinesService: AirlineService;
  let fixture: ComponentFixture<AirlineComponent>;
  let router: Router;

  const response = [
    {
      'id': 26,
      'name': 'Aeroflot',
      'acronym': 'AFL',
      'status': -1,
      'icao': 'AFL',
      'iata': 'SU',
      'createdAt': null,
      'updatedAt': null
    },
    {
      'id': 18,
      'name': 'Air Canada',
      'acronym': 'ACA',
      'status': -1,
      'icao': 'ACA',
      'iata': 'AC',
      'createdAt': null,
      'updatedAt': null
    },
    {
      'id': 31,
      'name': 'Air Caraibes',
      'acronym': 'FWI',
      'status': 0,
      'icao': 'FWI',
      'iata': 'TX',
      'createdAt': null,
      'updatedAt': null
    }
  ];
  const mockAirlineService = {
    getAirlineForUser(): Observable<any> {
      return Observable.of(response);
    },

    getAirlineByIcao(icao): Observable<any> {
      return Observable.of([{
        'id': 26,
        'name': 'Aeroflot',
        'acronym': 'AFL',
        'status': -1,
        'icao': 'AFL',
        'iata': 'SU',
        'createdAt': null,
        'updatedAt': null
      }]);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AirlineComponent, AccessDeniedComponent],
      imports: [
        RouterModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientModule,
        ArtefactModule,
        MatCheckboxModule,
        MatTableModule
      ],
      providers: [
        UserService,
        { provide: OktaAuthService, useValue: {} },
        { provide: AirlineService, useValue: mockAirlineService },
        {
          provide: ActivatedRoute, useValue: {
            params: Observable.of({ id: 'test' }),
            snapshot: {
              paramMap: {
                get: function (icao) { return 'test'; }
              }
            }
          }
        },
        {
          provide: UserRoleAuthGuard, useValue: {
            checkJBUAccess: function () { },
            getAccess: function () { },
            canActivateChild: function () { },
            hasAccess: Observable.of({
              accessToAllAirlines: true,
              hasAirlineAccess: true
            })
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    userService = TestBed.get(UserService);
    // airlineService = TestBed.get(AirlineService);
    airlinesService = TestBed.get(AirlineService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // const getFlightList = spyOn(userService, 'hasAirlineAccess').and.callThrough();
    component.currentAirlineId = 'test';
    userService.hasAirlineAccess('test');
  });
  it('should be define ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(component.airlinenavigationSubscription).toBeDefined();
  });
  it('should be define isActive', () => {
    component.isAirlineActive([]);
    expect(component.isAirlineActive).toBeDefined();
  });
  it('should be define isDropdownItemActive', () => {
    component.isAirlineDropdownItemActive([['/airlines']]);
    expect(component.isAirlineDropdownItemActive).toBeDefined();
  });
  it('should load data', () => {
    component.currentAirlineId = 'aal';
    component.loadData();
  });

  it('should filter Airline', () => {
    component.dataSource = {
      filter: ''
    };
    component.filterValue = '';
    component.filterAirline(' AbCdE ');
    expect(component.filterValue).toBe('abcde');
    expect(component.dataSource.filter).toBe('abcde');
  });

  it('should reset modal', () => {
    component.dataSource = {
      filter: 'asd'
    };
    component.resetModal();
    expect(component.dataSource.filter).toBe('');
  });

  it('should get selected Icao', () => {
    component.selectedRow();
    expect(component.selectedRow).toBeDefined();
  });

  it('should get all Airlines', () => {
    const airlineSpy = spyOn(airlinesService, 'getAirlineForUser').and.callThrough();
    component.getAllAirlines();
    expect(airlineSpy).toHaveBeenCalled();
  });

  it('should open the modal', () => {
    component.selectedAirline = {};
    component.selectedIcao = 'ACA';
    component.airlinesList = [{
        'airlineName': 'Aeroflot',
        'airlineIcao': 'AFL'
      },
      {
        'airlineName': 'Air Canada',
        'airlineIcao': 'ACA'
      }];
    component.modalHandler();
    expect(component.selectedAirline['airlineIcao']).toBe('ACA');
  });

  it('should navigate airline', () => {
    component.selectedIcao = 'AAL';
    component.currentAirlineId = 'JBU';
    component.dataSource = {
          filter: 'asd'
        };
    component.router = null;
    component.navigateToAirline();
    expect(component.navigateToAirline).toBeDefined();
    expect(component.dataSource.filter).toBe('');
  });

});
