import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../services/validators/validators.service';
import { AlertMessagesService } from '../../../services/alert/alert-messages.service';
import { SmptServerService } from '../../../services/smtp-server/smpt-server.service';
import { FieldValidation } from '../../../interfaces/field-validation.interface';
import { SmtpServer } from '../../../models/smtpserver.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-smtp-server-form',
  templateUrl: './smtp-server-form.component.html',
  styleUrls: ['./smtp-server-form.component.css']
})
export class SmtpServerFormComponent implements OnInit {

  forma: FormGroup;
  formTitle: string;
  isEditing = false;
  smtpServers: SmtpServer;

  constructor(private _smptServerService : SmptServerService,
              private _validatorsService : ValidatorsService,
              private fb: FormBuilder,
              private _alertMessagesService : AlertMessagesService) {
                this.createForm();
              }

  ngOnInit(): void {
    this.formTitle =  'Crear Configuración SMTP';
    this.getSmtpServer();
  }


  isInvalidField(name:string){
    return this.forma.get(name).invalid && this.forma.get(name).touched;
  }

  createForm(){
    this.forma = this.fb.group({
      id: [''],
      host: ['', [Validators.required, Validators.maxLength(150)]],
      port: ['', Validators.required],
      user: ['', [Validators.required, Validators.maxLength(150)]],
      encryption: [''],
      status: [''],
      password: ['', [Validators.required, Validators.maxLength(150)]],
    });
  }

  validateField(control: string) : FieldValidation {
    return this._validatorsService.validateField(this.forma.get(control));
  }

  getSmtpServer(isBtnSearch?:boolean){
    this._alertMessagesService.showMessageLoading();
    this._smptServerService.getAllSmptServers().subscribe(response => {
        if(!response.ok){
          this._alertMessagesService.showMessage('error', response.message);
        }else{
          console.log(response);
          this._alertMessagesService.closeMessage();
          if(response.data !== null){
            this.smtpServers = response.data[0];
          }
          this.showSmtpServer();
        }
      },
      error =>{
        this._alertMessagesService.showMessage('error', error);
        this._alertMessagesService.closeMessage();
      });
  }

  showSmtpServer(){
    if(this.smtpServers !== undefined){
      this.formTitle = 'Editar Configuración SMTP';
      this.isEditing = true;
      this.forma.reset({
        id: this.smtpServers.id,
        host: this.smtpServers.host,
        port: this.smtpServers.port,
        user: this.smtpServers.user,
        password: this.smtpServers.password
      });
    }
  }

  save(){
    // si el formulario es invalido se marca como tocado cada campo y activa las validaciones
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    this._alertMessagesService.showMessageLoading();
    let observable : Observable<any>;
    if(this.isEditing){
      observable = this._smptServerService.updateSmtpServer(this.forma.value);
    }else{
      observable = this._smptServerService.createSmtpServer(this.forma.value);
    }
    
    observable.subscribe(response => {
      console.log('save: ', response);
      if(response === null){
        this._alertMessagesService.showMessage('error', 'se presentó un error en el api');
      }else{
        if(!response.ok){
          this._alertMessagesService.showMessage('error', response.message);
        }else{
          this._alertMessagesService.showMessage('success', response.message, this.forma.get('host').value, false, 2000);
          this.smtpServers = response.data;
          this.showSmtpServer();
        }
      }
    },
    error =>{
      this._alertMessagesService.showMessage('error', error);
    });
  }

}
