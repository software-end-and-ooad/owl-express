import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { PublicGuard } from 'ngx-auth';

import { AuthUserGuard } from './shared/authentication/guard/user-guard.service';
import { PublicGuard } from './shared/authentication/guard/public-guard.service';
import { TokenExpiredGuard } from './shared/authentication/guard/tokenExpired-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [ PublicGuard ],
    loadChildren: './main/main.module#MainModule'
  },
  {
    path: 'dashboard',
    canActivate: [ TokenExpiredGuard, AuthUserGuard ],
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
