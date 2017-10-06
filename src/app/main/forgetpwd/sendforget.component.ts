import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
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
  ) {}

  ngOnInit() {
    this.forgetForm = this.formBuilder.group({
      email: [null, [ Validators.required, Validators.email ]],
    })
  }

  public sendForget(value: any) {
    this.submit = true;
    console.log(value);
    this.http.post(API.api.forgetpwd, value)
      .subscribe(
        (res: any) => {
          setTimeout(() => {
            this.sent = true;
          }, 1500)
        },
        (err: any) => {
          setTimeout(() => {
            this.sent = false;
          }, 1500)
        },
        () => {
          setTimeout(() => {
            this.submit = false;
          }, 1500)
        }
      )
  }


}
