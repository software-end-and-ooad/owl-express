import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { API } from '../../../../constance/url';

declare var $: any;
@Component({
  selector: 'app-orderpackage',
  templateUrl: './order-package.component.html',
})
export class OrderPackageComponent {
  private provinces: Array<Object>;
  private districts: Array<Object>;
  private subdistricts: Array<Object>;

  constructor(
    private http: HttpClient,
  ) {
    this.getProvince();
  }

  getProvince() {
    this.http.get(API.api.province)
      .subscribe(
        (res: any) => {
          this.provinces = res.data;
        },
        (err: any) => {
          console.log('Cannot get Province');
        }
      )
  }

  getDistrict(event) {
    this.http.get(API.api.district + event)
      .subscribe(
        (res: any) => {
          this.districts = res.data;
        },
        (err: any) => {
          this.districts = undefined;
          console.log('Cannot get district');
        }
      )
  }

  getSubdistrict(event) {
    this.http.get(API.api.subdistrict + event)
      .subscribe(
        (res: any) => {
          this.subdistricts = res.data;
        },
        (err: any) => {
          this.subdistricts = undefined;
          console.log('Cannot get district');
        }
      )
  }

}
