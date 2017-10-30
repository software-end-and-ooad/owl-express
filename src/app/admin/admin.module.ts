import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponentsModule } from './components/components.admin.module'
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DataAdminService, NotificationService, DataService } from '../shared';

import { AdminComponent } from './admin.component'
import { ManageUserComponent } from './manageuser/manage-user.component'
import { LogoutAdminComponent } from './logout/logout.admin.component';
import { ManageOrderComponent } from './manageorder/manage-order.component';
import { ManageOfficerComponent } from './manageofficer/manageofficer.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdminComponentsModule,
    Ng2SmartTableModule
  ],
  providers: [
    DataAdminService,
    NotificationService,
    DataService,
  ],
  declarations: [
    AdminComponent,
    ManageUserComponent,
    LogoutAdminComponent,
    ManageOrderComponent,
    ManageOfficerComponent,
  ]
})
export class AdminModule { }
