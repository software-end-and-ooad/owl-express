import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenStorage } from './authentication/token-storage.service'
import { AuthenticationService } from './authentication/authentication.service';
import { API } from '../../../constance/url';

@Injectable()
export class DataService {

  private token: string;
  private user: any;

  constructor(private http: HttpClient, private tokenStorage: TokenStorage, private authService: AuthenticationService) {
     this.tokenStorage.getAccessToken()
      .subscribe((res: any) => this.token = res)
  }

  refreshToken() {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.token
    })
    return this.authService.refreshToken()
      .subscribe(
        (res: any) => {
          this.token = res.token
        }
      )
  }

  getToken() {
    return this.token
  }

  getUserData() {
    return this.user;
  }

  getUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.token
    })
    return this.http.get(API.protect.auth, {headers: headers})
    .map(
        (res: any) => {
          this.user = res.data;
          return res.data;
        },
    )
  }

  getProvince(): Observable<any> {
    return this.http.get(API.api.province)
    .map(
      (res: any) => {
        return res.data;
      }
    )
  }

  getDistrict(provinceId): Observable<any> {
    return this.http.get(API.api.district + provinceId)
      .map(
        (res: any) => {
          return res.data;
        }
      )
  }

  getSubdistrict(districtId): Observable<any> {
    return this.http.get(API.api.subdistrict + districtId)
      .map(
        (res: any) => {
          return res.data;
        },
      )
  }

}
