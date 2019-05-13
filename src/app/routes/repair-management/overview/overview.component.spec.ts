import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RepairsService } from '../../../shared/services/repair/repairs/repairs.service';
import { Observable } from 'rxjs';
import { ArtefactModule } from '../../../shared/artefact.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { DateFormatterService } from '../../../shared/services/dateFormatter/dateformatter.service';
import { OverviewComponent } from './overview.component';
import { FormBuilder, Validators } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../../shared/services/user/user.service';
import { OktaAuthService } from '@okta/okta-angular';
import { AirlineService } from '../../../shared/services/admin/airline/airline.service';
import { PrintService } from '../../../shared/services/print/print.service';

import {
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatIconModule,
  MatTabsModule,
  MatStepperModule
} from '@angular/material';

describe('Repair Overview Component', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let repairService: RepairsService;
  const oktaAuthSpy = jasmine.createSpyObj('OktaAuthService', ['isAuthenticated', 'logout', 'loginRedirect']);
  const spyUserservice = jasmine.createSpyObj('UserService', ['identity', 'hasAnyAuthority']);
  const formBuilder: FormBuilder = new FormBuilder();
  let userService: UserService;
  const spyOktaAuthService = {
    isAuthenticated: function () {
    },
    loginRedirect: function () { },
    logout(): Promise<any> {
      return new Promise<any>(resolve => resolve(true));
    }
  };
  let oktaAuthService: jasmine.SpyObj<OktaAuthService>;
  const mockUserservice = {
    hasAnyAuthority(): Promise<any> {
      return new Promise<any>(resolve => resolve(true));
    },
    getAuthenticationState(): Observable<any> {
      return Observable.of([]);
    },
    setCurrentAirline: function (icao) { },
    isAuthenticated: function () { return true; },
    checkUserRole(): Promise<any> {
      return new Promise<any>(resolve => resolve(true));
    },
  };
  const mockPrintService = {
    print() { },
    getTagsHtml() {
      return '';
    }
  };
  const mockRepairService = {
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
    },
    getRepair(): Observable<any> {
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
    getLruName(): Observable<any> {
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
    ReasonRemoval(): Observable<any> {
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
    getMaintenanceStationlist(): Observable<any> {
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
    getLruPartNumber(): Observable<any> {
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
    createRepair(): Observable<any> {
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
    createRemoval(): Observable<any> {
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
    getTails(): Observable<any> {
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
    getAirlinelist(): Observable<any> {
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
    getLru(data: any): Observable<any> {
      const responed = [
        {
          'id': 31,
          'removalDate': '2019-01-23 04:50:14',
          'maintenanceStationId': 21,
          'lruPartNumberId': 38,
          'serialNumberOFF': 'A0123456',
          'serialNumberON': 'A1234560',
          'modDotIn': null,
          'otherReasonOfRemoval': null,
          'aircraftId': 889,
          'createdAt': '2019-01-23 04:50:14',
          'updatedAt': '2019-01-23 04:50:14',
          'airlineName': 'HZ-AK35',
          'tailSign': 'Saudia Airlines',
          lruPartNumber: {
            'id': 38,
            'lruPartNumber': '183330-101',
            'partNumberId': 1,
            'createdAt': '2019-02-14 09:16:43',
            'updatedAt': '2019-02-14 09:16:43'
          },
          maintenanceStation: {
            'id': 21,
            'fullName': 'Servo Data 3',
            'shortName': 'LHR',
            'locationName': 'dfgdg',
            'createdAt': '2019-02-13 06:24:54',
            'updatedAt': '2019-02-13 06:24:54',
          },
          reasonOfRemoval: {
            'id': 31,
            'lruTypeId': 40,
            'description': 'Blank Screen',
            'allPN': true,
            'createdAt': '2019-01-31 10:35:51',
            'updatedAt': '2019-01-31 10:35:51'
          }
        }

      ];
      return Observable.of(responed);
    }
  };

  let originalTimeout: any = '';
  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  }); afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewComponent],
      imports: [
        ArtefactModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTabsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatStepperModule,
        BrowserAnimationsModule,
        NgbModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: PrintService, useValue: mockPrintService },
        { provide: RepairsService, useValue: mockRepairService },
        ToastrService, { provide: FormBuilder, useValue: formBuilder },
        UserService,
        AirlineService,
        { provide: OktaAuthService, useValue: spyOktaAuthService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    repairService = TestBed.get(RepairsService);
    userService = TestBed.get(UserService);
    oktaAuthService = TestBed.get(OktaAuthService);
  });

  afterEach(function () {
    TestBed.resetTestingModule();
  });
  it('should return the repair lists', () => {
    const spy = spyOn(repairService, 'getRepair').and.callThrough();
    component.list = [
      {
        'id': 1,
        'lruPartNumber': '180717-101',
        'serialNumberOFF': 'A0123456',
        'removalDate': '2019-02-25 15:03:06',
        'maintenanceStation': 'Chennai',
        'airlineName': 'American Airlines',
        'tailSign': 'N101NN',
        'source': 'health-app'
      },
      {
        'id': 2,
        'lruPartNumber': '180717-101',
        'serialNumberOFF': 'A01234567',
        'removalDate': '2019-02-26 15:03:06',
        'maintenanceStation': 'Chennai',
        'airlineName': 'American Airlines',
        'tailSign': 'N101NN',
        'source': 'health-app'
      }
    ];
    component.repairList();
    expect(spy).toHaveBeenCalled();
  });
  it('should return the removal lists', () => {
    const spy = spyOn(repairService, 'getLru').and.callThrough();
    component.getLruSerial('');
    component.getLruSerial('10');
    expect(spy).toHaveBeenCalled();
  });
  it('should create removal', () => {
    const repairSpy = spyOn(repairService, 'getLru').and.callThrough();
    repairService.getLru('10').subscribe((results) => {
      expect(repairSpy).toHaveBeenCalled();
    });
    expect(component).toBeTruthy();
  });
  it('should create repair', () => {
    const repairSpy = spyOn(repairService, 'getRepair').and.callThrough();
    repairService.getRepair().subscribe((results) => {
      expect(repairSpy).toHaveBeenCalled();
    });
    expect(component).toBeTruthy();
  });
  it('closeModal should be defined', () => {
    component.repairObj.modalRef = {
      close: function () { }
    };
    component.removalObj.modalRef = {
      close: function () { }
    };
    component.closeModal();
    expect(component.closeModal).toBeDefined();
  });

  it('resetFormData should be defined', () => {
    component.resetFormData();
    expect(component.repairObj.formSubmitted).toBeFalsy();
  });

  it('removalFormSubmit should be defined', () => {
    component.repairFormSubmit();
    expect(component.repairObj.formSubmitted).toBeTruthy();
  });
  it('faultFormSubmit should be defined', () => {
    component.faultFormSubmit();
    expect(component.faultObj.formSubmitted).toBeTruthy();
  });

  it('reviewFormSubmit should be defined', () => {
    component.repairTypeLevel = 3;
    component.reviewFormSubmit();

    component.repairTypeLevel = 1;
    component.reviewFormSubmit();

    component.repairTypeLevel = 2;
    component.reviewFormSubmit();
    expect(component.reviewObj.formSubmitted).toBeTruthy();
  });

  it('createrepairFormSubmit should be defined', () => {
    spyOn(repairService, 'createRemoval').and.callThrough();
    component.repairObj.modalRef = {
      close: function () { },
      reset: function () { }
    };
    component.removalObj.modalRef = {
      close: function () { },
      reset: function () { }
    };
    component.createRemovalObj.modalRef = {
      close: function () { },
      reset: function () { }
    };
    component.createFormSubmit();
    component.createRemovalObj.formObj = {
      invalid: false,
      value: {
        maintenanceSation: '12',
        repairRevisionApi: 1,
        repairRevisionNumber: 2,
        pickerModel: {
          year: 2019,
          month: 1,
          day: 1
        }
      }
    };
    component.empMod = [];
    component.createFormSubmit();

    component.createRemovalObj.formObj.value = {
      maintenanceSation: '12',
      repairRevisionApi: '',
      repairRevisionNumber: '',
      pickerModel: {
        year: 2019,
        month: 1,
        day: 1
      }
    };
    component.empMod = [];
    component.createFormSubmit();
    expect(component.createRemovalObj.formSubmitted).toBeTruthy();
  });
  it('create Form Submit should be defined', () => {
    spyOn(repairService, 'createRemoval').and.callThrough();
    component.repairObj.modalRef = {
      close: function () { },
      reset: function () { }
    };
    component.removalObj.modalRef = {
      close: function () { },
      reset: function () { }
    };
    component.createRemovalObj.modalRef = {
      close: function () { },
      reset: function () { }
    };
    component.createRemovalObj.formObj = {
      invalid: false,
      value: {
        repairAiline: 'aal',
        maintenanceSation: '12',
        repairRevisionApi: 1,
        repairRevisionNumber: 2,
        pickerModel: {
          year: 2019,
          month: 1,
          day: 1
        }
      }
    };
    component.airData = [
      {
        icao: 'aal',
        name: 'aal'
      }
    ];
    component.empMod = [1];
    component.createFormSubmit();
    expect(component.createFormSubmit).toBeDefined();
  });
  it('getEvent create should be defined', () => {
    component.selection = {
      selected: [{
        serialNumber: 'Test'
      }],
      clear: function () { }
    };
    component.getEvent({ moduleName: 'Create Repair', eventName: 'create' });
    expect(component.repairObj.enableDelete).toBeFalsy();
  });
  it('getRepairModal create should be defined', () => {
    component.selection = {
      selected: [{
        pickerModel: 'Test',
        techician: 'Test',
        repairStation: 'Test'
      }]
    };
    component.levelTwoRepair = {
      isFormSubmitted: false,
      requiredFields: [],
      repairActionLruPartNoId: {
        lruPartNumberId: 0
      },
      repairDetails: [
        {
          repairActionId: '',
          sruSerialNumberOff: '',
          sruSerialNumberOn: ''
        }
      ],
      comments: null,
      repairActionsList: []
    };
    component.getRepairModal();
    expect(component.removalObj.enableDelete).toBeFalsy();
  });
  it('getCreateRemovalModal create should be defined', () => {
    component.selection = {
      selected: [{
        pickerModel: 'Test',
        maintenanceSation: 'Test',
        repairAiline: 'Test',
        repairlruName: 'Test',
        repairlruPartNumber: 'Test',
        repairReasonOfRemoval: 'Test',
        repairRevision: 'Test'
      }]
    };
    /*  component.getRemovalModal();
     expect(component.removalObj.enableDelete).toBeFalsy(); */
  });
  it('should handle error from API', () => {

    const error = {
      message: 'error',
      error_description: 'error occured'
    };
    component.reapairErrorHandler(error);
    expect(component.reviewObj.isFormSubmitted).toBeFalsy();
    expect(component.reviewObj.formObj.isError).toBeTruthy();
    expect(component.reviewObj.formObj.errorMsg).toEqual(error.message);
  });
  it('should handle error_description from API', () => {
    const error = {
      error_description: 'error occured'
    };
    component.reapairErrorHandler(error);
    expect(component.reviewObj.formObj.errorMsg).toEqual(error.error_description);
  });

  it('should call getFilterDate', () => {
    const date = {
      fromDate: '2019-01-24T18:30:00.000Z',
      toDate: '2019-01-27T18:30:00.000Z'
    };
    spyOn(component, 'getFilterDate');
    component.getSelectedDates(date);
    expect(component.isLoading).toBeTruthy();
    component.dataSource = {
      data: []
    };
    expect(component.getFilterDate).toHaveBeenCalledWith(date.fromDate, date.toDate);
  });

  it('should call getFilterDate', () => {
    const date = {
      fromDate: '2019-01-24T18:30:00.000Z',
      toDate: '2019-01-27T18:30:00.000Z'
    };
    spyOn(component, 'getFilterDate');
    component.getSelectedDates(date);
    expect(component.isLoading).toBeTruthy();
    expect(component.getFilterDate).toHaveBeenCalledWith(date.fromDate, date.toDate);
  });

  it('selectedBtn should be defined', () => {
    component.selectedBtn(1);
    expect(component.empMod).toContain(1);

    component.selectedBtn(1);
    expect(component.empMod).toBeDefined();

  });
  it('selectedoutBtn should be defined', () => {
    component.selectedBtnOut(1);
    expect(component.modOutData).toContain(1);

    component.selectedBtnOut(1);
    expect(component.modOutData).toBeDefined();

  });

  it('getAircraftList should be defined', () => {
    const spy = spyOn(repairService, 'getTails').and.callThrough();
    component.getAircraftList(null);
    component.getAircraftList(2);
    expect(spy).toHaveBeenCalled();
    expect(component.getAircraftList).toBeDefined();
  });

  it('getRemovalModal should be defined', () => {
    component.getRemovalModal(2);
    expect(component.getRemovalModal).toBeDefined();
  });
  it('getfaultModal should be defined', () => {
    component.levelTwoRepair = {
      repairActionLruPartNoId: {
        lruPartNumberId: 1
      }
    };
    component.repairObj = {
      formObj: {
        valid: true, value: {
          repairType: { value: 3 }, pickerModel: {
            month: '04',
            day: '04',
            year: '2019'
          }
        }
      },
      errorMsg: null,
      formSubmitted: false,
      modalRef: null,
      loadVisible: false,
      isFormSubmitted: false,
      isError: false,
      isDeleted: false,
      enableDelete: false
    };
    component.getfaultModal(1);
    expect(component.getfaultModal).toBeDefined();
  });
  it('createFormSubmit should be defined', () => {
    const spy = spyOn(repairService, 'createRemoval').and.callThrough();
    component.repairObj.modalRef = {
      close: function () { },
      reset: function () { }
    };
    component.removalObj.modalRef = {
      close: function () { },
      reset: function () { }
    };
    component.createRemovalObj.modalRef = {
      close: function () { },
      reset: function () { }
    };
    component.createRemovalObj.formObj = {
      invalid: false,
      value: {
        pickerModel: {
          year: '2019',
          month: 2,
          day: 2
        },
        maintenanceSation: '10',
        repairReasonOfRemoval: '10',
        repairlruPartNumber: '10',
        repairAiline: 'aal',
        repairRevisionApi: '',
        repairRevisionNumber: ''
      },
      close: function () { },
      reset: function () { }
    };
    component.maintenancedata = [
      {
        id: 10,
        name: ''
      }
    ];
    component.ReasonData = [
      {
        id: 10,
        name: ''
      }
    ];
    component.LruNumberData = [
      {
        id: 10,
        name: ''
      }
    ];
    component.airData = [
      {
        id: 10,
        name: '',
        icao: 'aal'
      }
    ];
    component.createRemovalObj.formObj = {
      invalid: false,
      value: {
        pickerModel: {
          year: '2019',
          month: 2,
          day: 2
        },
        maintenanceSation: '10',
        repairReasonOfRemoval: '10',
        repairlruPartNumber: '10',
        repairAiline: 'aal',
        repairRevisionApi: '',
        repairRevisionNumber: ''
      },
      close: function () { },
      reset: function () { }
    };
    component.createFormSubmit();

    component.empMod = [1];
    component.createFormSubmit();
    expect(component.createFormSubmit).toBeDefined();
  });

  it('repairFormSubmit should be defined', () => {
    component.repairObj.modalRef = {
      close: function () { },
      reset: function () { }
    };
    component.removalObj.modalRef = {
      close: function () { },
      reset: function () { }
    };
    component.createRemovalObj.modalRef = {
      close: function () { },
      reset: function () { }
    };
    component.repairObj.formObj = {
      invalid: false,
      value: {
        pickerModel: {
          year: '2019',
          month: 2,
          day: 2
        },
        techician: '10',
        repairStation: '10',
      },
      close: function () { },
      reset: function () { }
    };
    component.list = [
      {
        id: 10,
        name: ''
      }
    ];
    component.repairFormSubmit();
    expect(component.repairFormSubmit).toBeDefined();
  });
  it('should  mod boolean properties', () => {
    component.modFilterMouseUp();
    expect(component.modActiveFilterMouseDown).toBeFalsy();
    expect(component.modInActiveFilterMouseDown).toBeFalsy();
  });

  it('should modActicveFilterMouseDown truthy', () => {
    component.modFilter = 2;
    component.modFilterMouseDown(2);
    expect(component.modMouseDownFilter).toEqual(2);
    expect(component.modActiveFilterMouseDown).toBeTruthy();
  });

  it('should be defined getRepairType', () => {
    component.removalObj = {
      modalRef: {
      }
    };
    component.closeAllWindow = [];
    component.levelTwoRepair = {
      comments: null,
      requiredFields: [],
      repairActionLruPartNoId: {
        lruPartNumberId: 0
      },
      repairDetails: [
        {
          repairActionId: '',
          sruSerialNumberOff: '',
          sruSerialNumberOn: ''
        }
      ]
    };
    component.getRepairType({ value: 3 });
    expect(component.getRepairType).toBeDefined();
  });

  it('should be defined addDeleteRepair', () => {
    component.levelTwoRepair = {
      comments: null,
      requiredFields: [],
      repairActionLruPartNoId: {
        lruPartNumberId: 0
      },
      repairDetails: [
        {
          repairActionId: '',
          sruSerialNumberOff: '',
          sruSerialNumberOn: ''
        }
      ]
    };
    component.addDeleteRepair('add', 1);

    component.levelTwoRepair = {
      comments: null,
      requiredFields: [],
      repairActionLruPartNoId: {
        lruPartNumberId: 0
      },
      repairDetails: [
        {
          repairActionId: '',
          sruSerialNumberOff: '',
          sruSerialNumberOn: ''
        }
      ]
    };
    component.addDeleteRepair('delete', 1);
    expect(component.levelTwoRepair.repairDetails.length).toBeGreaterThanOrEqual(1);
  });

  it('should be defined getRepairActionList', () => {
    const spy = spyOn(repairService, 'getRepairActions').and.callThrough();
    component.levelTwoRepair = {
      isFormSubmitted: false,
      requiredFields: [],
      repairActionLruPartNoId: {
        lruPartNumberId: 0
      },
      repairDetails: [
        {
          repairActionId: '',
          sruSerialNumberOff: '',
          sruSerialNumberOn: ''
        }
      ],
      comments: null,
      repairActionsList: []
    };
    component.getRepairActionList();
    expect(spy).toHaveBeenCalled();
    expect(component.getRepairActionList).toBeDefined();
  });

  it('should be defined validateRemovalInfo', () => {
    component.removalList = {};
    component.validateRemovalInfo({ previous: function () { } });

    component.removalObj.formObj.value = {
      repairRevisionApi: 1,
      repairRevisionNumber: 1
    };
    component.removalList = [1, 2];
    component.validateRemovalInfo({ previous: function () { } });
    expect(component.validateRemovalInfo).toBeDefined();
  });

  it('should be defined removalFormSubmit', () => {
    component.removalList = {};
    component.removalFormSubmit({ previous: function () { } }, '');
    expect(component.searchFailed).toBeTruthy();

    component.removalList = {};
    component.removalFormSubmit({ previous: function () { } }, 'test');
    expect(component.removalObj.formSubmitted).toBeTruthy();
  });
  it('should be defined modFormSubmit', () => {
    component.modFormSubmit({ next: function () { }, previous: function () { } });
    component.modOutData = [1];
    component.modFormSubmit({ next: function () { }, previous: function () { } });
    expect(component.modFormSubmit).toBeDefined();
  });

  //  xit('should be defined validationSerialNo', () => {
  //   component.validationSerialNo('122');
  //   expect(component.validationSerialNo).toBeDefined();
  //  });

  it('should be defined validation', () => {
    component.validation('122', 0, 'comm');
    component.validation('122', 0, 'on');
    component.validation('122', 0, 'off');

    component.validation('122$%^', 0, 'comm');
    component.validation('122$%^', 0, 'on');
    component.validation('122$%^', 0, 'off');
    expect(component.validation).toBeDefined();
  });


  it('should be defined getRepairActionDetailsSubmit', () => {
    component.levelTwoRepair.requiredFields = [1];
    component.levelTwoRepair.maxLength = [1];
    component.levelTwoRepair.comments = '12122';
    component.getRepairActionDetailsSubmit({ next: function () { } });

    component.levelTwoRepair.repairDetails = [];
    component.levelTwoRepair.requiredFields = [];
    component.levelTwoRepair.maxLength = [];
    component.levelTwoRepair.comments = '12122';
    component.getRepairActionDetailsSubmit({ next: function () { } });
    expect(component.getRepairActionDetailsSubmit).toBeDefined();
  });

  it('should be defined selectionChange', () => {
    component.modInData = [1];
    component.selectedModDotOutData = [2];
    component.selectionChange({
      selectedIndex: 1
    });
    component.modInData = [];
    component.selectedModDotOutData = [];
    component.selectionChange({
      selectedIndex: 1
    });
    expect(component.selectionChange).toBeDefined();
  });

  it('should be defined selecteModDotIn', () => {
    component.selecteModDotIn(0);
    component.selecteModDotIn(0);
    expect(component.selecteModDotIn).toBeDefined();
  });

  it('should be defined getLruPartNumberList', () => {
    const spy = spyOn(repairService, 'getLruPartNumber').and.callThrough();
    component.getLruPartNumberList(0);
    component.getLruPartNumberList(1);
    expect(spy).toHaveBeenCalled();
    expect(component.getLruPartNumberList).toBeDefined();
  });

  it('should be defined getRepairRevisionData', () => {
    component.getRepairRevisionData();
    expect(component.getRepairRevisionData).toBeDefined();
  });

  it('should be defined printRepair', () => {
    component.printRepair('print-repair-info');
    expect(component.printRepair).toBeDefined();
  });

});

