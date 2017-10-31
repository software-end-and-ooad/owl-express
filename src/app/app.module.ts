import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthenticationModule, DataAdminService } from './shared';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthUserGuard} from './shared/authentication/guard/user-guard.service';
import { PublicGuard } from './shared/authentication/guard/public-guard.service';
import { TokenExpiredGuard } from './shared/authentication/guard/tokenExpired-guard.service';
import { AdminGuard } from './shared/authentication/guard/adminGuard.service';
import { PublicAdminGuard } from './shared/authentication/guard/public-adminGuard.service';
import { TokenExpiredAdminGuard } from './shared/authentication/guard/tokenExpired-adminGuard.service';
import { NotOfficerGuard } from './shared/authentication/guard/adminorofficer-guard.service';
import { NotAdminGuard } from './shared/authentication/guard/officeroradmin-guard.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthenticationModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthUserGuard,
    PublicGuard,
    TokenExpiredGuard,
    AdminGuard,
    PublicAdminGuard,
    TokenExpiredAdminGuard,
    NotOfficerGuard,
    DataAdminService,
    NotAdminGuard
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
