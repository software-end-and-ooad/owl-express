import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { AuthenticationService } from '../../shared';
import { MainComponent } from '../main.component';
import { PasswordValidation } from './validation.matchpassword';
import { API } from '../../../../constance/url';

@Component({
  selector: 'main-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../assets/css/style.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  formInvalid: any = {
    email: null,
    tell: null,
    other: null
  };
  submit: boolean = false;
  inputLength: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private mainComponent: MainComponent,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    let inputLength = this.inputLength; // Just lazy to write this.
    inputLength = {
      fullnameMax: 40,
      tellMax: 10,
      tellMin: 9,
      passwordMin: 6,
    }
    this.inputLength = inputLength;

    this.registerForm = this.formBuilder.group({
      fullname: [null, [ Validators.required, Validators.maxLength(inputLength.fullnameMax) ]],
      email: [null, [ Validators.required, Validators.email ]],
      tell: [null, [ Validators.required, Validators.minLength(inputLength.tellMin), Validators.maxLength(inputLength.tellMax) ]],
      type: ['', [ Validators.required ]],
      password: [null, [ Validators.required, Validators.minLength(inputLength.passwordMin) ]],
      repassword: [null, Validators.required]
    }, {validator: PasswordValidation.MatchPassword }) // My validation method

    this.registerForm.get('password').valueChanges.subscribe(
      (validate) => {
        if (validate != this.registerForm.get('repassword').value)
          this.registerForm.get('repassword').setErrors({ MatchPassword: true });
        else
          this.registerForm.get('repassword').updateValueAndValidity();

      });

  }

  register(value: any) {
    this.submit = true; // Set to true for loading icon

    this.http.post(API.api.register, value)
      .subscribe(
        res => {
          setTimeout(() => {
            this.submit = false;
            this.mainComponent.registerModal.nativeElement.click(); // Close modal after success
          }, 1500);

          setTimeout(() => { // Login after all is success
            this.authService.login(value.email, value.password).subscribe(
              (res) => {
                this.router.navigateByUrl('dashboard');
              },
              (err) => {
                console.log('Signin fail');
              }
            )
          }, 2000);
        },
        err => {
          if ( this.router.url == '/register')
            this.router.navigateByUrl('register');
          else
            this.router.navigateByUrl(''); //Need to redirect to present path

          const error = err.error;
          setTimeout(() => {
            this.submit = false;

            if (error.success == false && error.data == 'INVALID_CREDENTIALS')
              this.formInvalid.other = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';

            else if (error.data[0] == 'email_HAS_USED')
              this.formInvalid.email = 'อีเมลนี้ถูกใช้งานแล้ว';

            else
              this.formInvalid.other = 'การเข้าสู่ระบบผิดพลาด กรุณาลองใหม่อีกครั้ง';
          }, 1500);
        }
      );
  }

  public closeModal() {
    this.mainComponent.registerModal.nativeElement.click();
  }

  public routerIsRegister() {
    return this.mainComponent.routerIsRegister();
  }

}
