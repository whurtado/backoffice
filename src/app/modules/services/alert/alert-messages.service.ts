import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertMessagesService {

  constructor() { }

  showMessageLoading(text: string = 'Espere por favor...', title:string = ''){
    this.closeMessage();
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: title,
      text: text
    });
    Swal.showLoading();
  }

  showMessage(icon : SweetAlertIcon, message: string, title:string = '', showConfirmButton: boolean = true, timer: number = null){
    this.closeMessage();

    Swal.fire({
      position: 'center',
      icon: icon,
      title: title,
      text: message,
      showConfirmButton: showConfirmButton,
      timer: timer
    });
  }

  closeMessage(){
    Swal.close();
  }



}
