/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { AirlinesComponent } from './airlines.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HasAnyAuthorityDirective } from '../../../shared/directives/auth/has-any-authority.directive';
import { SectionTitleComponent } from './../../../shared/modules/section-title/section-title.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AirlineService } from '../../services/admin/airline/airline.service';
import { LoadingComponent } from '../loading/loading-component';
import { ArtActionToolBarComponent } from '../artactiontoolbar/artactiontoolbar.component';
describe('AirlinesComponent', () => {
  let component: AirlinesComponent;
  let fixture: ComponentFixture<AirlinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, FormsModule, Ng2SearchPipeModule],
      declarations: [
        AirlinesComponent,
        HasAnyAuthorityDirective,
        SectionTitleComponent,
        LoadingComponent,
        ArtActionToolBarComponent
      ],
      providers: [
        AirlineService,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});

