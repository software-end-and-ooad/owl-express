import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminFooterComponent } from './footer/footer.admin.component';
import { AdminNavbarComponent } from './navbar/navbar.admin.component';
import { AdminSidebarComponent } from './sidebar/sidebar.admin.component';
import { AdminStatusComponent } from './status/status.admin.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    AdminFooterComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminStatusComponent
  ],
  exports: [
    AdminFooterComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminStatusComponent
  ]
})
export class AdminComponentsModule { }
