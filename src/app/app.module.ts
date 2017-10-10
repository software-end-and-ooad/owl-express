import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthenticationModule } from './shared';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthUserGuard} from './shared/authentication/guard/user-guard.service';
import { PublicGuard } from './shared/authentication/guard/public-guard.service';
import { TokenExpiredGuard } from './shared/authentication/guard/tokenExpired-guard.service';

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
    TokenExpiredGuard
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
