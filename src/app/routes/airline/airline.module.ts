import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootstrapModule } from '../../shared/bootstrap.module';
import { AirlineOverviewComponent } from './overview/airline-overview.component';
import { AirlineFlightsComponent } from './flights/airline-flights.component';
import { AirlineComponent } from './airline/airline.component';
import { AirlineTailsComponent } from './tails/airline-tails.component';
import { AirlineOffloadsComponent } from './offloads/airline-offloads.component';
import { AirlineCoverageComponent } from './coverage/airline-coverage.component';
import { SharedModule } from '../../shared/shared.module';
import {NgPipesModule} from 'ngx-pipes';
import { CustomPipesModule } from 'ngx-custom-pipes';
import {MatRadioModule} from '@angular/material/radio';
import { UserRoleAuthGuard } from '../../shared/guards/user-role-access/user-role-auth.guard';
import { AirlineScoresComponent } from './scores/airline-scores.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import { ArtefactModule } from '../../shared/artefact.module';
import { TvPerformanceFlightsComponent } from './tv-performance-flights/tv-performance-flights.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
const routes: Routes = [

  {
    path: '',
    component: AirlineComponent,
    canActivateChild: [ UserRoleAuthGuard ],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full'},
      { path: 'overview', component: AirlineOverviewComponent},
      { path: 'flights', component: AirlineFlightsComponent},
      { path: 'tails', component: AirlineTailsComponent},
      { path: 'offloads', component: AirlineOffloadsComponent },
      { path: 'coverage', component: AirlineCoverageComponent },
      { path: 'scores', component: AirlineScoresComponent },
      { path: 'tv-performance', component: TvPerformanceFlightsComponent}
    ]
  }
];

@NgModule({
  imports: [
    MatRadioModule,
    RouterModule.forChild(routes),
    BootstrapModule,
    SharedModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ArtefactModule,
    NgPipesModule,
    CustomPipesModule,
    ChartModule
  ],
  declarations: [
    AirlineComponent,
    AirlineOverviewComponent,
    AirlineFlightsComponent,
    AirlineTailsComponent,
    AirlineOffloadsComponent,
    AirlineCoverageComponent,
    TvPerformanceFlightsComponent,
    AirlineScoresComponent
  ],
  exports: [
    RouterModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    NgPipesModule,
    CustomPipesModule,
    MatRadioModule
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting] }
  ]
})
export class AirlineModule { }
