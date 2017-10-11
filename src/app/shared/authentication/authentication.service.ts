import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'ngx-auth';
import { Router } from '@angular/router';
import { API } from '../../../../constance/url';

import { TokenStorage } from './token-storage.service';

interface AccessData {
  token: string;
}

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router,
  ) {}

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @returns {Observable<boolean>}
   * @memberOf AuthService
   */
  public isAuthorized(): Observable < boolean > {
    return this.tokenStorage
      .getAccessToken()
      .map(token => !!token);
  }

  /**
   * Get access token
   * @description Should return access token in Observable from e.g.
   * localStorage
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable < string > {
    return this.tokenStorage.getAccessToken();
  }

  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   * @returns {Observable<any>}
   */
  public refreshToken(): Observable < AccessData > {
    return this.tokenStorage
      .getAccessToken()
      .switchMap((token: string) => {
        const headers = new HttpHeaders({
          'Authorization': 'bearer ' + token
        });
        return this.http.get(API.protect.refreshToken, { headers: headers })
          .do(
            (res: any) => this.saveAccessData(res),
            (err: any) => this.logout()
          )
      });
  }

  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   * @returns {Observable<any>}
   */
  public refreshAdminToken(): Observable < AccessData > {
    return this.tokenStorage
      .getAdminToken()
      .switchMap((token: string) => {
        const headers = new HttpHeaders({
          'Authorization': 'bearer ' + token
        });
        return this.http.get(API.adminProtect.refreshToken, { headers: headers })
          .do(
            (res: any) => this.saveAdminData(res),
            (err: any) => this.logout()
          )
      });
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentialy checks status
   * @param {Response} response
   * @returns {boolean}
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   * @param {string} url
   * @returns {boolean}
   */
  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/refresh');
  }

  /**
   * EXTRA AUTH METHODS
   */

  public login(email, password): Observable<any> {
    return this.http.post(API.api.auth, { email: email, password: password })
    .do( (res: AccessData) =>  this.saveAccessData(res) );
  }

  public adminLogin(email, password): Observable<any> {
    return this.http.post(API.admin.auth, { email: email, password: password })
    .do( (res: AccessData) =>  this.saveAdminData(res) );
  }

  /**
   * Logout
   */
  public logout(redirectPath?: string): void {
    this.tokenStorage.clear();
    //location.reload(true);
    this.router.navigateByUrl(redirectPath? redirectPath: '/');
  }

  /**
   * Save access data in the storage
   *
   * @private
   * @param {AccessData} data
   */
  private saveAccessData({token}: AccessData) {
    this.tokenStorage
      .setAccessToken(token)
  }

  /**
   * Save admin data in the storage
   *
   * @private
   * @param {AccessData} data
   */
  private saveAdminData({token}: AccessData) {
    this.tokenStorage
      .setAdminToken(token)
  }

}
