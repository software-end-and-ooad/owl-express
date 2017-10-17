import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenStorage } from './authentication/token-storage.service'
import { AuthenticationService } from './authentication/authentication.service';
import { API } from '../../../constance/url';

@Injectable()
export class DataAdminService {

  private token: string;
  private admin: any;

  constructor(private http: HttpClient, private tokenStorage: TokenStorage, private authService: AuthenticationService) {
     this.tokenStorage.getAdminToken()
      .subscribe((res: any) => this.token = res)
  }

  refreshToken() {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.token
    })
    return this.authService.refreshAdminToken()
      .subscribe(
        (res: any) => {
          this.token = res.token
        }
      )
  }

  getToken() {
    return this.token
  }

  getAdmnData() {
    return this.admin;
  }

  getAdmins(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.token
    })
    return this.http.get(API.adminProtect.auth, {headers: headers})
    .map(
        (res: any) => {
          this.admin = res.data;
          return res.data;
        },
    )
  }

}
