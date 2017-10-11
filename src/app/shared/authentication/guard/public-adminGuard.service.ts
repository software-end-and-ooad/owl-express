import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate } from '@angular/router';

import { TokenStorage } from '../token-storage.service';

@Injectable()
export class PublicAdminGuard implements CanActivate {

  constructor(
    private tokenStorage: TokenStorage,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.tokenStorage.getAdminToken()
    .map(
      res => {
        if (res) {
          this.router.navigate(['admin/dashboard'])
          return false;
        } else {
          return true;
        }
      })
    .catch(
      () => {
        return Observable.of(true);
      });
  }

}
