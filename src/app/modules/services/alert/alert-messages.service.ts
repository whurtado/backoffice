import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertMessagesService {

  constructor() { }

  showMessageLoading(text: string = 'Espere por favor...'){
    this.closeMessage();
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: text
    });
    Swal.showLoading();
  }

  showMessage(icon : SweetAlertIcon, message: string, showConfirmButton: boolean = true, timer: number = null){
    this.closeMessage();

    Swal.fire({
      position: 'center',
      icon: icon,
      title: message,
      showConfirmButton: showConfirmButton,
      timer: timer
    });
  }

  closeMessage(){
    Swal.close();
  }



}
