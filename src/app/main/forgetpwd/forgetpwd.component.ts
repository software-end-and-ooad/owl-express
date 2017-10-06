import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { AuthenticationService } from '../../shared';
import { PasswordValidation } from '../register/validation.matchpassword';

@Component({
  selector: 'main-forgetpwd',
  templateUrl: './forgetpwd.component.html',
  styleUrls: ['../../../assets/css/style.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetForm: FormGroup;
  formInvalid: string;
  submit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.forgetForm = this.formBuilder.group({
      // New password
      password: [null, [ Validators.required, Validators.email ]],
      repassword: [null, [ Validators.required ]],
    }, {validator: PasswordValidation.MatchPassword })
  }

  public ResetPassword(value: any) {
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
