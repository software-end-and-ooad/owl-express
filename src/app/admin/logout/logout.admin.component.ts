import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../shared/authentication';

@Component({
  selector: 'app-adminlogout',
  template: `<p>Loging out ...</p>`
})
export class LogoutAdminComponent {
  constructor(private router: Router, private authService: AuthenticationService) {
    this.authService.logout();
  }
}
