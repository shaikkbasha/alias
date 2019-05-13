import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, RouterOutlet, Router, Routes } from '@angular/router';
import { RepairManagementComponent } from './repair-management.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../shared/services/user/user.service';
import { Observable, of } from 'rxjs';
import { OktaAuthService } from '@okta/okta-angular';
import { AirlineService } from '../../shared/services/admin/airline/airline.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AccessDeniedComponent } from '../error/access-denied/access-denied.component';

describe('RepairManagementComponent', () => {
  let component: RepairManagementComponent;
  let fixture: ComponentFixture<RepairManagementComponent>;
  let vOktaAuthServiceSpy: jasmine.SpyObj<OktaAuthService>;
  let userService: UserService;
  const router = {
    navigate: function() {}
  };
  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('OktaAuthService', ['getUser']);
    TestBed.configureTestingModule({
      declarations: [ RepairManagementComponent, AccessDeniedComponent ],
      imports: [
        RouterModule,
        RouterTestingModule.withRoutes([
          {
              path: 'access-denied',
              component: AccessDeniedComponent
          }
        ]),
        HttpClientModule
      ],
      providers: [
        AirlineService,
        HttpClientModule,
        { provide: OktaAuthService, useValue: spy },
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    vOktaAuthServiceSpy = TestBed.get(OktaAuthService);
    fixture = TestBed.createComponent(RepairManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.get(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('isActive method should be defined', () => {
    component.isActive(['repair', 'repairs']);
    expect(component.isActive).toBeDefined();
  });

});
