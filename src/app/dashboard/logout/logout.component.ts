import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../shared/authentication';

@Component({
  selector: 'app-logout',
  template: `<p>Loging out ...</p>`
})
export class LogoutComponent {
  constructor(private router: Router, private authService: AuthenticationService) {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }
}
