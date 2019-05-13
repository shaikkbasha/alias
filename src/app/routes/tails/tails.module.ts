import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TailsComponent } from './tails.component';
import { FlightsComponent } from './flights/flights.component';
import { TailOverviewComponent } from './overview/tails-overview.component';
import { TailTimelineComponent } from './timeline/tails-timeline.component';
import { ArtefactModule } from '../../shared/artefact.module';
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

const routes: Routes = [

  {
    path: '',
    component: TailsComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full'},
      { path: 'overview', component: TailOverviewComponent},
      { path: 'timeline', component: TailTimelineComponent},
      { path: 'flight-legs', component: FlightsComponent}
    ]
  }
];

@NgModule({
  declarations: [
    TailsComponent,
    FlightsComponent,
    TailOverviewComponent,
    TailTimelineComponent
  ],
  imports: [
    CommonModule,
    ArtefactModule,
    RouterModule.forChild(routes),
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
  ],
  exports: [
    CommonModule,
    ArtefactModule,
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
  ]
})
export class TailsModule { }
