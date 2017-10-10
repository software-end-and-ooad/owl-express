import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class TokenExpiredGuard implements CanActivate {

  constructor(public authService: AuthenticationService, public router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.refreshToken()
    .map(
      res => {
        if (res) {
          return true;
        }
      }).catch(() => {
        this.router.navigate(['login'])
        return Observable.of(false);
      });
  }

}
