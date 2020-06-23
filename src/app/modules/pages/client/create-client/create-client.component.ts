import { Component, OnInit } from '@angular/core';
import { DocumentTypeService } from '../../../services/documenttype/document-type.service';
import { DocumentType } from '../../../models/documenttype.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StatusService } from '../../../services/status/status.service';

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

  constructor(private _documentTypeService : DocumentTypeService,
              private _statusService : StatusService,
              private fb: FormBuilder) {
    this.getSourceDocumentType();
    this.getSourceStatus();
    this.createForm();
  }

  ngOnInit(): void {


  }

  createForm(){
    this.forma = this.fb.group({
      name: ['Liseth', Validators.required],
      documenttype: ['', Validators.required],
      documentnumber: ['', Validators.required],
      department: ['', Validators.required],
      city: ['', Validators.required],
      homeaddres: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      status: ['', Validators.required],
      observations: ['', Validators.required]
    });
  }

  getSourceDocumentType(){
    this._documentTypeService.listAll().subscribe(response => {
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
    this._statusService.getAllStatusOfClientModule().subscribe(response => {
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

  guardar(){

  }

}
