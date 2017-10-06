import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { API } from '../../../../constance/url';

@Component({
  selector: 'main-sendforget',
  templateUrl: './sendforget.component.html',
  styleUrls: ['../../../assets/css/style.css']
})
export class SendForgetComponent implements OnInit {

  forgetForm: FormGroup;
  formInvalid: string;
  submit: boolean = false;
  sent: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.forgetForm = this.formBuilder.group({
      email: [null, [ Validators.required, Validators.email ]],
    })
  }

  public sendForget(value: any) {
    this.submit = true;
    this.http.post(API.api.forgetpwd, value)
      .subscribe(
        (res: any) => {
          setTimeout(() => {
            this.submit = false;
            this.sent = true;
          }, 1500)
        },
        (err: any) => {
          this.router.navigateByUrl('forget-password')
          setTimeout(() => {
            this.submit = false;
            this.sent = true
          }, 1500)
        },
      )
  }


}
