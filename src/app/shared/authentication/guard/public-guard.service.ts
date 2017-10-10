import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate } from '@angular/router';

import { TokenStorage } from '../token-storage.service';

@Injectable()
export class PublicGuard implements CanActivate {

  constructor(
    private tokenStorage: TokenStorage,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.tokenStorage.getAccessToken()
    .map(
      res => {
        if (res) {
          this.router.navigate(['dashboard'])
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
