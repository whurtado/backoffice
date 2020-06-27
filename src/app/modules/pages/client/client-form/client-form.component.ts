import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client/client.service';
import { AlertMessagesService } from '../../../services/alert/alert-messages.service';
import { DataSourceService } from '../../../services/data-source/data-source.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class CreateClientComponent implements OnInit {

  forma: FormGroup;
  formTitle = 'Crear Cliente';
  isEditing = false;
  dataSourceDocumentType : any[] = [];
  dataSourceDepartment : any[] = [];
  dataSourceCity : any[] = [];
  dataSourceStatus : any[] = [];
  clientId : number = null;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private _clientService: ClientService,
              private _alertMessagesService : AlertMessagesService,
              private _dataSourceService : DataSourceService,
              private fb: FormBuilder) {
    this.clientId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getSourceDocumentType();
    this.getSourceStatus();
    this.getSourceDepartment();
    this.createForm();
    this.createListeners();
  }

  ngOnInit(): void {
    if(this.clientId){
      this.formTitle = 'Editar Cliente';
      this.isEditing = true;
      this.showClient();
    }
  }

  async getSourceDocumentType(){
    this.dataSourceDocumentType = await this._dataSourceService.getDataSourceDocumentType();
  }

  async getSourceStatus(){
    this.dataSourceStatus = await this._dataSourceService.getDataSourceStatus();
  }

  async getSourceDepartment(){
    this.dataSourceDepartment = await this._dataSourceService.getDataSourceDepartment();
  }

  async getSourceCitiesOfDepartment(departmentId : number){
    this.dataSourceCity = await this._dataSourceService.getDataSourceCitiesOfDepartment(departmentId);
  }

  isInvalidField(name:string){
    return this.forma.get(name).invalid && this.forma.get(name).touched;
  }

  createForm(){
    this.forma = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      documenttype: ['', Validators.required],
      documentnumber: ['', [Validators.required, Validators.maxLength(15)]],
      department: ['', Validators.required],
      city: ['', Validators.required],
      homeaddres: ['', Validators.required],
      phone: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.maxLength(150), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      status: ['', Validators.required],
      observations: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  createListeners(){
    // escuchar un campo en especifico
    this.forma.get('department').valueChanges.subscribe(
      value => {
        this.forma.get('city').setValue('');
        this.getSourceCitiesOfDepartment(value)
      }
    );
  }

  async showClient(){
    let response = await this._clientService.getClient(this.clientId).toPromise();
    if(!response.ok){
      this._alertMessagesService.showMessage('error', response.message);
    }else{
      let client : Client = response.data;
      this.forma.reset({
        id: client.id,
        name: client.name,
        documenttype: client.documenttype.id,
        documentnumber: client.documentnumber,
        department: client.city.department.id,
        city: client.city.id,
        homeaddres: client.homeaddres,
        phone: client.phone,
        email: client.email,
        status: client.status.id,
        observations: client.observations,
      });
      //console.log( this.forma.value);
    }
  }

  async save(){
    // si el formulario es invalido se marca como tocado cada campo y activa las validaciones
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    let response = null;
    this._alertMessagesService.showMessageLoading();

    if(this.isEditing){
      response = await this._clientService.updateClient(this.forma.value).toPromise();
    }else{
      response = await this._clientService.createClient(this.forma.value).toPromise();
    }

    if(response === null){
      this._alertMessagesService.showMessage('error', 'se presentó un error en el api');
    }else{
      if(!response.ok){
        this._alertMessagesService.showMessage('error', response.message);
      }else{
        this._alertMessagesService.showMessage('success', response.message, this.forma.get('name').value, false, 2000);
        this.cleanForm();
      }
    }
  }

  cleanForm(){
    if(!this.isEditing){
      this.forma.reset();
    }else{
      this.router.navigate(['cliente','listar-clientes']);
    }
  }
}
