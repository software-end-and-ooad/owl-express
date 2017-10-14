import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataService } from '../shared';

import { ComponentsModule } from './components/components.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { OrderPackageComponent } from './orderpackage/order-package.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
  ],
  providers: [
    DataService
  ],
  declarations: [
    DashboardComponent,
    OrderPackageComponent,
    LogoutComponent,
  ]
})
export class DashboardModule { }
