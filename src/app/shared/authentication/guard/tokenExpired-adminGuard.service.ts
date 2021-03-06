import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class TokenExpiredAdminGuard implements CanActivate {

  constructor(public authService: AuthenticationService, public router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.refreshAdminToken()
    .map(
      res => {
        if (res) {
          return true;
        }
      }).catch(() => {
        this.authService.logout('admin/login');
        return Observable.of(false);
      });
  }

}
