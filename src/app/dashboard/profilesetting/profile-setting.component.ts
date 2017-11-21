import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { API } from '../../../../constance/url';
import { DataService } from '../../shared/data.service';
import { NotificationService } from '../../shared/notification.service';

declare var $: any;
@Component({
  selector: 'app-profilesetting',
  templateUrl: './profile-setting.component.html',
})
export class ProfileSettingComponent implements OnInit{
  private provinces: Array<Object>;
  private districts: Array<Object>;
  private subdistricts: Array<Object>;

  profileForm: FormGroup;
  formInvalid: any = {
    pickupDate: null
  }
  profileData: any;
  inputLength = {
    fullnameMax: 40,
    address_otherMax: 255,
    tellMax: 10,
    tellMin: 9
  }

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private notifyService: NotificationService
  ) {
    this.getProvince();
  }

  ngOnInit() {
    const inputLength = this.inputLength;

    this.profileForm = this.formBuilder.group({
      fullname: [null, [ Validators.required, Validators.maxLength(inputLength.fullnameMax) ]],
      tell: [null, [ Validators.required, Validators.maxLength(inputLength.tellMax), Validators.minLength(inputLength.tellMin) ]],
      subdistrict: [null, []],
      district: [null, []],
      province: [null, []],
      addressOther: ['', [ Validators.maxLength(inputLength.address_otherMax)]],
      subscribe_line: [null, [ Validators.pattern('true|false') ]],
      subscribe_sms: [null, [ Validators.pattern('true|false') ]],
    });

    this.dataService.getUsers()
      .subscribe(
        (res: any) => {
          console.log(res);
          this.profileForm.controls['fullname'].patchValue(res.fullname);
          this.profileForm.controls['tell'].patchValue(res.tell);
          this.profileForm.controls['province'].patchValue(res.province);
          this.profileForm.controls['district'].patchValue(res.district);
          this.profileForm.controls['addressOther'].patchValue(res.address_other);
          this.profileForm.controls['subdistrict'].patchValue(res.sub_district);
          this.profileForm.controls['subscribe_sms'].patchValue(res.subscribe_sms);
          this.profileForm.controls['subscribe_line'].patchValue(res.subscribe_line);

          if (res.province > 0) {
            this.getDistrict(res.province)
          }
          if (res.district > 0) {
            this.getSubdistrict(res.district)
          }
        })


  }

  getProvince() {
    this.dataService.getProvince()
      .subscribe(
        (res: any) => {
          this.provinces = res;
        }
      )
  }

  getDistrict(provinceId) {
    this.dataService.getDistrict(provinceId)
      .subscribe(
        (res: any) => {
          this.districts = res;
        }
      )
  }

  getSubdistrict(districtId) {
    this.dataService.getSubdistrict(districtId)
      .subscribe(
        (res: any) => {
          this.subdistricts = res;
        }
      )
  }


  submit(value) {
    console.log(value);
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.dataService.getToken()
    })

    this.http.put(API.protect.profileSetting, value, {headers: headers},)
      .subscribe(
        (res: any) => {
          this.notifyService.showNotification(
            'success',
            'สำเร็จ',
            'แก้ไขโปรไฟล์เรียบร้อยแล้ว'
          );
          setTimeout(() => {
            //this.router.navigateByUrl('/order-list')
          }, 1000);
        },
        (err: any) => {
          const error = err.error.data;
          console.log(error);
          this.notifyService.showNotification(
            'danger',
            'ไม่สำเร็จ',
            'ไม่สามารแก้ไขข้อมูลส่วนตัวได้ โปรดตรวจสอบข้อมูลอีกครั้ง'
          );
        }
      )
  }

}
