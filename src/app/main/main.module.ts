import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NavbarMainComponent } from './navbar/navbar.main.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MainComponent,
    NavbarMainComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent
  ]
})
export class MainModule { }
