import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate } from '@angular/router';

import { TokenStorage } from '../token-storage.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    public router: Router,
    private tokenStorage: TokenStorage,
  ) {}

  canActivate(): Observable<boolean> {
    return this.tokenStorage.getAdminToken()
    .map(
      res => {
        if (res) {
          return true;
        } else {
          this.router.navigate(['admin/login'])
          return false;
        }
      })
    .catch(
      () => {
        return Observable.of(true);
      });
  }

}

