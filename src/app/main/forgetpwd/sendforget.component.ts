import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
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
    /*
     *    this.submit = true;
     *    this.authService.login(value.email, value.password)
     *      .subscribe(
     *        res => {
     *          setTimeout(() => {
     *            this.submit = false;
     *            this.formInvalid = null;
     *            this.mainComponent.loginModal.nativeElement.click();
     *          }, 1500);
     *
     *          setTimeout(() => {
     *            this.router.navigateByUrl('dashboard');
     *          }, 2000);
     *        },
     *        err => {
     *          if ( this.router.url == '/login')
     *            this.router.navigateByUrl('login');
     *          else
     *            this.router.navigateByUrl('');
     *
     *          const error = err.error;
     *
     *          setTimeout(() => {
     *            this.submit = false;
     *            if (error.success == false && error.data == 'INVALID_CREDENTIALS')
     *              this.formInvalid = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
     *            else
     *              this.formInvalid = 'การเข้าสู่ระบบผิดพลาด กรุณาลองใหม่อีกครั้ง';
     *          }, 1500);
     *        }
     *      );
     */
  }


}
