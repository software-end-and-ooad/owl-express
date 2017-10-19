import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { DataAdminService } from '../../shared/data.admin.service';
import { API } from '../../../../constance/url';
import { EditUserComponent } from './edit-user.component';
import { DataService } from '../../shared/data.service';


@Component({
  selector: 'app-admin-manageuser',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manageuser.component.scss']
})
export class ManageUserComponent {

  private province: Array<any> = [{title: 'test', value: 3}]
  private district: Array<Object>;
  private sub_district: Array<Object>;
  private datas: Object;

  public settings = {
    columns: {
      email: {
        title: 'อีเมล'
      },
      fullname: {
        title: 'ชื่อ-สกุล'
      },
      tell: {
        title: 'เบอร์ติดต่อ'
      },
      sub_district: {
        title: 'ตำบล',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [{title: 'test', value: 'ok'}]
          }
        }
      },
      district: {
        title: 'อำเภอ'
      },
      province: {
        title: 'จังหวัด'
      },
      address_other: {
        title: 'รายละเอียดที่อยู่'
      },
      subscribe_sms: {
        title: 'การรับข่าวสารผ่าน SMS'
      },
      subscribe_line: {
        title: 'การรับข่าวสารผ่าน Line'
      },
      activated: {
        title: 'ยืนยันบัญชี',
      },
      /*
       *id: { // Manage
       *  title: 'จัดการ',
       *  type: 'custom',
       *  renderComponent: EditUserComponent,
       *  onComponentInitFunction(instance) {
       *    instance.save.subscribe(row => {
       *      this.editData(row)
       *    });
       *  }
       *}
       */
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
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: 'ลบ',
      saveButtonContent: 'บันทึก',
      cancelButtonContent: 'ยกเลิก'
    },
    hideSubHeader: true,
    noDataMessage: 'ไม่พบข้อมูล',
  };

  constructor(
    private http: HttpClient,
    private dataAdminService: DataAdminService,
    private dataService: DataService
  ) {
    this.getAllUser();
    this.getProvince();
  }


  getAllUser() {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.dataAdminService.getToken()
    })
    this.http.get(API.adminProtect.getAllUser, {headers: headers})
      .subscribe(
        (res: any) => {
          this.datas = res.data;

          // Resolve data to Thai language for show in html
          for (let i in this.datas) {
            let data = this.datas[i];
            data['sub_district'] = data['sub_district']==null? 'ไม่ระบุ': data['sub_district']; // Not finish yet
            data['district'] = data['district']==null? 'ไม่ระบุ': data['district']; // Not finish yet
            data['province'] = data['province']==null? 'ไม่ระบุ': data['province']; // Not finish yet
            data['address_other'] = data['address_other']==null? 'ไม่ระบุ': data['address_other']; // Not finish yet
            data['subscribe_sms'] = data['subscribe_sms']==false? 'ไม่ได้สมัคร': 'สมัครแล้ว'; // Not finish yet
            data['subscribe_line'] = data['subscribe_line']==null? 'ไม่ได้สมัคร': 'สมัครแล้ว'; // Not finish yet
            data['activated'] = data['activated']==false? 'ยังไม่ได้ยืนยันตัวตน': 'ยืนยันตัวตนแล้ว'; // Not finish yet
          }
          this.settings = Object.assign(this.settings, {column: {sub_district: {editor: {config: {list: [{title: 'sdkfj', value: 'value'}]}}}}})
        },
        (err: any) => {
          console.log('Cannot get order list');
        })
  }


  editData(event) {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.dataAdminService.getToken()
    })

    //this.http.put(API.adminProtect.edituser, {headers: headers});
  }


  getProvince() {
    this.dataService.getProvince()
      .subscribe(
        (res: any) => {
          this.province = res;
          this.dataService.renameKeysObject(this.province, 'PROVINCE_NAME', 'title')
          this.dataService.renameKeysObject(this.province, 'PROVINCE_ID', 'value')
          for(let i in this.province) {
            let data = this.province[i]
            this.dataService.removeKeysObject(this.province, 'GEO_ID')
            this.dataService.removeKeysObject(this.province, 'PROVINCE_CODE')
          }
          console.log(this.province);
        }
      )
  }

  getDistrict(provinceId) {
    this.dataService.getDistrict(provinceId)
      .subscribe(
        (res: any) => {
          this.district = res;
        }
      )
  }

  getSubDistrict(districtId) {
    this.dataService.getSubdistrict(districtId)
      .subscribe(
        (res: any) => {
          this.sub_district = res;
        }
      )
  }

}
