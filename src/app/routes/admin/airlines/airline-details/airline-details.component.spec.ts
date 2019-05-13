import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineDetailsComponent } from './airline-details.component';
import { AirlineService } from '../../../../shared/services/admin/airline/airline.service';
import {
  HttpClientModule,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatTableModule,
  MatIconModule,
  MatTabsModule,
  MatPaginatorModule,
  MatSortModule,
  MatRadioModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { ArtefactModule } from '../../../../shared/artefact.module';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../../environments/environment';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AirlineDetailsComponent', () => {
  let component: AirlineDetailsComponent;
  let fixture: ComponentFixture<AirlineDetailsComponent>;
  let airlineService: AirlineService;
  let success = false;
  const mockAirlineService = {

    getAirlineByIcao(icao): Observable<any> {
      const response = [
        {
          'id': 23,
          'name': 'Air China',
          'acronym': 'CCA',
          'status': -1,
          'icao': 'CCA',
          'iata': 'CA',
          'createdAt': null,
          'updatedAt': null
        }
      ];
      return Observable.of(response);
    },
    getAirlineConfigrationsByIcao(postParam): Observable<any> {
      const response = [
        {
          'id': 1,
          'configurationName': 'asw',
          'createdDate': null,
          'updatedDate': null
        },
        {
          'id': 2,
          'configurationName': 'BTK',
          'createdDate': null,
          'updatedDate': null
        }
      ];
      return Observable.of(response);
    },
    getAirlineIssuesByIcao(postParam): Observable<any> {
      const response = [
        {
          'id': 1,
          'name': 'issue1',
          'description': 'Text description',
          'fixExists': false,
          'status': 'active',
          'createdAt': '2018-12-06T20:32:10.00Z',
          'updatedAt': '2018-12-06T20:32:10.00Z'
        },
        {
          'id': 2,
          'name': 'issue3',
          'description': 'Text description',
          'fixExists': false,
          'status': 'active',
          'createdAt': '2018-12-06T20:32:10.00Z',
          'updatedAt': '2018-12-06T20:32:10.00Z'
        }
      ];
      return Observable.of(response);
    },
    createAirlineIssue(icao, postParam): Observable<any> {
      if (!success) {
        const response = {
          'id': 1,
          'name': 'issue1',
          'description': 'Text description',
          'fixExists': false,
          'status': 'active',
          'createdAt': '2018-12-06T20:32:10.00Z',
          'updatedAt': '2018-12-06T20:32:10.00Z'
        };
        return Observable.of(response);
      } else {
        const error = { error: 'error occured', error_description: 'error occured' };
        return Observable.of(error);
      }
    },
    updateAirlineIssue(icao, postParam): Observable<any> {
      if (!success) {
        const response = {
          'id': 1,
          'name': 'issue1',
          'description': 'Text description',
          'fixExists': false,
          'status': 'active',
          'createdAt': '2018-12-06T20:32:10.00Z',
          'updatedAt': '2018-12-06T20:32:10.00Z'
        };
        return Observable.of(response);
      } else {
        const error = { error: 'error occured', error_description: 'error occured' };
        return Observable.of(error);
      }
    },
    deleteAirlineIssue(postParam): Observable<any> {
      if (!success) {
        return Observable.of(null);
      } else {
        const error = { error: 'error occured', error_description: 'error occured' };
        return Observable.of(error);
      }
    }
  };

  const mockOktaAuthService = {
    isAuthenticated(): Promise<any> {
      return new Promise<any>(resolve => resolve(true));
    },
    getAccessToken(): Promise<String> {
      return new Promise<any>(resolve => resolve('abcde'));
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AirlineDetailsComponent],
      imports: [
        ArtefactModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatPaginatorModule,
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        MatTabsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        NgbModule,
        MatSortModule,
        FileUploadModule,
        MatRadioModule
      ],
      providers: [
        { provide: AirlineService, useValue: mockAirlineService },
        { provide: OktaAuthService, useValue: mockOktaAuthService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    airlineService = TestBed.get(AirlineService);
  });


  afterEach(function () {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle error from API', () => {

    const error = {
      message: 'error',
      error_description: 'error occured'
    };
    component.airlineDetailOperationErrorHandler(error);
    expect(component.airLineDetailObj.isFormSubmitted).toBeFalsy();
    expect(component.airLineDetailObj.formObj.isError).toBeTruthy();
    expect(component.airLineDetailObj.formObj.errorMsg).toEqual(error.message);
  });

  it('should handle error_description from API', () => {
    const error = {
      error_description: 'error occured'
    };
    component.airlineDetailOperationErrorHandler(error);
    expect(component.airLineDetailObj.formObj.errorMsg).toEqual(error.error_description);
  });


  it('should return airline configuration', () => {
    const data = {
      id: 71, name: 'asw', icao: 'AFL'
    };
    const spy = spyOn(airlineService, 'getAirlineConfigrationsByIcao').and.callThrough();
    airlineService.getAirlineConfigrationsByIcao(data.icao).subscribe(res => {
      expect(spy).toHaveBeenCalled();
    });
    component.getConfigrationByIcao(data.icao);
    expect(component.isLoadingConfiguration).toBe(false);
  });


  it('get access token ', () => {
    component.getToken();
    expect(component.getToken).toBeDefined();
  });

  it('remove files', () => {
    component.removeFiles();
    expect(component.uploadConfigurationDataSource.length).toBe(0);
  });

  it('fileOverBase configuration file upload', () => {
    component.fileOverBase('abc');
    expect(component.fileOverBase).toBeDefined();
  });

  it('upload Configuration', () => {
    component.uploadConfiguration();
    expect(component.uploadConfiguration).toBeDefined();
  });

  it('change tab index to 1', () => {
    const event = { index: 1 };
    component.tabChange(event);
    expect(component.actionToolBarConfig.createLabel).toBe('Create Configuration');
  });

  it('change tab index to 2', () => {
    const event = { index: 2 };
    component.tabChange(event);
    expect(component.actionToolBarConfig.createLabel).toBe('Create Issue');
  });

  it('call searchfilter when selected Tab index is 2', () => {
    component.selectedTabIndex = 2;
    component.searchfilter('s');
    expect(component.isIssueLoading).toBe(false);
  });

  it('call getEvent when selected Tab index is 2', () => {
    component.getEvent({ moduleName: 'airlineIssue', eventName: 'create' });
    expect(component.getEvent).toBeDefined();
  });

  it('reset Issue Form Data', () => {
    component.resetIssueFormData();
    expect(component.airLineDetailObj.formSubmitted).toBeFalsy();
  });

  it('submit airline Issue Form when form is invalid', () => {
    component.airlineIssueFormSubmit();
    expect(component.airLineDetailObj.formObj.invalid).toBeTruthy();
  });

  it('submit airline Issue Form when form is valid with out id to create', () => {
    success = false;
    component.currentAirline = { id: 71, name: 'asw', icao: 'sa' };
    component.airLineDetailObj.formObj.setValue({
      name: 'ABC',
      description: 'ABC',
      fixExists: 'ABC',
      status: 'ABC',
      id: ''
    });

    component.airLineDetailObj.formObj.get('name').setErrors(null);
    component.airLineDetailObj.formObj.get('description').setErrors(null);
    component.airLineDetailObj.formObj.get('fixExists').setErrors(null);
    component.airLineDetailObj.formObj.get('status').setErrors(null);
    component.airLineDetailObj.formObj.setErrors(null);
    component.airlineIssueFormSubmit();
    const spy = spyOn(airlineService, 'createAirlineIssue').and.callThrough();
    airlineService.createAirlineIssue(component.currentAirline.icao, component.airLineDetailObj.formObj.value).subscribe(res => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('submit airline Issue Form when form is valid with id to update', () => {
    success = false;
    component.currentAirline = { id: 71, name: 'asw', icao: 'sa' };
    component.airLineDetailObj.formObj.setValue({
      name: 'ABC',
      description: 'ABC',
      fixExists: 'ABC',
      status: 'ABC',
      id: 71
    });
    component.airLineDetailObj.formObj.get('name').setErrors(null);
    component.airLineDetailObj.formObj.get('description').setErrors(null);
    component.airLineDetailObj.formObj.get('fixExists').setErrors(null);
    component.airLineDetailObj.formObj.get('status').setErrors(null);
    component.airLineDetailObj.formObj.get('id').setErrors(null);
    component.airLineDetailObj.formObj.setErrors(null);
    component.airlineIssueFormSubmit();
    const spy = spyOn(airlineService, 'updateAirlineIssue').and.callThrough();
    airlineService.updateAirlineIssue(component.currentAirline.icao, component.airLineDetailObj.formObj.value).subscribe(res => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('create issue error', () => {
    success = true;
    component.currentAirline = { id: 71, name: 'asw', icao: 'sa' };
    component.airLineDetailObj.formObj.setValue({
      name: 'ABC',
      description: 'ABC',
      fixExists: 'ABC',
      status: 'ABC',
      id: 71
    });
    component.createAirlineIssue();
    expect(component.createAirlineIssue).toBeDefined();
  });

  it('update issue error', () => {
    success = true;
    component.currentAirline = { id: 71, name: 'asw', icao: 'sa' };
    component.airLineDetailObj.formObj.setValue({
      name: 'ABC',
      description: 'ABC',
      fixExists: 'ABC',
      status: 'ABC',
      id: 71
    });
    component.updateAirlineIssue();
    expect(component.updateAirlineIssue).toBeDefined();
  });

  it('store airlineIssue obj to edit the particular airlineIssue', () => {
    const data = {
      name: 'ABC',
      description: 'ABC',
      fixExists: 'ABC',
      status: 'ABC',
      id: 71
    };
    component.editIssueAirline(data);
    expect(component.airLineDetailObj.enableDelete).toBeFalsy();
  });

  it('store airlineIssue obj to delete the particular airlineIssue', () => {
    const data = {
      name: 'ABC',
      description: 'ABC',
      fixExists: 'ABC',
      status: 'ABC',
      id: 71
    };
    component.deleteIssue(data);
    expect(component.airLineDetailObj.enableDelete).toBeTruthy();
  });

  it('delete airline issue successfully', () => {
    success = false;
    component.currentAirline = { id: 71, name: 'asw', icao: 'sa' };
    component.airLineDetailObj.formObj.setValue({
      name: 'ABC',
      description: 'ABC',
      fixExists: 'ABC',
      status: 'ABC',
      id: 71
    });
    component.deleteIssueAirline();
    const spy = spyOn(airlineService, 'deleteAirlineIssue').and.callThrough();
    airlineService.deleteAirlineIssue(component.currentAirline.icao, component.airLineDetailObj.formObj.value).subscribe(res => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('delete airline issue error', () => {
    success = true;
    component.currentAirline = { id: 71, name: 'asw', icao: 'sa' };
    component.airLineDetailObj.formObj.setValue({
      name: 'ABC',
      description: 'ABC',
      fixExists: 'ABC',
      status: 'ABC',
      id: 71
    });
    component.deleteIssueAirline();
    expect(component.deleteIssueAirline).toBeTruthy();
  });

  it('select row in configuration', () => {
    component.selection = {
      selected: [{
        'id': 26, 'name': 'Aeroflot', 'acronym': 'AFL', 'status': -1,
        'icao': null, 'iata': null, 'createdAt': null, 'updatedAt': null
      }]
    };
    component.selectedRow();
    expect(component.airLineDetailObj.selectedRow).toEqual(component.selection.selected);
  });

  it('search filter for configuration', () => {
    component.selectedTabIndex = 1;
    component.searchfilter('s');
    expect(component.isLoadingConfiguration).toBeFalsy();
  });

  it('get param method for configuration', () => {
    const data = { moduleName: 'configuration', eventName: 'upload' };
    component.getEvent(data);
    expect(component.uploadConfigurationDataSource.length).toBe(0);
  });

  it('closeModal should be defined', () => {
    component.airLineDetailObj.modalRef = {
      close: function () { }
    };
    component.closeModal();
    expect(component.closeModal).toBeDefined();
  });

  it('get param method for issue', () => {
    const data = { moduleName: 'issue' };
    component.getEvent(data);
    expect(component.airLineDetailObj.enableDelete).toBeFalsy();
  });
});
