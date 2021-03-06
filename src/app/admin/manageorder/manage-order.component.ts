import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { DataAdminService } from '../../shared/data.admin.service';
import { API } from '../../../../constance/url';
import { DataService } from '../../shared/data.service';
import { NotificationService } from '../../shared/notification.service';
import { Owlexpress } from '../../../../constance/owlProcess';


@Component({
  selector: 'app-admin-manageorder',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit{

  // ng2-smart-table variable
  private datas: Array<any>; // All user data
  private source: LocalDataSource;
  private rowData: any; // Data per row for edit

  // Form variable
  private editorderForm: FormGroup;
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
  @ViewChild('manageOrderModal') public manageOrderModal: ElementRef; // Give to navbar main for open
  private src_provinces: Array<any> = [{title: 'test', value: 3}]
  private src_districts: Array<any>;
  private src_sub_districts: Array<any>;

  private dest_provinces: Array<any> = [{title: 'test', value: 3}]
  private dest_districts: Array<any>;
  private dest_sub_districts: Array<any>;

  private postmans: any; // Get postman information for selection of postman_id
  private myRole: any;
  private myAccountID: Array<any>;


  public settings = {
    columns: {
      //email: {
        //title: 'อีเมล',
        //width: '1%'
      //},
      fullname: {
        title: 'ชื่อ-สกุล',
      },
      tell: {
        title: 'เบอร์ติดต่อ'
      },
      size: {
        title: 'ขนาด'
      },
      postman_id: {
        title: 'ผู้รับผิดชอบ',
      },
      transport_type: {
        title: 'รูปแบบการส่ง'
      },
      status_content: {
        title: 'สถานะพัสดุ'
      },
      price: {
        title: 'ราคาพัสดุ'
      },
      pickup_date: {
        title: 'วันที่รับล่วงหน้า'
      },
      src_sub_district_content: {
        title: 'ตำบลต้นทาง',
      },
      src_district_content: {
        title: 'อำเภอต้นทาง',
      },
      src_province_content: {
        title: 'จังหวัดต้นทาง',
      },
      src_address_other: {
        title: 'รายละเอียดที่อยู่ต้นทาง',
        width: '9%'
      },
      dest_sub_district_content: {
        title: 'ตำบลปลายทาง',
      },
      dest_district_content: {
        title: 'อำเภอปลายทาง',
      },
      dest_province_content: {
        title: 'จังหวัดปลายทาง',
      },
      dest_address_other: {
        title: 'รายละเอียดที่อยู่ปลายทาง',
        width: '9%'
      },
    },
    actions: {
      add: false,
      edit: true,
      delete: true,
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
      deleteButtonContent: `<div class='btn btn-success btn-sm'><i class='ion-android-done-all'></i></h1>`,
      saveButtonContent: `<div class='btn btn-success btn-sm'><i class='ion-android-done-all'></i></h1>`,
      cancelButtonContent: `<div class='btn btn-danger btn-sm'><i class='ion-android-close'></i></h1>`,
      confirmSave: false,
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
    private notififyService: NotificationService,
    private router: Router,
  ) {
    this.settings.actions.delete = this.router.url.search('officer') > -1? true: false;
    this.settings = Object.assign({}, this.settings)
    this.getAllOrder();
    this.source = new LocalDataSource(this.datas);
    this.getSrcProvince();
    this.getDestProvince();
    this.getPostman();
  }

  ngOnInit() {
    const inputLength = this.inputLength;

    this.editorderForm = this.formBuilder.group({
      fullname: [null], // Init for input value
      tell: [null, [ Validators.required, Validators.minLength(inputLength.tellMin), Validators.maxLength(inputLength.tellMax) ]],
      size: [null, [ Validators.required, Validators.pattern('L|M|S|XL') ]],
      postmanId: [null],
      transportType: [null, [ Validators.required, Validators.pattern('EMS|sameday') ]],
      status: [null, [ Validators.required, Validators.pattern('1|2|3|4|5') ]], // insert status after you sure about value
      price: [null, [ Validators.required, Validators.pattern('[0-9]*') ]],
      pickupDate: ['', [ Validators.pattern('[0-1]{0,1}[0-9]/[0-3]{0,1}[0-9]/[0-9][0-9][0-9][0-9]') ]],
      track: [null], // Defined for send unique id of item to update

      srcSubdistrict: [null, [ Validators.required ]],
      srcDistrict: [null, [ Validators.required ]],
      srcProvince: [null, [ Validators.required ]],
      srcAddressOther: [null, [ Validators.required, Validators.maxLength(255) ]],

      destSubdistrict: [null, [ Validators.required ]],
      destDistrict: [null, [ Validators.required ]],
      destProvince: [null, [ Validators.required ]],
      destAddressOther: [null, [ Validators.required, Validators.maxLength(255) ]],

    })
  }


   async getAllOrder() {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.dataAdminService.getToken()
    })
     // Get role, if admin api will return all order, else api will return only null and my officer_no orders
     const role = await this.dataAdminService.getAdmins().toPromise();
     this.myRole = role.role;
     if (role.role == 'officer')
       this.myAccountID = [{officer_no: role.officer_no}];

    this.http.get(API.adminProtect.getAllOrder + this.myRole, {headers: headers})
      .subscribe(
        (res: any) => {
          this.datas = []

          // Resolve data to Thai language for show in html
          for (let i in res.data) {
            let user = res.data[i]
            for (let j in user.orders) {
              let data = user.orders[j];
              data.src_sub_district_content  = data.src_subdistricts.length  == 0? 'ไม่ระบุ': data.src_subdistricts[0].SUBDISTRICT_NAME; // Not finish yet
              data.src_district_content      = data.src_districts.length     == 0? 'ไม่ระบุ': data.src_districts[0].DISTRICT_NAME; // Not finish yet
              data.src_province_content      = data.src_provinces.length     == 0? 'ไม่ระบุ': data.src_provinces[0].PROVINCE_NAME; // Not finish yet
              data.src_address_other         = data.src_address_other        == null? 'ไม่ระบุ': data.src_address_other;
              data.dest_sub_district_content = data.dest_subdistricts.length == 0? 'ไม่ระบุ': data.dest_subdistricts[0].SUBDISTRICT_NAME; // Not finish yet
              data.dest_district_content     = data.dest_districts.length    == 0? 'ไม่ระบุ': data.dest_districts[0].DISTRICT_NAME; // Not finish yet
              data.dest_province_content     = data.dest_provinces.length    == 0? 'ไม่ระบุ': data.dest_provinces[0].PROVINCE_NAME; // Not finish yet
              data.dest_address_other        = data.dest_address_other       == null? 'ไม่ระบุ': data.dest_address_other;
              data.size                      = data.size                     == 0? 'ไม่ระบุ': data.size;
              data.postman_id                = data.postman_id               == null? 'ยังไม่เข้ารับ': data.postman_id;
              data.transport_type            = data.transport_type;
              data.status_content            = data.status                   == null? Owlexpress.process[0].title: data.status==undefined? Owlexpress.process[0].title: data.status==''? Owlexpress.process[0].title: Owlexpress.process[data.status].title
              data.price                     = data.price                    == null? 'ยังไม่เข้ารับ': data.price;
              data.pickup_date               = this.dataService.dateFormat(data.pickup_date);

              data.fullname = user.fullname
              //data.email = user.email
              data.tell = user.tell

              this.datas.push(data)
            }
          }
          this.source.load(this.datas) // Set data into source

        },
        (err: any) => {
          console.log('Cannot get order list');
        })
  }

  toggleModal() {
    this.manageOrderModal.nativeElement.click();
  }

  editData(event): void {
    this.rowData = event.data;
    console.log(this.rowData);
    // Call source address for current value selection
    if (event.data.src_provinces.length > 0 )
      this.getSrcDistrict(this.rowData.src_provinces[0].PROVINCE_ID);
    if (event.data.src_provinces.length > 0 && event.data.src_districts.length > 0)
      this.getSrcSubDistrict(this.rowData.src_districts[0].DISTRICT_ID);

    // Call dest address for current value selection
    if (event.data.dest_provinces.length > 0 )
      this.getDestDistrict(this.rowData.dest_provinces[0].PROVINCE_ID);
    if (event.data.dest_provinces.length > 0 && event.data.dest_districts.length > 0)
      this.getDestSubDistrict(this.rowData.dest_districts[0].DISTRICT_ID);

    // Map value each form because value in input not work
    this.editorderForm.controls['fullname'].patchValue(event.data.fullname);
    this.editorderForm.controls['tell'].patchValue(event.data.tell);
    this.editorderForm.controls['size'].patchValue(event.data.size==null? '': event.data.size);
    this.editorderForm.controls['price'].patchValue(event.data.price.constructor==String? null: event.data.price);
    this.editorderForm.controls['postmanId'].patchValue(event.data.postman_id=='ยังไม่เข้ารับ'? '': event.data.postman_id);
    this.editorderForm.controls['transportType'].patchValue(event.data.transport_type==null? '': event.data.transport_type);
    this.editorderForm.controls['status'].patchValue(event.data.status==null? '': event.data.status);
    this.editorderForm.controls['pickupDate'].patchValue(event.data.pickup_date==null? '': event.data.pickup_date);
    this.editorderForm.controls['track'].patchValue(event.data.track);

    this.editorderForm.controls['srcProvince'].patchValue(event.data.src_provinces[0]==undefined? '': event.data.src_provinces[0].PROVINCE_ID);
    this.editorderForm.controls['srcDistrict'].patchValue(event.data.src_districts[0]==undefined? '': event.data.src_districts[0].DISTRICT_ID);
    this.editorderForm.controls['srcSubdistrict'].patchValue(event.data.src_subdistricts[0]==undefined? '': event.data.src_subdistricts[0].SUBDISTRICT_ID);
    this.editorderForm.controls['srcAddressOther'].patchValue(event.data.src_address_other==undefined? '': event.data.src_address_other);

    this.editorderForm.controls['destProvince'].patchValue(event.data.dest_provinces[0]==undefined? '': event.data.dest_provinces[0].PROVINCE_ID);
    this.editorderForm.controls['destDistrict'].patchValue(event.data.dest_districts[0]==undefined? '': event.data.dest_districts[0].DISTRICT_ID);
    this.editorderForm.controls['destSubdistrict'].patchValue(event.data.dest_subdistricts[0]==undefined? '': event.data.dest_subdistricts[0].SUBDISTRICT_ID);
    this.editorderForm.controls['destAddressOther'].patchValue(event.data.dest_address_other==undefined? '': event.data.dest_address_other);

    this.toggleModal();
  }


  getSrcProvince() {
    this.dataService.getProvince()
      .subscribe(
        (res: any) => {
          this.src_provinces = res;
          this.src_districts = undefined;
          this.src_sub_districts = undefined;
        },
      )
  }

  getSrcDistrict(srcProvinceId) {
    this.editorderForm.controls['srcSubdistrict'].patchValue('');
    this.editorderForm.controls['srcDistrict'].patchValue('');
    if (srcProvinceId > 0) {
      this.dataService.getDistrict(srcProvinceId)
        .subscribe(
          (res: any) => {
            this.src_districts = res;
            this.src_sub_districts = undefined;
          }
        )
    } else {
      this.src_districts = undefined;
      this.src_sub_districts = undefined;
    }
  }

  getSrcSubDistrict(srcDistrictId) {
    this.editorderForm.controls['srcSubdistrict'].patchValue('');
    if (srcDistrictId > 0) {
      this.dataService.getSubdistrict(srcDistrictId)
        .subscribe(
          (res: any) => {
            this.src_sub_districts = res;
          }
        )
    } else {
      this.src_sub_districts = undefined;
    }
  }


  getDestProvince() {
    this.dataService.getProvince()
      .subscribe(
        (res: any) => {
          this.dest_provinces = res;
          this.dest_districts = undefined;
          this.dest_sub_districts = undefined;
        }
      )
  }

  getDestDistrict(destProvinceId) {
    this.editorderForm.controls['destSubdistrict'].patchValue('');
    this.editorderForm.controls['destDistrict'].patchValue('');
    if (destProvinceId > 0) {
      this.dataService.getDistrict(destProvinceId)
        .subscribe(
          (res: any) => {
            this.dest_districts = res;
            this.dest_sub_districts = undefined;
          }
        )
    } else {
      this.dest_districts = undefined;
      this.dest_sub_districts = undefined;
    }
  }

  getDestSubDistrict(destDistrictId) {
    this.editorderForm.controls['destSubdistrict'].patchValue('');
    if (destDistrictId > 0) {
      this.dataService.getSubdistrict(destDistrictId)
        .subscribe(
          (res: any) => {
            this.dest_sub_districts = res;
          }
        )
    } else {
      this.dest_sub_districts = undefined;
    }
  }

  getPostman() {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.dataAdminService.getToken()
    })

    this.http.get(API.adminProtect.getAllOfficer, {headers: headers})
      .subscribe(
        (res: any) => {
          this.postmans = res.data;
        },
        (err: any) => {
          this.postmans = undefined;
          console.log('Cannot get officers');
        })
  }

  submitEdit(value: any) {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.dataAdminService.getToken()
    })
    // Fix: Edit data not to send if pick_date not change because backend will get present date
    if (this.editorderForm.controls['pickupDate'].value == this.rowData.pickup_date)
      delete value.pickupDate

    this.http.post(API.adminProtect.editOrder, value, {headers: headers})
      .subscribe(
        (res: any) => {
          this.getAllOrder();
          this.toggleModal();
          this.inputLength.other = undefined;
          this.notififyService.showNotification('success', 'แก้ไขพัสดุเรียบร้อยแล้ว', '');
        },
        (err: any) => {
          this.inputLength.other = 'กรุณาตรวจสอบการกรอกข้อมูลให้ถูกต้อง และ ครบถ้วน';
          console.log(err);
          console.log('error');
        }
      )
  }

  acceptOrder(value: any) {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.dataAdminService.getToken()
    })

    const data = {track: value.data.track}

    this.http.put(API.adminProtect.acceptOrder, data, {headers: headers})
      .subscribe(
        (res: any) => {
          this.notififyService.showNotification('success', 'ยอมรับการเข้ารับพัสดุแล้ว', '');
          this.getAllOrder();
        },
        (err: any) => {
          console.log(err.error.data);
          console.log('error');
        }
      )
  }

}
