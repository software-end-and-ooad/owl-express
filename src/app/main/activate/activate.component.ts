import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { API } from '../../../../constance/url';

@Component({
  selector: 'main-sendactivate',
  template: ``
})
export class ActivateComponent implements OnInit {

  private tokenId: String;

  constructor(
    private router: Router,
    private http: HttpClient,
    private routerActivate: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.tokenId = this.routerActivate.snapshot.params['tokenId']
  }

  public redirect() {
    this.http.get(API.api.activate + this.tokenId)
      .subscribe(
        (res: any) => {
          console.log('success');
          this.router.navigateByUrl('dashboard');
        },
        (error: any) => {
          console.log('Cannot redirect to activate account');
        }
      )
  }

}
