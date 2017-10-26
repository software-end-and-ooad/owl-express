import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ManageUserComponent } from './manageuser/manage-user.component'
import { LogoutAdminComponent } from './logout/logout.admin.component';
import { ManageOrderComponent } from './manageorder/manage-order.component';

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
        path: 'manage-user',
        component: ManageUserComponent
      },
      {
        path: 'manage-order',
        component: ManageOrderComponent
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
