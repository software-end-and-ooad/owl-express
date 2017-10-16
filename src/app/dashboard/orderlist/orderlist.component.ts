import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { API } from '../../../../constance/url';

declare var $: any;
@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
})
export class OrderListComponent {

  constructor(
    private http: HttpClient,
  ) { }



}
