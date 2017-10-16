import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { API } from '../../../../constance/url';
import { DataService } from '../../shared/data.service';
import { Owlexperss } from '../../../../constance/owlProcess';

declare var $: any;
@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
})
export class OrderListComponent {
  private datas: Object;
  private headerRows: Array<any>;

  constructor(
    private http: HttpClient,
    private dataService: DataService,
  ) {
    this.headerRows = [ 'Track', 'ขนาด', 'ราคา', 'สถานะการชำระเงิน', 'สถานะ', 'การชำระเงิน', 'รูปแบบการส่ง', 'วันที่รับล่วงหน้า'];
    this.getOrderList();
  }


  getOrderList() {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.dataService.getToken()
    })
    this.http.get(API.protect.orderList, {headers: headers})
      .subscribe(
        (res: any) => {
          this.datas = res.data;
          // Resolve data to Thai language for show in html
          for (let i in this.datas) {
            let data = this.datas[i];
            data['size'] = data['size']==''? 'ไม่กำหนด': data['size'];
            data['price'] = data['price']==null||data['price']<=0? '-': data['price'];
            data['payment_type'] = data['payment_type']=='dest'? 'ชำระปลายทาง': 'ชำระด้วยการโอน';
            data['status'] = data['status']==null? Owlexperss.process.first: data['status']; // Not finish yet
            data['payment_status'] = data['payment_status']=='NOT'? 'รอการชำระ': 'ชำระแล้ว';
            data['payment_status'] = data['payment_status']=='NOT'? 'รอการชำระ': 'ชำระแล้ว';
            //data['pickup_date'] = data['pickup_date'].substring(0, data['pickup_date'].indexOf('T'))
            let getMonth = new Date(data['pickup_date']).getMonth()
            let tmp = +getMonth + 1 // Month + 1
            let month = tmp.toString()
            data['pickup_date'] = new Date( data['pickup_date'] ).getDate() + '-' + month +  '-' + new Date(data['pickup_date']).getFullYear()
          }
        },
        (err: any) => {
          console.log('Cannot get order list');
        }
      )
  }

}
