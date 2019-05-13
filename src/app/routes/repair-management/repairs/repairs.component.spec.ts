import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RepairsComponent } from './repairs.component';
import { ArtefactModule } from '../../../shared/artefact.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RepairsService } from '../../../shared/services/repair/repairs/repairs.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserService } from '../../../shared/services/user/user.service';

import {
  MatPaginatorModule, MatButtonModule, MatSortModule, MatTableModule,
  MatTabsModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule,
  MatCardModule, MatFormFieldModule, MatInputModule,
} from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

describe('RepairComponent', () => {
  let component: RepairsComponent;
  let fixture: ComponentFixture<RepairsComponent>;
  let repairService: RepairsService;
  const spyUserservice = jasmine.createSpyObj('UserService', ['identity', 'hasAnyAuthority']);
  const datasource = [
    {
      'id': 169,
      'serialNumberOFF': '1',
      'lruPartNo': '11',
      'repairDate': '2019-04-12 00:00:00',
      'repairStationId': 5,
      'repairTechnician': 'fdfd',
      'modDotOut': '4,24,11',
      'workOrder': 'fdfdf',
      'noFaultFound': null,
      'repairType': null,
      'removalId': 337,
      'createdAt': '2019-04-12 07:11:46',
      'updatedAt': '2019-04-12 07:11:46',
      'airlineName': 'American Airlines',
      'tailSign': 'N105NN',
      'repairStation': {
        'id': 5,
        'fullName': 'test1',
        'shortName': 'test1',
        'locationName': 'chennai',
        'updatedAt': '2019-02-28 12:20:00',
        'createdAt': '2019-02-28 12:20:00'
      },
      'removal': {
        'id': 337,
        'removalDate': '2019-04-12 00:00:00',
        'maintenanceStationId': 13,
        'lruPartNumberId': 11,
        'serialNumberOFF': 'lev2stg',
        'serialNumberON': '',
        'modDotIn': '4,24,11',
        'otherReasonOfRemoval': '',
        'revision': 'C5',
        'aircraftId': 396,
        'source': 'health-app',
        'createdAt': '2019-04-12 07:11:19',
        'updatedAt': '2019-04-12 07:11:19',
        'airlineName': 'American Airlines',
        'tailSign': 'N105NN',
        'maintenanceStation': {
          'id': 13,
          'fullName': 'Ho Chi MInh',
          'shortName': 'SGN',
          'locationName': 'Vietnam',
          'createdAt': '2019-02-25 09:49:26',
          'updatedAt': '2019-02-25 09:49:26'
        },
        'reasonOfRemoval': {
          'id': 11,
          'lruTypeId': 4,
          'description': 'DSU',
          'allPN': true,
          'createdAt': '2019-04-01 10:50:16',
          'updatedAt': '2019-04-01 10:50:16'
        },
        'lruPartNumber': {
          'id': 11,
          'lruPartNumber': '12-7899456',
          'partNumberId': 1,
          'createdAt': '2019-02-13 06:29:17',
          'updatedAt': '2019-02-13 06:29:17'
        }
      },
      'lruPartNumber': {
        'id': 11,
        'lruPartNumber': '12-7899456',
        'partNumberId': 1,
        'createdAt': '2019-02-13 06:29:17',
        'updatedAt': '2019-02-13 06:29:17'
      }
    },
    {
      'id': 168,
      'repairDate': '2019-04-12 00:00:00',
      'repairStationId': 5,
      'serialNumberOFF': '1',
      'lruPartNo': '11',
      'repairTechnician': 'fdfd',
      'modDotOut': '4,24,11',
      'workOrder': 'fdfdf',
      'noFaultFound': null,
      'repairType': null,
      'removalId': 337,
      'createdAt': '2019-04-12 07:11:46',
      'updatedAt': '2019-04-12 07:11:46',
      'airlineName': 'American Airlines',
      'tailSign': 'N105NN',
      'repairStation': {
        'id': 5,
        'fullName': 'test1',
        'shortName': 'test1',
        'locationName': 'chennai',
        'updatedAt': '2019-02-28 12:20:00',
        'createdAt': '2019-02-28 12:20:00'
      },
      'removal': {
        'id': 337,
        'removalDate': '2019-04-12 00:00:00',
        'maintenanceStationId': 13,
        'lruPartNumberId': 11,
        'serialNumberOFF': 'lev2stg',
        'serialNumberON': '',
        'modDotIn': '4,24,11',
        'otherReasonOfRemoval': '',
        'revision': 'C5',
        'aircraftId': 396,
        'source': 'health-app',
        'createdAt': '2019-04-12 07:11:19',
        'updatedAt': '2019-04-12 07:11:19',
        'airlineName': 'American Airlines',
        'tailSign': 'N105NN',
        'maintenanceStation': {
          'id': 13,
          'fullName': 'Ho Chi MInh',
          'shortName': 'SGN',
          'locationName': 'Vietnam',
          'createdAt': '2019-02-25 09:49:26',
          'updatedAt': '2019-02-25 09:49:26'
        },
        'reasonOfRemoval': {
          'id': 11,
          'lruTypeId': 4,
          'description': 'DSU',
          'allPN': true,
          'createdAt': '2019-04-01 10:50:16',
          'updatedAt': '2019-04-01 10:50:16'
        },
        'lruPartNumber': {
          'id': 11,
          'lruPartNumber': '12-7899456',
          'partNumberId': 1,
          'createdAt': '2019-02-13 06:29:17',
          'updatedAt': '2019-02-13 06:29:17'
        }
      },
      'lruPartNumber': {
        'id': 11,
        'lruPartNumber': '12-7899456',
        'partNumberId': 1,
        'createdAt': '2019-02-13 06:29:17',
        'updatedAt': '2019-02-13 06:29:17'
      }
    }
  ];
  const apiData = [{
    'id': 1,
    'repairDate': '2019-02-25 06:15:07',
    'repairStationId': 1,
    'repairTechnician': 'Karthick',
    'modDotOut': '1,2,3',
    'workOrder': '2',
    'noFaultFound': 'Yes',
    'removalId': 1,
    'createdAt': '2019-02-28 07:32:30',
    'updatedAt': '2019-02-28 07:32:30',
    'airlineName': 'American Airlines',
    'tailSign': 'N102NN',
    'lruPartNumberId': 1,
    'lruPartNumber': {
      'id': 1,
      'lruPartNumber': '180717-101',
      'partNumberId': 1,
      'createdAt': '2019-03-14 11:18:29',
      'updatedAt': '2019-03-14 11:18:29'
    },
    'repairStation': {
      'id': 1,
      'fullName': 'test1',
      'shortName': 'test1',
      'locationName': 'data',
      'updatedAt': '2019-02-27 10:08:47',
      'createdAt': '2019-02-04 12:24:42'
    },
    'removal': {
      'id': 1,
      'removalDate': '2019-02-28 07:32:30',
      'maintenanceStationId': 1,
      'lruPartNumberId': 1,
      'serialNumberOFF': 'A12345',
      'serialNumberON': '',
      'modDotIn': '1,2,3',
      'aircraftId': 1,
      'revision': 'A1',
      'otherReasonOfRemoval': 'test',
      'createdAt': '2019-02-28 07:32:30',
      'updatedAt': '2019-02-28 07:32:30'
    },
  },
  {
    'id': 2,
    'repairDate': '2019-02-25 06:15:07',
    'repairStationId': 1,
    'repairTechnician': 'Karthick',
    'modDotOut': '1,2,3',
    'workOrder': '2',
    'noFaultFound': 'Yes',
    'removalId': 1,
    'createdAt': '2019-02-28 07:32:30',
    'updatedAt': '2019-02-28 07:32:30',
    'airlineName': 'American Airlines',
    'tailSign': 'N102NN',
    'lruPartNumberId': 1,
    'lruPartNumber': {
      'id': 1,
      'lruPartNumber': '180717-101',
      'partNumberId': 1,
      'createdAt': '2019-03-14 11:18:29',
      'updatedAt': '2019-03-14 11:18:29'
    },
    'repairStation': {
      'id': 1,
      'fullName': 'test1',
      'shortName': 'test1',
      'locationName': 'data',
      'updatedAt': '2019-02-27 10:08:47',
      'createdAt': '2019-02-04 12:24:42'
    },
    'removal': {
      'id': 1,
      'removalDate': '2019-02-28 07:32:30',
      'maintenanceStationId': 1,
      'lruPartNumberId': 1,
      'serialNumberOFF': 'A12345',
      'serialNumberON': '',
      'modDotIn': '1,2,3',
      'aircraftId': 1,
      'revision': 'A1',
      'otherReasonOfRemoval': 'test',
      'createdAt': '2019-02-28 07:32:30',
      'updatedAt': '2019-02-28 07:32:30'
    }
  }];
  const mockRepairService = {
    getRepairList(): Observable<any> {
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
        'id': 158,
        'repairDate': '2019-04-16 00:00:00',
        'repairStationId': 8,
        'repairTechnician': 'fgfdg',
        'modDotOut': '1,17,6,22',
        'workOrder': 'fdgdg',
        'noFaultFound': null,
        'removalId': 258,
        'createdAt': '2019-04-16 10:01:09',
        'updatedAt': '2019-04-16 10:01:09',
        'airlineName': 'Air Canada',
        'tailSign': 'C-FSEQ',
        'repairStation': {
          'id': 8,
          'fullName': 'A',
          'shortName': 'ffd',
          'locationName': 'fdsdsf',
          'updatedAt': '2019-04-02 10:35:09',
          'createdAt': '2019-04-02 10:35:16'
        },
        'removal': {
          'id': 258,
          'removalDate': '2019-04-19 00:00:00',
          'maintenanceStationId': 17,
          'lruPartNumberId': 8,
          'serialNumberOFF': '11234',
          'serialNumberON': '',
          'modDotIn': '1,17',
          'otherReasonOfRemoval': '',
          'revision': 'H3',
          'aircraftId': 1346,
          'source': 'health-app',
          'createdAt': '2019-04-16 10:00:08',
          'updatedAt': '2019-04-16 10:00:08',
          'airlineName': 'Air Canada',
          'repairType': '2',
          'tailSign': 'C-FSEQ',
          'maintenanceStation': {
            'id': 17,
            'fullName': 'Irvine',
            'shortName': 'Irvi',
            'locationName': 'US',
            'createdAt': '2019-04-11 09:28:48',
            'updatedAt': '2019-04-11 09:28:48'
          },
          'reasonOfRemoval': {
            'id': 1,
            'lruTypeId': 1,
            'description': 'Blank Screen',
            'allPN': true,
            'createdAt': '2019-03-14 11:19:15',
            'updatedAt': '2019-03-14 11:19:15'
          },
          'lruPartNumber': {
            'id': 8,
            'lruPartNumber': '12-21',
            'partNumberId': 4,
            'createdAt': '2019-04-02 07:21:11',
            'updatedAt': '2019-04-02 07:21:11'
          }
        },
        'level2Repair': {
          'id': 19,
          'comments': 'dsfsf',
          'repairId': 19,
          'createdAt': '2019-04-16 10:01:09',
          'updatedAt': '2019-04-16 10:01:09',
          'level2RepairDetails': [{
            'id': 31,
            'level2RepairsId': 19,
            'repairActionId': 1,
            'sruSerialNumberOff': 'sdf',
            'sruSerialNumberOn': 'sdfdsf'
          }]
        }
      };
      return Observable.of(response);
    }

  };
  const activatedRoute = {
    queryParams: Observable.of({
      fromDate: '2019-03-13T00:00:00Z',
      toDate: '2019-03-15T00:00:00Z'
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
      declarations: [RepairsComponent],
      imports: [
        ArtefactModule, RouterTestingModule, BrowserAnimationsModule,
        MatPaginatorModule, MatButtonModule, MatSortModule, MatTableModule,
        MatTabsModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule,
        MatCardModule, MatFormFieldModule, MatInputModule, ToastrModule.forRoot()

      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: RepairsService, useValue: mockRepairService },
        { provide: UserService, useValue: mockUserservice }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    repairService = TestBed.get(RepairsService);
  });

  it('should create', () => {
    component.fromdates = '2019-03-13T00:00:00Z';
    component.fromdates = '2019-03-15T00:00:00Z';
    component.repairRoutePars = {
      fromDate: '2019-03-13T00:00:00Z',
      toDate: '2019-03-15T00:00:00Z'
    };
    expect(component).toBeDefined();
  });

  it('should be defined repairFilter', () => {
    component.repairFilter('test1');
    expect(component.dataSource.filter).toEqual('test1');
  });
  it('should be defined getSelectedDates', () => {
    component.fromdates = '2019-03-13T00:00:00Z';
    component.todates = '2019-03-15T00:00:00Z';
    component.repairRoutePars = {
      fromDate: null,
      toDate: '2019-03-15T00:00:00Z'
    };
    component.dataSource = {
      data: []
    };
    const spy = spyOn(repairService, 'getRepairList').and.callThrough();
    const dateObj = {
      fromDate: '2019-03-13T00:00:00Z',
      toDate: '2019-03-15T00:00:00Z'
    };
    repairService.getRepairList(dateObj).subscribe(res => {
      expect(spy).toHaveBeenCalled();
    });
    component.getSelectedDates({ fromDate: new Date(), toDate: new Date() });
    expect(component.isLoading).toBeFalsy();
  });

  it('should be defined showdetails', () => {
    const spy = spyOn(repairService, 'getShowDetails').and.callThrough();
    component.getEvent(169);
    expect(spy).toHaveBeenCalled();
  });
  it('should be defined repairaction', () => {
    const spy = spyOn(repairService, 'getActionDetails').and.callThrough();
    component.repairTableCells.selectedRow = {
      removal: [{
        lruPartNumberId: 1
      }]
    };
    component.getEvent(169);
    expect(spy).toBeDefined();
  });
  it('should be defined getFilterDate', () => {
    component.repairRoutePars.fromDate = '2019-03-13T00:00:00Z';
    component.repairRoutePars.toDate = null;
    component.getFilterDate('2019-03-13T00:00:00Z', '2019-03-13T00:00:00Z');
    expect(component.getFilterDate).toBeDefined();
  });

  it('should be defined compare', () => {
    component.compare(1, 1, true);
    expect(component.compare).toBeDefined();
  });

  it('should be defined sortData', () => {
    component.sortData({ active: 'repairStation', direction: 'asc' }, datasource);
    component.sortData({ active: 'airlineName', direction: 'asc' }, datasource);
    component.sortData({ active: 'tailSign', direction: 'asc' }, datasource);
    component.sortData({ active: 'repairDate', direction: 'asc' }, datasource);
    component.sortData({ active: 'lruPartNo', direction: 'asc' }, datasource);
    component.sortData({ active: 'serialNumberOFF', direction: 'asc' }, datasource);
    expect(component.sortData).toBeDefined();
  });

  it('should be defined msSortData', () => {
    component.dataSource = {
      data: datasource
    };
    component.msSortData({ active: false, direction: '' });
    expect(component.msSortData).toBeDefined();
  });
});
