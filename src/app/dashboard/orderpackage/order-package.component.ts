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
      pickupDate: ['', []],
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

  getDestProvince() {
    this.dataService.getProvince()
      .subscribe(
        (res: any) => {
          this.destProvinces = res;
        }
      )
  }

  getDestDistrict(provinceId) {
    this.dataService.getDistrict(provinceId)
      .subscribe(
        (res: any) => {
          this.destDistricts = res;
        }
      )
  }

  getDestSubdistrict(districtId) {
    this.dataService.getSubdistrict(districtId)
      .subscribe(
        (res: any) => {
          this.destSubdistricts = res;

        }
      )
  }

  getDateTMR() {
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    if (day.toString().length < 2)
      return year + "-" + month + "-0" + day;
    else
      return year + "-" + month + "-" + day;
  }

  useAccountAddress() {
    const province = this.orderForm.controls['srcProvince'];
    const district = this.orderForm.controls['srcDistrict'];
    const subdistrict = this.orderForm.controls['srcSubdistrict'];
    const addressOther = this.orderForm.controls['srcAddressOther'];
    const myAccountAddress = this.dataService.getUserData();

    // Set value form
    province.patchValue(myAccountAddress.province);
    district.patchValue(myAccountAddress.district);
    subdistrict.patchValue(myAccountAddress.sub_district);
    addressOther.patchValue(myAccountAddress.address_other);

    // Call list of selection if there is value of address
    if (province.value == myAccountAddress.province)
      this.getDistrict(province.value);
    if (district.value == myAccountAddress.district)
      this.getSubdistrict(district.value);
  }

  submit(value) {
    value.userId = this.dataService.getUserData().id;
    console.log(value);
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
          console.log(error);
          if (error.pickupDate[0] == 'pickupDate_MUST_AFTER_PRESENT')
            this.formInvalid.pickupDate = 'pickupDate_MUST_AFTER_PRESENT';
          else if(error.pickupDate[0] == 'pickupDate_MUST_BE_DATE')
            this.formInvalid.pickupDate = 'pickupDate_MUST_BE_DATE';
        }
      )
  }

}
