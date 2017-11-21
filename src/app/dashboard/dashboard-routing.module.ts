import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { OrderPackageComponent } from './orderpackage/order-package.component';
import { LogoutComponent } from './logout/logout.component';
import { OrderListComponent } from './orderlist/orderlist.component';
import { ProfileSettingComponent } from './profilesetting/profile-setting.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'order-list',
        pathMatch: 'full',
      },
      {
        path: 'order-list',
        component: OrderListComponent
      },
      {
        path: 'order-package',
        component: OrderPackageComponent,
      },
      {
        path: 'profile-setting',
        component: ProfileSettingComponent,
      },
    ]
  },
  {
    path: 'logout',
    component: LogoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
