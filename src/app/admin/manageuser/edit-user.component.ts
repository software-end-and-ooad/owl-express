import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { DataService } from '../../shared/data.service';
import { ManageUserComponent } from './manage-user.component';

@Component({
  selector: 'app-edituser',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit {

  private edituserForm: FormGroup;
  private formInvalid: string;
  private submit: boolean = false;
  private province: Array<any>;
  private district: Array<any>;
  private subdistrict: Array<any>;
  private inputLength = {
    tellMin: 9,
    tellMax: 10,
    fullnameMax: 40,
  }

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private manageUserModal: ManageUserComponent
  ) {
  }

  ngOnInit() {
    const inputLength = this.inputLength;

    this.edituserForm = this.formBuilder.group({
      email: [null, [ Validators.required, Validators.email ]],
      fullname: [null, [ Validators.required, Validators.maxLength(inputLength.fullnameMax) ]],
      tell: [null, [ Validators.required, Validators.minLength(inputLength.tellMin), Validators.maxLength(inputLength.tellMax) ]],
      subdistrict: [null, [ Validators.required, Validators.email ]],
      district: [null, [ Validators.required, Validators.email ]],
      province: [null, [ Validators.required, Validators.email ]],
      address_other: [null, [ Validators.required, Validators.email ]],
      subscribe_sms: [null, [ Validators.required, Validators.email ]],
      subscribe_line: [null, [ Validators.required, Validators.email ]],
      activate: [null, [ Validators.required, Validators.email ]],
    })
  }



}
