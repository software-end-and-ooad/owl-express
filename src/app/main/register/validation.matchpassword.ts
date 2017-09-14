import { AbstractControl } from '@angular/forms';

export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       const password = AC.get('password').value; // to get value in input tag
       const repassword = AC.get('repassword').value; // to get value in input tag

        if(password != repassword) {
            AC.get('repassword').setErrors( {MatchPassword: true} );
        } else {
            return null;
        }
    }
}
