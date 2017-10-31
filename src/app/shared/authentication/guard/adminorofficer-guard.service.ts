import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate } from '@angular/router';

import { DataAdminService } from '../../data.admin.service';

@Injectable()
export class NotOfficerGuard implements CanActivate {

  constructor(
    private router: Router,
    private dataAdminService: DataAdminService
  ) {}

  canActivate(): Observable<boolean> {
    return this.dataAdminService.getAdmins()
    .map(
      res => {
        if (res.role == 'officer') {
          this.router.navigate(['admin/dashboard/officer/manage-order'])
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
