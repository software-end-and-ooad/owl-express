import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  private email: string = '60050170';
  private password: string = '123456';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  public login() {
    this.authService.login(this.email, this.password)
      .subscribe(
        res => this.router.navigateByUrl('/')
        ,
        err => alert("Login fail")

      );
  }

  public logout() {
    this.authService.logout();
  }

  public check() {
    //alert( JSON.stringify(this.authService.isAuthorized() ));
    this.authService.isAuthorized().subscribe(
      (res) => alert(res)
    );
  }

}
