import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataService } from '../shared';

import { ComponentsModule } from './components/components.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';
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
    NotificationsComponent,
    LogoutComponent,
  ]
})
export class DashboardModule { }
