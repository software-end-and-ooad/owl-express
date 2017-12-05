import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { API } from '../../../../../constance/url';
import { DataAdminService } from '../../../shared/data.admin.service';

interface DataStatus {
  sumUser: number;
  allUser: Array<Object>;
  sumOrder: number;
  sumOrderNotSend: number;
  sumOrderSending: number;
  sumOrderSent: number;
}

@Component({
  selector: 'app-adminstatus',
  templateUrl: './status.admin.component.html',
})

export class AdminStatusComponent implements OnInit{

  private dataStatus: DataStatus = {
    sumUser: 0,
    sumOrder: 0,
    sumOrderNotSend: 0,
    sumOrderSending: 0,
    sumOrderSent: 0,
    allUser: []
  };

  constructor(
    private http: HttpClient,
    private dataAdminService: DataAdminService,
  ) { }

  ngOnInit() {
    const headers = new HttpHeaders({
      'Authorization': 'bearer ' + this.dataAdminService.getToken()
    })
    this.getUser(headers);
  }

  getUser(headers: HttpHeaders) {

    this.http.get(API.adminProtect.getAllOrder + 'admin', {headers: headers})
      .subscribe(
        (res: any) => {
          this.dataStatus.sumUser = res.data.length;
          this.dataStatus.allUser = res.data;
          this.getOrder(res.data);
        })
  }

  getOrder(users: any[]) {
    let order_sending = 0;
    let order_notsend = 0;

    users.map((user, i) => {
      this.dataStatus.sumOrder = user.orders.length;

      user.orders.map((order, i) => {
        if (order.status <= 1)
          order_notsend += 1
        else if (user.orders[i].status < 5)
          order_sending += 1
      })
    })

    this.dataStatus.sumOrderNotSend = order_notsend;
    this.dataStatus.sumOrderSending = order_sending;
    this.dataStatus.sumOrderSent = this.dataStatus.sumOrder - (order_notsend + order_sending);
  }

}
