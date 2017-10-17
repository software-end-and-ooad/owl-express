import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { API } from '../../../../constance/url';
import { DataService } from '../../shared/data.service';
import { NotificationService } from '../../shared/notification.service';

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
  formInvalid: any = {
    pickupDate: null
  }

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private notifyService: NotificationService
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
    });
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
    value.userId = this.dataService.getUserData().id;
    this.http.post(API.protect.order, value)
      .subscribe(
        (res: any) => {
          this.formInvalid.pickupDate = null;
          this.notifyService.showNotification(
            'success',
            'สำเร็จ',
            'สั่งของผ่าน Owl-Express เรียบร้อยแล้ว!!     กรุณารอการเจ้าหน้าที่เข้ารับพัสดุ'
          );
          setTimeout(() => {
            this.router.navigateByUrl('/order-list')
          }, 1000);
        },
        (err: any) => {
          const error = err.error.data;
          if (error.pickupDate[0] == 'pickupDate_MUST_AFTER_PRESENT')
            this.formInvalid.pickupDate = 'pickupDate_MUST_AFTER_PRESENT';
        }
      )
  }

}
