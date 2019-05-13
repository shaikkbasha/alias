import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ConnectivityService } from '../../shared/services/airline-flights/connectivity/connectivity.service';
import { ArtefactModule } from '../../shared/artefact.module';
import { FlightsComponent } from './flights.component';
import { Observable } from 'rxjs';

describe('FlightsComponent', () => {
  let component: FlightsComponent;
  let fixture: ComponentFixture<FlightsComponent>;
  let connectivityService: ConnectivityService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ArtefactModule
      ],
      providers: [
        ConnectivityService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsComponent);
    component = fixture.componentInstance;
    connectivityService = TestBed.get(ConnectivityService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isActive should be defined', () => {
    component.isFlightActive([]);
    expect(component.isFlightActive).toBeDefined();
  });

  it('isDropdownItemActive should be defined', () => {
    component.isFlightDropdownItemActive([['/flights']]);
    expect(component.isFlightDropdownItemActive).toBeDefined();
  });
});
