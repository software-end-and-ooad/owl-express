import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DataService, AuthenticationService } from '../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent {

  public user: Object;

  constructor(
    private router: Router,
    private dataService: DataService,
    private authService: AuthenticationService
  ) {
    // Start Up call function
    this.dataService.getUsers();
  }


  public check() {
    this.authService.isAuthorized().subscribe(
      (res) => alert(res)
    );
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
