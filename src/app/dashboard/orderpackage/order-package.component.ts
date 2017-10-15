import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { API } from '../../../../constance/url';

declare var $: any;
@Component({
  selector: 'app-orderpackage',
  templateUrl: './order-package.component.html',
})
export class OrderPackageComponent implements OnInit{
  private provinces: Array<Object>;
  private districts: Array<Object>;
  private subdistricts: Array<Object>;

  private destProvinces: Array<Object>;
  private destDistricts: Array<Object>;
  private destSubdistricts: Array<Object>;

  orderForm: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) {
    this.getProvince();
    this.getDestProvince();
  }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      size: [null, [ Validators.pattern('L|M|S|XL') ]],
      paymentType: [null, [ Validators.required ]],
      transportType: [null, [ Validators.required ]],
      srcSubdistrict: [null, [ Validators.required ]],
      srcDistrict: [null, [ Validators.required ]],
      srcProvince: [null, [ Validators.required ]],
      srcAddressOther: [null, [ Validators.required, Validators.maxLength(255) ]],
      destSubdistrict: [null, [ Validators.required ]],
      destDistrict: [null, [ Validators.required ]],
      destProvince: [null, [ Validators.required ]],
      destAddressOther: [null, [ Validators.required, Validators.maxLength(255) ]],
      pickupDate: ['', [ Validators.required, Validators.pattern('[0-1]{0,1}[0-9]/[0-3]{0,1}[0-9]/[0-9][0-9][0-9][0-9]') ]],
    })
  }

  setDateFormat() {
    const timeNow = new Date();
    let date =  timeNow.getMonth() + '-' + timeNow.getDate() + '-' + timeNow.getFullYear();
    console.log(date);

    return date;
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

  getDestProvince() {
    this.http.get(API.api.province)
      .subscribe(
        (res: any) => {
          this.destProvinces = res.data;
        },
        (err: any) => {
          console.log('Cannot get Province');
        }
      )
  }

  getDestDistrict(event) {
    this.http.get(API.api.district + event)
      .subscribe(
        (res: any) => {
          this.destDistricts = res.data;
        },
        (err: any) => {
          this.destDistricts = undefined;
          console.log('Cannot get district');
        }
      )
  }

  getDestSubdistrict(event) {
    this.http.get(API.api.subdistrict + event)
      .subscribe(
        (res: any) => {
          this.destSubdistricts = res.data;
        },
        (err: any) => {
          this.destSubdistricts = undefined;
          console.log('Cannot get district');
        }
      )
  }




  submit(value) {
    this.http.post(API.protect.order, value);
  }

}
