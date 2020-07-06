import { Injectable } from '@angular/core';
import { DocumentTypeService } from '../documenttype/document-type.service';
import { StatusService } from '../status/status.service';
import { DepartmentService } from '../department/department.service';
import { CityService } from '../city/city.service';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  static CLIENT_MUDULE_ID : number = 6;
  static SMTP_MUDULE_ID : number = 8;

  constructor(private _documentTypeService : DocumentTypeService,
              private _statusService : StatusService,
              private _departmentService : DepartmentService,
              private _cityService : CityService) { }


  async getDataSourceDocumentType() : Promise<any[]> {
    let response = await this._documentTypeService.listAllDocumentTypeOfClientModule().toPromise();
    return this.manipulateData(response.data, 'un Tipo Documento');
  }

  async getDataSourceStatusOfClientModule() : Promise<any[]> {
    let response = await this._statusService.listAllStatusByModule(DataSourceService.CLIENT_MUDULE_ID).toPromise();
    return this.manipulateData(response.data, 'un Estado');
  }

  async getDataSourceStatusOfSmtpServerModule() : Promise<any[]> {
    let response = await this._statusService.listAllStatusByModule(DataSourceService.SMTP_MUDULE_ID).toPromise();
    return this.manipulateData(response.data, 'un Estado');
  }

  async getDataSourceDepartment() : Promise<any[]> {
    let response = await  this._departmentService.listAll().toPromise();
    return this.manipulateData(response.data, 'un Departamento');
  }

  async getDataSourceCitiesOfDepartment(departmentId : number) : Promise<any[]>{
    let response = await  this._cityService.listAllCitiesOfDepartment(departmentId).toPromise();
    return this.manipulateData(response.data, 'una Ciudad');
  }

  getDataSourceSmtpServerEncryption(){
    let array :any = [];
    array[0] = {
      value: "",
      text: "Seleccione un Cifrado"
    };

    array[1] = {
      value: "TLS",
      text: "Transport Layer Security (TLS)"
    };

    array[2] = {
      value: "SSL",
      text: "Secure Sockets Layer (SSL)"
    };
    return array;
  }

  manipulateData(data: any, name: string) : any[]{
    let dataSource = [];
    if(data !== null){
      dataSource = data;
      dataSource.unshift({
        id: '',
        name: `Seleccione ${name}`
      });
    }
    return dataSource;
  }
}
