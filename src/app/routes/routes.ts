import { OktaCallbackComponent } from '@okta/okta-angular';
import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './login/protected.component';
import { AuthGuard } from '../shared/okta/auth.guard';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { AccessDeniedComponent } from './error/access-denied/access-denied.component';
import { UploadComponent } from './upload/upload.component';
import { AirlinesComponent } from '../shared/modules/airlines/airlines.component';

export function onAuthRequired({ oktaAuth, router }) {
  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

export function onAuthorizationRequired({ oktaAuth, router }) {
  // Redirect the user to your home page
  // router.navigate(['/home']);
  router.navigate(['/access-denied']);
}

export const routes = [

  // Okta callback
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [AuthGuard],
    data: {
      onAuthRequired,
      onAuthorizationRequired,
      authorities: ['admins']
    }
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: {
      onAuthRequired,
    },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'repair-management', loadChildren: './repair-management/repair-management.module#RepairManagementModule' },
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'upload', component: UploadComponent },
      { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
      { path: 'airlines', component: AirlinesComponent },
      { path: 'airlines/:airlineIcao', loadChildren: './airline/airline.module#AirlineModule' },
      {
        path: 'airlines/:airlineIcao/tv-performance/:flightId',
        loadChildren: './tv-performance/tv-performance.module#TvPerformanceModule'
      },
      { path: 'airlines/:airlineIcao/tails/:tailNumber/flight-legs/:flightLegId', loadChildren: './flights/flights.module#FlightModule' },
      { path: 'airlines/:airlineIcao/tails/:tailNumber', loadChildren: './tails/tails.module#TailsModule' },
      { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
      { path: 'access-denied', component: AccessDeniedComponent },
      { path: 'not-found', component: NotFoundComponent },
      { path: '**', component: NotFoundComponent }
    ]
  },
];
