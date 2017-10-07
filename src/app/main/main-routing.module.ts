import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { LoginComponent }  from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { SendForgetComponent } from './forgetpwd/sendforget.component';
import { ResetPasswordComponent } from './forgetpwd/resetpwd.component';
import { ActivateComponent } from './activate/activate.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HeaderComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'forget-password',
        component: SendForgetComponent
      },
      {
        path: 'reset-password/:tokenId',
        component: ResetPasswordComponent
      },
      {
        path: 'activate/:tokenId',
        component: ActivateComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
