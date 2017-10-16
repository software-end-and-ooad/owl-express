import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DataService } from '../shared';

import { ComponentsModule } from './components/components.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { OrderPackageComponent } from './orderpackage/order-package.component';
import { LogoutComponent } from './logout/logout.component';
import { OrderListComponent } from './orderlist/orderlist.component';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService
  ],
  declarations: [
    DashboardComponent,
    OrderPackageComponent,
    LogoutComponent,
    OrderListComponent,
  ]
})
export class DashboardModule { }
