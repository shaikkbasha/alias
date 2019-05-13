import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArtKpiCardComponent } from './art-kpi-card.component';
import {LoadingComponent} from '../loading/loading-component';
describe('ArtCardComponent', () => {
  let component: ArtKpiCardComponent;
  let fixture: ComponentFixture<ArtKpiCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ ArtKpiCardComponent, LoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtKpiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
