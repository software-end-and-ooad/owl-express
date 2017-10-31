import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ManageUserComponent } from './manageuser/manage-user.component'
import { LogoutAdminComponent } from './logout/logout.admin.component';
import { ManageOrderComponent } from './manageorder/manage-order.component';
import { ManageOfficerComponent } from './manageofficer/manageofficer.component';
import { NotOfficerGuard } from '../shared/authentication/guard/adminorofficer-guard.service';
import { NotAdminGuard } from '../shared/authentication/guard/officeroradmin-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'manage-user',
        pathMatch: 'full',
      },
      {
        path: 'officer',
        children: [
          {
            path: '',
            redirectTo: 'manage-order',
            pathMatch: 'full'
          },
          {
            path: 'manage-order',
            canActivate: [ NotAdminGuard ],
            component: ManageOrderComponent
          }
        ]
      },
      {
        path: 'manage-user',
        canActivate: [ NotOfficerGuard ],
        component: ManageUserComponent,
      },
      {
        path: 'manage-order',
        canActivate: [ NotOfficerGuard ],
        component: ManageOrderComponent
      },
      {
        path: 'manage-member',
        canActivate: [ NotOfficerGuard ],
        component: ManageOfficerComponent
      },
      {
        path: 'logout',
        component: LogoutAdminComponent
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
