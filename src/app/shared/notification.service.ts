import { Injectable } from '@angular/core';

declare var $: any;

@Injectable()
export class NotificationService {

  constructor() { }

  showNotification(color, title, message){
    var type = {
      white: '',
      primary: 'primary',
      info: 'info',
      success: 'success',
      warning: 'warning',
      danger: 'danger'
    };


    $.notify({
      message: `<h4><strong>${title}</strong></h4><h5>${message}</h5>`
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
