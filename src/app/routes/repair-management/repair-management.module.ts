import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairManagementComponent } from './repair-management.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArtefactModule } from '../../shared/artefact.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BootstrapModule } from '../../shared/bootstrap.module';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import {
  MatPaginatorModule, MatButtonModule, MatSortModule, MatTableModule,
  MatTabsModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule, MatStepperModule,
  MatCardModule, MatFormFieldModule, MatInputModule, MatSort, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule
} from '@angular/material';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { onAuthorizationRequired, onAuthRequired } from '../routes';
import { AuthGuard } from '../../shared/okta/auth.guard';
import { RemovalComponent } from './removal/removal.component';
import { OverviewComponent } from './overview/overview.component';
import { RepairsComponent } from './repairs/repairs.component';
import { ReportComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: '',
    component: RepairManagementComponent,
    canActivate: [AuthGuard],
    data: {
      onAuthorizationRequired,
      authorities: ['admins']
    },
    children: [
      { path: '', redirectTo: 'overview' },
      { path: 'overview', component: OverviewComponent },
      { path: 'removals', component: RemovalComponent },
      { path: 'repairs', component: RepairsComponent },
      { path: 'reports', component: ReportComponent },
    ],
  }
];

@NgModule({
  declarations: [RepairManagementComponent, RemovalComponent, OverviewComponent, RepairsComponent, ReportComponent],
  imports: [
    RouterModule.forChild(routes),
    BootstrapModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatStepperModule,
    MatIconModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ArtefactModule,
    ChartModule
  ],
  exports: [
    RouterModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatStepperModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ChartModule
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting] }
  ]
})
export class RepairManagementModule { }
