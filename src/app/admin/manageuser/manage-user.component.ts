import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

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

  private source: LocalDataSource;
  private province: Array<any> = [{title: 'test', value: 3}]
  private district: Array<any>;
  private sub_district: Array<any>;
  private datas: Array<any>;

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
      sub_district_content: {
        title: 'ตำบล',
      },
      district_content: {
        title: 'อำเภอ',
      },
      province_content: {
        title: 'จังหวัด',
      },
      address_other_content: {
        title: 'รายละเอียดที่อยู่'
      },
      subscribe_sms_content: {
        title: 'การรับข่าวสารผ่าน SMS'
      },
      subscribe_line_content: {
        title: 'การรับข่าวสารผ่าน Line'
      },
      activated_content: {
        title: 'ยืนยันบัญชี',
      },
      /*
       *id: { // Manage
       *  title: 'จัดการ',
       *  type: 'custom',
       *  renderComponent: EditUserComponent,['district']
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
    private dataService: DataService
  ) {
    this.getAllUser();
    this.source = new LocalDataSource(this.datas);
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
            data.sub_district_content   = data.sub_districts.length   == 0? 'ไม่ระบุ': data.sub_districts[0].SUBDISTRICT_NAME; // Not finish yet
            data.district_content       = data.districts.length       == 0? 'ไม่ระบุ': data.districts[0].DISTRICT_NAME; // Not finish yet
            data.province_content       = data.provinces.length       == 0? 'ไม่ระบุ': data.provinces[0].PROVINCE_NAME; // Not finish yet
            data.address_other_content  = data.address_other  == null? 'ไม่ระบุ': data['address_other']; // Not finish yet
            data.subscribe_sms_content  = data.subscribe_sms  == false? 'ไม่ได้สมัคร': 'สมัครแล้ว'; // Not finish yet
            data.subscribe_line_content = data.subscribe_line == null? 'ไม่ได้สมัคร': 'สมัครแล้ว'; // Not finish yet
            data.activated_content      = data.activated      == false? 'ยังไม่ได้ยืนยันตัวตน': 'ยืนยันตัวตนแล้ว'; // Not finish yet
          }
          this.source.load(this.datas)
        },
        (err: any) => {
          console.log('Cannot get order list');
        })
  }


  editData(event): void {
    console.log(event)
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.dataAdminService.getToken()
    })

    if (window.confirm('ยืนยันการเปลี่ยนแปลงข้อมูลของ ' + event.data.fullname)) {
      /*
       *event.newData.sub_district = event['newData']['sub_district_content']=='ไม่ระบุ' || event['newData']['sub_district_content']==''? null: this.dataService.findObjectId(this.sub_district, 'title', event.newData.sub_district_content, 'SUBDISTRICT_ID'); // Not finish yet
       *event.newData.district = event['newData']['district_content']=='ไม่ระบุ' || event['newData']['district_content']==''? null: this.dataService.findObjectId(this.district, 'title', event.newData.district_content, 'DISTRICT_ID'); // Not finish yet
       *event.newData.province = event['newData']['province_content']=='ไม่ระบุ' || event['newData']['province_content']==''? null: this.dataService.findObjectId(this.province, 'title', event.newData.province_content, 'PROVINCE_ID'); // Not finish yet
       *event.newData.address_other = event['newData']['address_other_content']; // Not finish yet
       *event.newData.subscribe_sms = event['newData']['subscribe_sms_content']=='สมัครแล้ว'? true: false; // Not finish yet
       *event.newData.subscribe_line = event['newData']['subscribe_line_content']=='สมัครแล้ว'? true: false; // Not finish yet
       *event.newData.activated = event['newData']['activated_content']=='ยืนยันตัวตนแล้ว'? true: false; // Not finish yet
       */
      event.confirm.resolve(event.newData);

      //this.http.put(API.adminProtect.edituser, {headers: headers});
    } else {
      event.confirm.reject();
    }
  }


  getProvince() {
    this.dataService.getProvince()
      .subscribe(
        (res: any) => {
          this.province = res;
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
