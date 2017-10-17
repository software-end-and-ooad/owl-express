import { Injectable } from '@angular/core';

declare var $: any;

@Injectable()
export class NotificationService {

  constructor() { }

  showNotification(color, message){
    var type = {
      white: '',
      primary: 'primary',
      info: 'info',
      success: 'success',
      warning: 'warning',
      danger: 'danger'
    };


    $.notify({
      message: message
    },{
      type: type[color],
      timer: 4000,
      placement: {
        from: 'bottom',
        align: 'right'
      }
    });
  }

}
