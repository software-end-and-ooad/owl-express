import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicGuard, ProtectedGuard } from 'ngx-auth';

import { AuthUserGuard } from './shared/authentication/guard/user-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [ PublicGuard ],
    loadChildren: './main/main.module#MainModule'
  },
  {
    path: 'admin',
    canActivate: [ PublicGuard ],
    loadChildren: './main/main.module#MainModule'
  },
  {
    path: 'dashboard',
    canActivate: [ ProtectedGuard, AuthUserGuard ],
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
