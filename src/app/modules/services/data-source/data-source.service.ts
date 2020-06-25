import { Injectable } from '@angular/core';
import { DocumentTypeService } from '../documenttype/document-type.service';
import { StatusService } from '../status/status.service';
import { DepartmentService } from '../department/department.service';
import { CityService } from '../city/city.service';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(private _documentTypeService : DocumentTypeService,
              private _statusService : StatusService,
              private _departmentService : DepartmentService,
              private _cityService : CityService) { }


  async getDataSourceDocumentType() : Promise<any[]> {
    let response = await this._documentTypeService.listAllDocumentTypeOfClientModule().toPromise();
    return this.manipulateData(response.data);
  }

  async getDataSourceStatus() : Promise<any[]> {
    let response = await this._statusService.listAllStatusOfClientModule().toPromise();
    return this.manipulateData(response.data);
  }

  async getDataSourceDepartment() : Promise<any[]> {
    let response = await  this._departmentService.listAll().toPromise();
    return this.manipulateData(response.data);
  }

  async getDataSourceCitiesOfDepartment(departmentId : number) : Promise<any[]>{
    let response = await  this._cityService.listAllCitiesOfDepartment(departmentId).toPromise();
    return this.manipulateData(response.data);
  }

  manipulateData(data: any) : any[]{
    let dataSource = [];
    if(data !== null){
      dataSource = data;
      dataSource.unshift({
        id: '',
        name: 'Seleccione uno'
      });
    }
    return dataSource;
  }
}
