import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';
import { BootstrapModule } from './bootstrap.module';

import { ArtupdatedtimeComponent } from './modules/time/artupdatedtime.component';
import { ArtdatepickerComponent } from './modules/datepicker/artdatepicker.component';
import { FilterButtonComponent } from './modules/filterbutton/filterbutton.component';
import { ArtfocusedobjectheaderComponent } from './modules/artfocusedobjectheader/artfocusedobjectheader.component';
import { ArtActionToolBarComponent } from './modules/artactiontoolbar/artactiontoolbar.component';
import { DynamicFormComponent } from './modules/dynamicform/dynamic-form.component';
import { FormComponent } from './modules/dynamicform/form.component';
import { LabelValueComponent } from './modules/label-value/label-value.component';
import { SectionTitleComponent } from './modules/section-title/section-title.component';
import { ArtKpiCardComponent } from './modules/art-kpi-card/art-kpi-card.component';
import { FlightDetailsComponent } from './modules/flight-details/flight-details.component';
import { ArtLopaComponent } from './modules/art-lopa/art-lopa.component';
import { ConfigurationComponent } from './modules/configuration/configuration.component';
import { AirlinesComponent } from './modules/airlines/airlines.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoadingComponent } from './modules/loading/loading-component';
@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BootstrapModule,
    TreeModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    ArtupdatedtimeComponent,
    ArtdatepickerComponent,
    FilterButtonComponent,
    ArtfocusedobjectheaderComponent,
    ArtActionToolBarComponent,
    ArtKpiCardComponent,
    FormComponent,
    DynamicFormComponent,
    LabelValueComponent,
    SectionTitleComponent,
    FlightDetailsComponent,
    ArtLopaComponent,
    ConfigurationComponent,
    AirlinesComponent,
    LoadingComponent
  ],
  exports: [
    ArtupdatedtimeComponent,
    ArtdatepickerComponent,
    FilterButtonComponent,
    ArtfocusedobjectheaderComponent,
    ArtActionToolBarComponent,
    ArtKpiCardComponent,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BootstrapModule,
    TreeModule,
    FormComponent,
    DynamicFormComponent,
    LabelValueComponent,
    SectionTitleComponent,
    FlightDetailsComponent,
    ArtLopaComponent,
    ConfigurationComponent,
    AirlinesComponent,
    LoadingComponent
  ]
})
export class ArtefactModule { }
