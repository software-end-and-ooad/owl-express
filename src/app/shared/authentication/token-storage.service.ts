import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenStorage {

  /**
   * Get access token
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('accessToken');
    Observable.of(token).map(
      token => !!token
    );
    return Observable.of(token);
  }

  /**
   * Get admin token
   * @returns {Observable<string>}
   */
  public getAdminToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('adminToken');
    Observable.of(token).map(
      token => !!token
    );
    return Observable.of(token);
  }

  /**
   * Set access token
   * @returns {TokenStorage}
   */
  public setAccessToken(token: string): TokenStorage {
    localStorage.setItem('accessToken', token);

    return this;
  }

  /**
   * Set admin token
   * @returns {TokenStorage}
   */
  public setAdminToken(token: string): TokenStorage {
    localStorage.setItem('adminToken', token);

    return this;
  }

   /**
   * Remove tokens
   */
  public clear() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('adminToken');
  }
}
