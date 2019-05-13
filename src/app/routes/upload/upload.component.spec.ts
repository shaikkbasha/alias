import {
    async,
    ComponentFixture,
    TestBed,
    inject,
    getTestBed
} from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
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
    MatSortModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { ArtefactModule } from '../../shared/artefact.module';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { OktaAuthService } from '@okta/okta-angular';
import { UploadComponent } from './upload.component';
import { NgPipesModule } from 'ngx-pipes';


describe('UploadComponent', () => {
    let component: UploadComponent;
    let fixture: ComponentFixture<UploadComponent>;

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
            declarations: [UploadComponent],
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
                NgPipesModule
            ],
            providers: [
                { provide: OktaAuthService, useValue: mockOktaAuthService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(function () {
        TestBed.resetTestingModule();
    });

    it('should create UploadComponent', () => {
        expect(component).toBeTruthy();
    });

    it('file over base file upload', () => {
        component.fileOverBase('abc');
        expect(component.fileOverBase).toBeDefined();
    });

    it('get access token ', () => {
        component.getToken();
        expect(component.getToken).toBeDefined();
    });

    it('onSearchChange ', () => {
        component.onSearchChange('');
        expect(component.onSearchChange).toBeDefined();
    });


    it('get param method when upload', () => {
        const data = { moduleName: 'upload', eventName: 'upload' };
        component.getEvent(data);
        expect(component.uploader.queue.length).toBe(0);
    });

    it('get param method when cancel', () => {
        const data = { moduleName: 'upload', eventName: 'cancel' };
        component.getEvent(data);
        expect(component.dataSource.length).toBe(0);
    });

    it('get param method when delete', () => {
        const data = { moduleName: 'upload', eventName: 'delete' };
        component.getEvent(data);
        expect(component.dataSource.length).toBe(0);
    });

    it('get param method when nothing is done', () => {
        const data = { moduleName: 'upload', eventName: '' };
        component.getEvent(data);
        expect(component.dataSource.length).toBe(0);
    });

    it('clearData', () => {
        component.clearData('');
        expect(component.clearData).toBeDefined();
    });
});
