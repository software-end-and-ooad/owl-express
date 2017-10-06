import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { AuthenticationService } from '../../shared';
import { PasswordValidation } from '../register/validation.matchpassword';

@Component({
  selector: 'main-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['../../../assets/css/style.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  formInvalid: string;
  submit: boolean = false;
  inputLength: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
  ) {}

  ngOnInit() {
    let inputLength = this.inputLength; // Just lazy to write this.
    inputLength = {
      passwordMin: 6,
    }
    this.inputLength = inputLength;

    this.resetForm = this.formBuilder.group({
      password: [null, [ Validators.required, Validators.minLength(inputLength.passwordMin) ]],
      repassword: [null, Validators.required]
    }, {validator: PasswordValidation.MatchPassword }) // My validation method

    this.resetForm.get('password').valueChanges.subscribe(
      (validate) => {
        if (validate != this.resetForm.get('repassword').value)
          this.resetForm.get('repassword').setErrors({ MatchPassword: true });
        else
          this.resetForm.get('repassword').updateValueAndValidity();

      });

    this.resetForm = this.formBuilder.group({
      // New password
      password: [null, [ Validators.required, Validators.minLength(6) ]],
      repassword: [null, [ Validators.required ]],
    }, {validator: PasswordValidation.MatchPassword })
  }

  public resetPassword(value: any) {
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
