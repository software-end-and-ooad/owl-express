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
    this.profileForm = this.formBuilder.group({
      fullname: [null, [ Validators.pattern('L|M|S|XL') ]],
      tel: [null, [ Validators.required ]],
      Subdistrict: [null, [ Validators.required ]],
      District: [null, [ Validators.required ]],
      Province: [null, [ Validators.required ]],
      subscribe_line: [null, [ Validators.required, Validators.maxLength(255) ]],
      subscribe_sms: ['', [ Validators.pattern('[0-1]{0,1}[0-9]/[0-3]{0,1}[0-9]/[0-9][0-9][0-9][0-9]') ]],
    });
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
    //value.userId = this.dataService.getUserData().id;
    //console.log(value);
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
            //this.router.navigateByUrl('/order-list')
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
