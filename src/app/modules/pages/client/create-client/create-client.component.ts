import { Component, OnInit } from '@angular/core';
import { DocumentTypeService } from '../../../services/documenttype/document-type.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StatusService } from '../../../services/status/status.service';
import { DepartmentService } from '../../../services/department/department.service';
import { CityService } from '../../../services/city/city.service';
import { ClientService } from '../../../services/client/client.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  forma: FormGroup;
  dataSourceDocumentType : any[] = [];
  dataSourceDepartment : any[] = [];
  dataSourceCity : any[] = [];
  dataSourceStatus : any[] = [];

  constructor(private _clientService: ClientService,
              private _documentTypeService : DocumentTypeService,
              private _statusService : StatusService,
              private _departmentService : DepartmentService,
              private _cityService : CityService,
              private fb: FormBuilder) {
    this.getSourceDocumentType();
    this.getSourceStatus();
    this.getSourceDepartment();
    this.createForm();
    this.createListeners();
  }

  ngOnInit(): void {}

  createForm(){
    this.forma = this.fb.group({
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

  isInvalidField(name:string){
    return this.forma.get(name).invalid && this.forma.get(name).touched;
  }

  guardar(){
    // si el formulario es invalido se marca como tocado cada campo y activar la validación
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    this.showMessageLoading();

    this._clientService.createClient(this.forma.value).subscribe(response => {
      this.closeMessage();
      if(response.ok){
        this.showMessage('success', response.message, false, 2000);
      }else{
        this.showMessage('error', response.message);
      }
    },error => {
      console.log('error: ', error);
      this.closeMessage();
    });

    //limpiar formulario
    //this.forma.reset();
  }

  showMessageLoading(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
  }

  showMessage(icon : SweetAlertIcon, message: string, showConfirmButton: boolean = true, timer: number = null){
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

  getSourceDocumentType(){
    this._documentTypeService.listAllDocumentTypeOfClientModule().subscribe(response => {
        this.dataSourceDocumentType = response.data;
        this.dataSourceDocumentType.unshift({
          id: '',
          name: 'Seleccione uno'
        });
    },
    error => {
        console.log('error: ', error);
    });
  }

  getSourceStatus(){
    this._statusService.listAllStatusOfClientModule().subscribe(response => {
        this.dataSourceStatus = response.data;
        this.dataSourceStatus.unshift({
          id: '',
          name: 'Seleccione uno'
        });
    },
    error => {
        console.log('error: ', error);
    });
  }

  getSourceDepartment(){
    this._departmentService.listAll().subscribe(response => {
        this.dataSourceDepartment = response.data;
        this.dataSourceDepartment.unshift({
          id: '',
          name: 'Seleccione uno'
        });
    },
    error => {
        console.log('error: ', error);
    });
  }

  getSourceCitiesOfDepartment(departmentId : number){
    this._cityService.listAllCitiesOfDepartment(departmentId).subscribe(response => {
      this.dataSourceCity = response.data;
      this.dataSourceCity.unshift({
          id: '',
          name: 'Seleccione uno'
      });
      this.forma.get('city').setValue('');
    });
  }

  createListeners(){
     // escuchar un campo en especifico
    this.forma.get('department').valueChanges.subscribe(
      value => this.getSourceCitiesOfDepartment(value)
    );
  }



}
