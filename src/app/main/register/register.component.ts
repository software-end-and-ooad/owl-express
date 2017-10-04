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
    domain: null,
    studentid: null, //email
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
      passwordMin: 6,
      nameMax: 40,
      studentidMax: 38,
      facultyMax: 40,
      domainMin: 4,
      domainMax: 14,
    }
    this.inputLength = inputLength;

    this.registerForm = this.formBuilder.group({
      name: [null, [ Validators.required, Validators.maxLength(inputLength.nameMax) ]],
      studentid: [null, [ Validators.required, Validators.maxLength(inputLength.studentidMax) ]],
      role: ['', [ Validators.required ]],
      faculty: ['', [ Validators.maxLength(inputLength.facultyMax) ]],
      domain: [null, Validators.compose([ Validators.required, Validators.minLength(inputLength.domainMin), Validators.maxLength(inputLength.domainMax), Validators.pattern('[a-zA-Z]+[0-9\-]*[A-Za-z0-9]+$') ])],
      password: [null, [ Validators.required, Validators.minLength(inputLength.passwordMin) ]],
      repassword: [null, Validators.required]
    }, {validator: PasswordValidation.MatchPassword }) // My validation method

    this.registerForm.get('role').valueChanges.subscribe(
      (validate) => {
        if (validate == 'student')
          this.registerForm.get('faculty').setValidators([Validators.required]);

        else if (validate == 'teacher')
          this.registerForm.get('faculty').setValue('');

        this.registerForm.get('faculty').updateValueAndValidity();
      });

    this.registerForm.get('password').valueChanges.subscribe(
      (validate) => {
        if (validate != this.registerForm.get('repassword').value)
          this.registerForm.get('repassword').setErrors({ MatchPassword: true })
        else
          this.registerForm.get('repassword').updateValueAndValidity();

      });

    this.registerForm.valueChanges.subscribe(
      () => {
        this.formInvalid = { // Remove backend validate everytimes submit has clicked
          domain: null,
          studentid: null,
          other: null
        }
      }
    )
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
            this.authService.login(value.studentid, value.password).subscribe(
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

            else if (error.data[0] == 'studentid_HAS_USED')
              this.formInvalid.studentid = 'ชื่อผู้ใช้นี้ถูกใช้งานแล้ว';

            else if (error.data[0] == 'domain_HAS_USED')
              this.formInvalid.domain = 'โดเมนนี้ถูกใช้งานแล้ว';

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
