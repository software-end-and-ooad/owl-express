import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { DataAdminService } from '../../shared/data.admin.service';
import { API } from '../../../../constance/url';
import { DataService } from '../../shared/data.service';
import { NotificationService } from '../../shared/notification.service';


@Component({
  selector: 'app-admin-manageuser',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manageuser.component.scss']
})
export class ManageUserComponent implements OnInit{

  // ng2-smart-table variable
  private datas: Array<any>; // All user data
  private source: LocalDataSource;
  private rowData: any; // Data per row for edit

  // Form variable
  private edituserForm: FormGroup;
  private formInvalid: string;
  private submit: boolean = false;
  private inputLength = {
    tellMin: 9,
    tellMax: 10,
    fullnameMax: 40,
    address_otherMax: 255,
    other: undefined
  }

  // Other variable
  @ViewChild('manageUserModal') public manageUserModal: ElementRef; // Give to navbar main for open
  private provinces: Array<any> = [{title: 'test', value: 3}]
  private districts: Array<any>;
  private sub_districts: Array<any>;


  public settings = {
    columns: {
      email: {
        title: 'อีเมล'
      },
      fullname: {
        title: 'ชื่อ-สกุล',
        width: '10%'
      },
      tell: {
        title: 'เบอร์ติดต่อ'
      },
      sub_district_content: {
        title: 'ตำบล',
        width: '8%'
      },
      district_content: {
        title: 'อำเภอ',
        width: '10%'
      },
      province_content: {
        title: 'จังหวัด',
      },
      address_other: {
        title: 'รายละเอียดที่อยู่',
        width: '10%'
      },
      subscribe_sms_content: {
        title: 'การรับข่าวสารผ่าน SMS',
        width: '6%'
      },
      subscribe_line_content: {
        title: 'การรับข่าวสารผ่าน Line',
        width: '6%'
      },
      rejected_order: {
        title: 'ปฏิเสธรับของ',
        width: '3%'
      },
      activated_content: {
        title: 'ยืนยันบัญชี',
      },
    },
    actions: {
      add: false,
      edit: true,
      delete: false,
      columnTitle: 'จัดการ',
      position: 'right',
    },
    edit: {
      editButtonContent: `<div class='btn btn-warning btn-sm'><i class='ion-edit'></i></h1>`,
      saveButtonContent: `<div class='btn btn-success btn-sm'><i class='ion-edit'></i></h1>`,
      cancelButtonContent: `<div class='btn btn-danger btn-sm'><i class='ion-android-close'></i></h1>`,
      confirmSave: false,
    },
    delete: {
      deleteButtonContent: 'ลบ',
      saveButtonContent: 'บันทึก',
      cancelButtonContent: 'ยกเลิก'
    },
    hideSubHeader: true,
    noDataMessage: 'ไม่พบข้อมูล',
    mode: 'external'
  };

  constructor(
    private http: HttpClient,
    private dataAdminService: DataAdminService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private notififyService: NotificationService
  ) {
    this.getAllUser();
    this.source = new LocalDataSource(this.datas);
    this.getProvince();
  }

  ngOnInit() {
    const inputLength = this.inputLength;

    this.edituserForm = this.formBuilder.group({
      fullname: [null, [ Validators.required, Validators.maxLength(inputLength.fullnameMax) ]],
      tell: [null, [ Validators.required, Validators.minLength(inputLength.tellMin), Validators.maxLength(inputLength.tellMax) ]],
      type: [null, [ Validators.required, Validators.pattern('personal|enterprise') ]],
      sub_district: [''],
      district: [''],
      province: [''],
      address_other: ['', [ Validators.maxLength(inputLength.address_otherMax)]],
      subscribe_sms: ['', [ Validators.required, Validators.pattern('1|0|true|false')  ]],
      subscribe_line: ['', [ Validators.required, Validators.pattern('1|0|true|false') ]],
      rejected_order: [0, [ Validators.required, Validators.pattern('[0123]') ]],
      activated: ['', [ Validators.pattern('1|0|true|false') ]],
    })
  }


  getAllUser() {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.dataAdminService.getToken()
    })
    this.http.get(API.adminProtect.getAllUser, {headers: headers})
      .subscribe(
        (res: any) => {
          this.datas = res.data;
          console.log(this.datas);

          // Resolve data to Thai language for show in html
          for (let i in this.datas) {
            let data = this.datas[i];
            data.sub_district_content   = data.sub_districts.length   == 0? 'ไม่ระบุ': data.sub_districts[0].SUBDISTRICT_NAME; // Not finish yet
            data.district_content       = data.districts.length       == 0? 'ไม่ระบุ': data.districts[0].DISTRICT_NAME; // Not finish yet
            data.province_content       = data.provinces.length       == 0? 'ไม่ระบุ': data.provinces[0].PROVINCE_NAME; // Not finish yet
            data.subscribe_sms_content  = data.subscribe_sms  == false? 'ไม่ได้สมัคร': 'สมัครแล้ว'; // Not finish yet
            data.subscribe_line_content = data.subscribe_line == false? 'ไม่ได้สมัคร': 'สมัครแล้ว'; // Not finish yet
            data.activated_content      = data.activated      == false? 'ยังไม่ได้ยืนยันตัวตน': 'ยืนยันตัวตนแล้ว'; // Not finish yet
          }
          this.source.load(this.datas) // Set data into source

        },
        (err: any) => {
          console.log('Cannot get order list');
        })
  }

  toggleModal() {
    this.manageUserModal.nativeElement.click();
  }

  editData(event): void {
    this.rowData = event.data;
    console.log(this.rowData);
    // Call address for current value selection
    if (event.data.provinces.length > 0 )
      this.getDistrict(this.rowData.provinces[0].PROVINCE_ID);
    if (event.data.provinces.length > 0 && event.data.districts.length > 0)
      this.getSubDistrict(this.rowData.districts[0].DISTRICT_ID);

    // Map value each form because value in input not work
    this.edituserForm.controls['fullname'].patchValue(event.data.fullname);
    this.edituserForm.controls['type'].patchValue(event.data.type);
    this.edituserForm.controls['rejected_order'].patchValue(event.data.rejected_order);
    this.edituserForm.controls['tell'].patchValue(event.data.tell);
    this.edituserForm.controls['sub_district'].patchValue(event.data.sub_districts[0]==undefined? '': event.data.sub_districts[0].SUBDISTRICT_ID);
    this.edituserForm.controls['district'].patchValue(event.data.districts[0]==undefined? '': event.data.districts[0].DISTRICT_ID);
    this.edituserForm.controls['province'].patchValue(event.data.provinces[0]==undefined? '': event.data.provinces[0].PROVINCE_ID);
    this.edituserForm.controls['address_other'].patchValue(event.data.address_other==undefined? '': event.data.address_other);
    this.edituserForm.controls['subscribe_sms'].patchValue(event.data.subscribe_sms);
    this.edituserForm.controls['subscribe_line'].patchValue(event.data.subscribe_line);
    this.edituserForm.controls['activated'].patchValue(event.data.activated);


    this.toggleModal();
  }


  getProvince() {
    this.dataService.getProvince()
      .subscribe(
        (res: any) => {
          this.provinces = res;
          this.districts = undefined;
          this.sub_districts = undefined;
        }
      )
  }

  getDistrict(provinceId) {
    this.edituserForm.controls['sub_district'].patchValue('');
    this.edituserForm.controls['district'].patchValue('');
    if (provinceId > 0) {
      this.dataService.getDistrict(provinceId)
        .subscribe(
          (res: any) => {
            this.districts = res;
            this.sub_districts = undefined;
          }
        )
    } else {
      this.districts = undefined;
      this.sub_districts = undefined;
    }
  }

  getSubDistrict(districtId) {
    this.edituserForm.controls['sub_district'].patchValue('');
    if (districtId > 0) {
      this.dataService.getSubdistrict(districtId)
        .subscribe(
          (res: any) => {
            this.sub_districts = res;
          }
        )
    } else {
      this.sub_districts = undefined;
    }
  }


  submitEdit(value: any) {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.dataAdminService.getToken()
    })

    console.log(value);
    this.http.post(API.adminProtect.edituser, value, {headers: headers})
      .subscribe(
        (res: any) => {
          this.getAllUser();
          this.toggleModal();
          this.notififyService.showNotification('success', 'แก้ไขข้อมูลผู้ใช้เรียบร้อยแล้ว', '');
        },
        (err: any) => {
          this.inputLength.other = 'กรุณาตรวจสอบการกรอกข้อมูลให้ถูกต้อง';
          console.log(err.error.data);
          console.log('error');
        }
      )
  }

}
