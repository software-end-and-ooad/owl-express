import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponentsModule } from './components/components.admin.module'

import { DataAdminService, NotificationService } from '../shared';

import { AdminComponent } from './admin.component'
import { ManageUserComponent } from './manageuser/manage-user.component'


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdminComponentsModule
  ],
  providers: [
    DataAdminService,
    NotificationService
  ],
  declarations: [
    AdminComponent,
    ManageUserComponent
  ]
})
export class AdminModule { }
