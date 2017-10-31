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
  selector: 'app-admin-manageofficer',
  templateUrl: './manageofficer.component.html',
  styleUrls: ['./manageofficer.component.scss']
})
export class ManageOfficerComponent implements OnInit{

  // ng2-smart-table variable
  private datas: Array<any>; // All officer data
  private source: LocalDataSource;
  private rowData: any; // Data per row for edit

  // Edit Form variable
  private editofficerForm: FormGroup;
  private formInvalid: string;
  private inputLength = {
    tellMin: 9,
    tellMax: 10,
    fullnameMax: 40,
    address_otherMax: 255,
    other: undefined
  }

  // Other variable
  private createMode: boolean = false;
  @ViewChild('manageOfficerModal') public manageOfficerModal: ElementRef; // Give to navbar main for open
  private provinces: Array<any> = [{title: 'test', value: 3}];
  private districts: Array<any>;
  private sub_districts: Array<any>;


  public settings = {
    columns: {
      officer_no: {
        title: 'รหัสพนักงาน'
      },
      role: {
        title: 'สิทธิ'
      },
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
    },
    actions: {
      add: true,
      edit: true,
      delete: false,
      columnTitle: 'จัดการ',
      position: 'right',
    },
    add: {
      addButtonContent: `<div class='btn btn-success btn-sm'><i class='ion-person-add'></i></h1>`,
      saveButtonContent: `<div class='btn btn-success btn-sm'><i class='ion-edit'></i></h1>`,
      cancelButtonContent: `<div class='btn btn-danger btn-sm'><i class='ion-android-close'></i></h1>`,
      confirmSave: false,
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
    hideSubHeader: false,
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
    this.getAllOfficer();
    this.source = new LocalDataSource(this.datas);
    this.getProvince();
  }

  ngOnInit() {
    const inputLength = this.inputLength;

    this.editofficerForm = this.formBuilder.group({
      email: [null, [ Validators.required, Validators.email ]],
      fullname: [null, [ Validators.required, Validators.maxLength(inputLength.fullnameMax) ]],
      tell: [null, [ Validators.required, Validators.minLength(inputLength.tellMin), Validators.maxLength(inputLength.tellMax) ]],
      role: [null, [ Validators.required, Validators.pattern('officer|admin') ]],
      sub_district: ['', [ Validators.required ]],
      district: ['', [ Validators.required ]],
      province: ['', [ Validators.required ]],
      address_other: ['', [ Validators.required, Validators.maxLength(inputLength.address_otherMax)]],
    })
  }


  getAllOfficer() {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.dataAdminService.getToken()
    })
    this.http.get(API.adminProtect.getAllOfficer, {headers: headers})
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
            data.address_other          = data.address_other          == null? 'ไม่ระบุ': data.address_other;
          }

          this.source.load(this.datas) // Set data into source

        },
        (err: any) => {
          console.log('Cannot get order list');
        })
  }

  toggleModal() {
    this.manageOfficerModal.nativeElement.click();
  }

  addData(event) {
    this.createMode = true;
    this.editofficerForm.controls['email'].enable({onlySelf: true})
    this.toggleModal();
  }

  editData(event): void {
    this.createMode = false;
    this.editofficerForm.controls['email'].disable({onlySelf: true})
    this.rowData = event.data;
    //console.log(this.rowData);
    // Call address for current value selection
    if (event.data.provinces.length > 0 )
      this.getDistrict(this.rowData.provinces[0].PROVINCE_ID);
    if (event.data.provinces.length > 0 && event.data.districts.length > 0)
      this.getSubDistrict(this.rowData.districts[0].DISTRICT_ID);

    // Map value each form because value in input not work
    this.editofficerForm.controls['fullname'].patchValue(event.data.fullname);
    this.editofficerForm.controls['role'].patchValue(event.data.role);
    this.editofficerForm.controls['tell'].patchValue(event.data.tell);
    this.editofficerForm.controls['sub_district'].patchValue(event.data.sub_districts[0]==undefined? '': event.data.sub_districts[0].SUBDISTRICT_ID);
    this.editofficerForm.controls['district'].patchValue(event.data.districts[0]==undefined? '': event.data.districts[0].DISTRICT_ID);
    this.editofficerForm.controls['province'].patchValue(event.data.provinces[0]==undefined? '': event.data.provinces[0].PROVINCE_ID);
    this.editofficerForm.controls['address_other'].patchValue(event.data.address_other==undefined? '': event.data.address_other);


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
    this.editofficerForm.controls['sub_district'].patchValue('');
    this.editofficerForm.controls['district'].patchValue('');
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
    this.editofficerForm.controls['sub_district'].patchValue('');
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

    if (this.createMode == false) {
      delete value.email

      this.http.post(API.adminProtect.editOfficer, value, {headers: headers})
        .subscribe(
          (res: any) => {
            this.getAllOfficer();
            this.toggleModal();
            this.notififyService.showNotification('success', 'แก้ไขข้อมูลพนักงานเรียบร้อยแล้ว', '');
          },
          (err: any) => {
            this.inputLength.other = 'กรุณาตรวจสอบการกรอกข้อมูลให้ถูกต้องและครบถ้วน';
            console.log(err.error.data);
            console.log('error');
          }
        )
    } else {
      console.log(value);
      /*
       *this.http.post(API.adminProtect.addOfficer, value, {headers: headers})
       *  .subscribe(
       *    (res: any) => {
       *      this.getAllOfficer();
       *      this.toggleModal();
       *      this.notififyService.showNotification('success', 'เพิ่มพนักงานเรียบร้อยแล้ว', '');
       *    },
       *    (err: any) => {
       *      this.inputLength.other = 'กรุณาตรวจสอบการกรอกข้อมูลให้ถูกต้องและครบถ้วน';
       *      console.log(err.error.data);
       *      console.log('error');
       *    }
       *  )
       */
    }


  }



}
