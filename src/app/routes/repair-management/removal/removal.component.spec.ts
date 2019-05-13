import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RemovalComponent } from './removal.component';
import { ArtefactModule } from '../../../shared/artefact.module';
import {
  MatPaginatorModule, MatButtonModule, MatSortModule, MatTableModule,
  MatTabsModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule,
  MatCardModule, MatFormFieldModule, MatInputModule,
} from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { RemovalsService } from '../../../shared/services/repair/removals/removals.services';
import { UserService } from '../../../shared/services/user/user.service';

describe('RemovalComponent', () => {
  let component: RemovalComponent;
  let fixture: ComponentFixture<RemovalComponent>;
  let removalsService: RemovalsService;
  const spyUserservice = jasmine.createSpyObj('UserService', ['identity', 'hasAnyAuthority']);
  const apiData = [
    {
      'id': 1,
      'removalDate': '2019-03-14 00:00:00',
      'maintenanceStationId': 1,
      'lruPartNumberId': 1,
      'serialNumberOFF': 'A123456',
      'serialNumberON': '',
      'modDotIn': '3,19',
      'otherReasonOfRemoval': '',
      'revision': 'E3',
      'aircraftId': 271,
      'createdAt': '2019-03-14 11:19:40',
      'updatedAt': '2019-03-14 11:19:40',
      'airlineName': 'American Airlines',
      'tailSign': 'N154AA',
      'maintenanceStation': {
        'id': 1,
        'fullName': 'Test',
        'shortName': 'test',
        'locationName': 'chennai',
        'createdAt': '2019-03-14 11:17:45',
        'updatedAt': '2019-03-14 11:17:45'
      },
      'lruPartNumber': {
        'id': 1,
        'lruPartNumber': '180717-101',
        'partNumberId': 1,
        'createdAt': '2019-03-14 11:18:29',
        'updatedAt': '2019-03-14 11:18:29'
      }
    },
    {
      'id': 2,
      'removalDate': '2019-03-14 00:00:00',
      'maintenanceStationId': 1,
      'lruPartNumberId': 1,
      'serialNumberOFF': 'fsdfdsfdsf',
      'serialNumberON': '',
      'modDotIn': '3,23',
      'otherReasonOfRemoval': '',
      'revision': 'D1',
      'aircraftId': 271,
      'createdAt': '2019-03-14 12:51:43',
      'updatedAt': '2019-03-14 12:51:43',
      'airlineName': 'American Airlines',
      'tailSign': 'N154AA',
      'maintenanceStation': {
        'id': 1,
        'fullName': 'Test',
        'shortName': 'test',
        'locationName': 'chennai',
        'createdAt': '2019-03-14 11:17:45',
        'updatedAt': '2019-03-14 11:17:45'
      },
      'lruPartNumber': {
        'id': 1,
        'lruPartNumber': '180717-101',
        'partNumberId': 1,
        'createdAt': '2019-03-14 11:18:29',
        'updatedAt': '2019-03-14 11:18:29'
      }
    },
    {
      'id': 3,
      'removalDate': '2019-03-14 00:00:00',
      'maintenanceStationId': 1,
      'lruPartNumberId': 1,
      'serialNumberOFF': 'a12',
      'serialNumberON': '',
      'modDotIn': '6,26',
      'otherReasonOfRemoval': '',
      'revision': 'D4',
      'aircraftId': 301,
      'createdAt': '2019-03-14 12:53:28',
      'updatedAt': '2019-03-14 12:53:28',
      'airlineName': 'American Airlines',
      'tailSign': 'N951NN',
      'maintenanceStation': {
        'id': 1,
        'fullName': 'Test',
        'shortName': 'test',
        'locationName': 'chennai',
        'createdAt': '2019-03-14 11:17:45',
        'updatedAt': '2019-03-14 11:17:45'
      },
      'lruPartNumber': {
        'id': 1,
        'lruPartNumber': '180717-101',
        'partNumberId': 1,
        'createdAt': '2019-03-14 11:18:29',
        'updatedAt': '2019-03-14 11:18:29'
      }
    }
  ];
  const mockRemovalsService = {
    getRemovalsList(): Observable<any> {
      return Observable.of(apiData);
    },

    getActionDetails(): Observable<any> {
      const response = [{
        'id': 2,
        'description': 'dasdfsdf',
        'lruTypeId': 1,
        'allPN': true,
        'createdAt': '2019-03-28 14:13:23',
        'updatedAt': '2019-03-28 14:13:23'
      }];
      return Observable.of(response);
    },
    getShowDetails(): Observable<any> {
      const response = {
        'id': 638,
        'removalDate': '2019-04-24 00:00:00',
        'maintenanceStationId': 51,
        'lruPartNumberId': 12,
        'serialNumberOFF': 'a0123456',
        'serialNumberON': '',
        'modDotIn': '3,21',
        'otherReasonOfRemoval': '',
        'revision': 'Q4',
        'aircraftId': 400,
        'source': 'health-app',
        'createdAt': '2019-04-24 10:07:47',
        'updatedAt': '2019-04-24 10:07:47',
        'airlineName': 'American Airlines',
        'tailSign': 'N109NN',
        'maintenanceStation': {
          'id': 51,
          'fullName': 'fdgfdg',
          'shortName': 'fdgd',
          'locationName': 'fdgfdg',
          'createdAt': '2019-04-04 13:50:54',
          'updatedAt': '2019-04-04 13:50:54'
        },
        'reasonOfRemoval': {
          'id': 1,
          'lruTypeId': 1,
          'description': 'DSU INOP',
          'allPN': true,
          'createdAt': '2019-02-02 15:47:05',
          'updatedAt': '2019-02-02 15:47:05'
        },
        'lruPartNumber': {
          'id': 12,
          'lruPartNumber': '83306-0A01D',
          'partNumberId': 1,
          'createdAt': '2019-02-13 06:41:31',
          'updatedAt': '2019-02-13 06:41:31'
        },
        'repair': {
          'id': 262,
          'repairDate': '2019-04-24 00:00:00',
          'repairStationId': 10,
          'repairTechnician': 'dffd',
          'modDotOut': '3,21,8,26,28',
          'workOrder': 'dfdsfsf',
          'noFaultFound': null,
          'repairType': '2',
          'removalId': 638,
          'createdAt': '2019-04-24 10:08:35',
          'updatedAt': '2019-04-24 10:08:35',
          'airlineName': 'American Airlines',
          'tailSign': 'N109NN',
          'repairStation': {
            'id': 10,
            'fullName': 'fgfdg',
            'shortName': 'dgf',
            'locationName': 'fdg',
            'updatedAt': '2019-04-04 08:31:08',
            'createdAt': '2019-04-04 08:31:08'
          },
          'level2Repair': {
            'id': 18,
            'comments': 'no',
            'repairId': 18,
            'createdAt': '2019-04-24 10:08:35',
            'updatedAt': '2019-04-24 10:08:35',
            'level2RepairDetails': [
              {
                'id': 37,
                'level2RepairsId': 18,
                'repairActionId': 2,
                'sruSerialNumberOff': 'dsfdsf',
                'sruSerialNumberOn': 'fsdfdsf'
              },
              {
                'id': 38,
                'level2RepairsId': 18,
                'repairActionId': 2,
                'sruSerialNumberOff': 'fdsfdsf',
                'sruSerialNumberOn': 'dsfdsfds'
              }
            ]
          }
        }
      };
      return Observable.of(response);
    }
  };
  const activatedRoute = {
    queryParams: Observable.of({
      fromDate: '2019-03-14T00:00:00Z',
      toDate: '2019-03-17T00:00:00Z'
    })
  };
  const mockRouter = {
    navigate: function (params, path) {
    }
  };
  const mockUserservice = {
    hasAnyAuthority(): Promise<any> {
      return new Promise<any>(resolve => resolve(true));
    },
    getAuthenticationState(): Observable<any> {
      return Observable.of([]);
    },
    setCurrentAirline: function (icao) { },
    isAuthenticated: function () { return true; },
    forceRedirectToBack: function () {
      return {
        isIncrement: false,
        fromdates: '2019-03-14',
        todates: '2019-03-15'
      };
    },
    dateValidation: function (fromdates, todates) {
      return {
        fromdates: '2019-03-14',
        todates: '2019-03-15'
      };
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RemovalComponent],
      imports: [
        ArtefactModule, RouterTestingModule, BrowserAnimationsModule,
        MatPaginatorModule, MatButtonModule, MatSortModule, MatTableModule,
        MatTabsModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule,
        MatCardModule, MatFormFieldModule, MatInputModule, ToastrModule.forRoot()

      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: RemovalsService, useValue: mockRemovalsService },
        { provide: UserService, useValue: mockUserservice }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    removalsService = TestBed.get(RemovalsService);
  });

  it('should create', () => {
    component.fromdates = '2019-03-13T00:00:00Z';
    component.todates = '2019-03-15T00:00:00Z';
    component.routeParams = {
      fromDate: '2019-03-15T00:00:00Z',
      toDate: '2019-03-13T00:00:00Z'
    };
    expect(component).toBeDefined();
  });
  it('should be defined removalsFilter', () => {
    component.removalsFilter('test');
    expect(component.dataSource.filter).toEqual('test');
  });

  it('should be defined getSelectedDates', () => {
    component.fromdates = '2019-03-13T00:00:00Z';
    component.todates = '2019-03-15T00:00:00Z';
    component.routeParams = {
      fromDate: null,
      toDate: '2019-03-15T00:00:00Z'
    };
    component.dataSource = {
      data: []
    };
    const spy = spyOn(removalsService, 'getRemovalsList').and.callThrough();
    const dateObj = {
      fromDate: '2019-03-14T00:00:00Z',
      toDate: '2019-03-16T00:00:00Z'
    };
    removalsService.getRemovalsList(dateObj).subscribe(res => {
      expect(spy).toHaveBeenCalled();
    });
    component.getRepairSelectedDates({ fromDate: new Date(), toDate: new Date() });
    expect(component.isLoading).toBeFalsy();
  });
  it('should be defined showdetails', () => {
    const spy = spyOn(removalsService, 'getShowDetails').and.callThrough();
    component.getEvent(1);
    expect(spy).toHaveBeenCalled();
  });
  it('should be defined repairaction', () => {
    const spy = spyOn(removalsService, 'getActionDetails').and.callThrough();
    component.getEvent(1);
    expect(spy).toHaveBeenCalled();

  });

  it('should be defined getFilterDate', () => {
    component.routeParams.fromDate = '2019-03-13T00:00:00Z';
    component.routeParams.toDate = null;
    component.getRepairFilterDate('2019-03-13T00:00:00Z', '2019-03-17T00:00:00Z');
    expect(component.getRepairFilterDate).toBeDefined();
  });

});

