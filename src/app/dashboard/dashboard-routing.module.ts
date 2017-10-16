import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { OrderPackageComponent } from './orderpackage/order-package.component';
import { LogoutComponent } from './logout/logout.component';
import { OrderListComponent } from './orderlist/orderlist.component';

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
