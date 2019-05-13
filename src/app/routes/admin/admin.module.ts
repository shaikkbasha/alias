import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminStationsComponent } from './stations/admin-stations.component';
import { BootstrapModule } from '../../shared/bootstrap.module';
import { Routes, RouterModule } from '@angular/router';
import {
  MatPaginatorModule, MatButtonModule, MatSortModule, MatTableModule,
  MatTabsModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule,
  MatCardModule, MatFormFieldModule, MatInputModule, MatSort
} from '@angular/material';
import { AdminProductsComponent } from './products/admin-products.component';
import { AdminAirlinesComponent } from './airlines/admin-airlines.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArtefactModule } from '../../shared/artefact.module';
import { onAuthorizationRequired, onAuthRequired } from '../routes';
import { AuthGuard } from '../../shared/okta/auth.guard';
import { MatRadioModule } from '@angular/material/radio';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { FileUploadModule } from 'ng2-file-upload';
import { AirlineDetailsComponent } from './airlines/airline-details/airline-details.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      onAuthorizationRequired,
      authorities: ['admins']
    },
    children: [
      { path: '', redirectTo: 'airlines', pathMatch: 'full' },
      {
        path: 'airlines',
        children: [
          { path: '', component: AdminAirlinesComponent },
          { path: ':airlineIcao', component: AirlineDetailsComponent, pathMatch: 'full' }
        ]
      },
      { path: 'stations', component: AdminStationsComponent },
      { path: 'products', component: AdminProductsComponent }
    ]
  }
];

@NgModule({
  imports: [
    MatRadioModule,
    MultiselectDropdownModule,
    RouterModule.forChild(routes),
    BootstrapModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
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
    FileUploadModule
  ],
  declarations: [
    AdminComponent,
    AdminAirlinesComponent,
    AdminStationsComponent,
    AdminProductsComponent,
    AirlineDetailsComponent
  ],
  exports: [
    RouterModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
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
    MatRadioModule,
    MultiselectDropdownModule,
    FileUploadModule
  ]
})
export class AdminModule { }
