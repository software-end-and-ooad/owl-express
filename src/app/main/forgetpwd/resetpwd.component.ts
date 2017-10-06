import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { PasswordValidation } from '../register/validation.matchpassword';
import { API } from '../../../../constance/url';

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
  private tokenId: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private http: HttpClient,
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

     this.tokenId = this.activateRoute.snapshot.params['tokenId']
  }

  public resetPassword(value: any) {
    this.submit = true;
    this.http.post(API.api.resetpwd, {password: value.password, token: this.tokenId})
      .subscribe(
        (res: any) => {
          setTimeout(() => {
            this.submit = false;
          }, 1500)
          // Alert here
        },
        (err: any) => {
          this.router.navigateByUrl('reset-password/'+this.tokenId)
          setTimeout(() => {
            this.submit = false;
            this.formInvalid = 'ไม่สามารถเปลี่ยนรหัสผ่านได้'
          }, 1500)
        }
      )
  }


}
