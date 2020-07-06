import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client/client.service';
import { Client } from '../../../models/client.model';
import { AlertMessagesService } from '../../../services/alert/alert-messages.service';
import { DataSourceService } from '../../../services/data-source/data-source.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  //form
  forma: FormGroup;
  clients: Client[] = [];
  dataSourceDocumentType: any[] = [];
  dataSourceDepartment: any[] = [];
  dataSourceCity: any[] = [];
  dataSourceStatus: any[] = [];
  isSearch: boolean = false;

  //filter
  filters: any;

  //pagination
  limitData: number = 3;
  currentPage: number = 1;
  pagesForEachGroup: number = 3;
  currentPageGroup: number = 1;
  arrayPagesNumbers: number[] = [];
  totalPages: number;
  startPage: number;
  endPage: number;
  totalPageGroups: number;

  constructor(private _clientService : ClientService,
              private _alertMessagesService: AlertMessagesService,
              private _dataSourceService : DataSourceService,
              private fb: FormBuilder) {
    this.getSourceDocumentType();
    this.getSourceStatus();
    this.getSourceDepartment();
    this.createForm();
    this.createListeners();
    this.setPageValues();
  }

  ngOnInit(): void {
    this.listAllClients();
  }

  async getSourceDocumentType(){
    this.dataSourceDocumentType = await this._dataSourceService.getDataSourceDocumentType();
  }

  async getSourceStatus(){
    this.dataSourceStatus = await this._dataSourceService.getDataSourceStatusOfClientModule();
  }

  async getSourceDepartment(){
    this.dataSourceDepartment = await this._dataSourceService.getDataSourceDepartment();
  }

  async getSourceCitiesOfDepartment(departmentId : number){
    this.dataSourceCity = await this._dataSourceService.getDataSourceCitiesOfDepartment(departmentId);
  }

  createForm(){
    this.forma = this.fb.group({
      id: [''],
      name: [''],
      documenttype: [''],
      documentnumber: [''],
      department: [''],
      city: [''],
      status: ['']
    });
  }

  createListeners(){
    // escuchar un campo en especifico
    this.forma.get('department').valueChanges.subscribe(
      value => {
        this.forma.get('city').setValue('');
        if(value > 0){
          this.getSourceCitiesOfDepartment(value);
        }
      }
    );
  }

  listAllClients(isBtnSearch?:boolean){
    this._alertMessagesService.showMessageLoading();
    this._clientService.getAllClientsPaginated(this.currentPage, this.limitData, this.filters).subscribe(response => {
        if(!response.ok){
          this._alertMessagesService.showMessage('error', response.message);
        }else{
          console.log(response.data);
          this.clients = response.data.data;
          this.currentPage = response.data.page;
          this.totalPages = response.data.totalPages;
          this.totalPageGroups = Math.ceil(this.totalPages / this.pagesForEachGroup);
          console.log('totalPageGroups: ', this.totalPageGroups);
          console.log('this.filters: ', this.filters);
          this.setPageValues();
          this.pagesNumbers();
          this._alertMessagesService.closeMessage();
        }
      },
      error =>{
        this._alertMessagesService.showMessage('error', error);
        this._alertMessagesService.closeMessage();
      });
  }

  search(){
    this.currentPage = 1;
    this.currentPageGroup = 1;
    this.filters = this.forma.value;
    this.isSearch = true;
    this.listAllClients(true);
  }

  pagesNumbers(){
    this.arrayPagesNumbers = [];
    for (let index = this.startPage; index <= this.endPage; index++) {
      this.arrayPagesNumbers.push(index);
    }
  }

  setPageValues(){
    this.endPage   = (this.pagesForEachGroup * this.currentPageGroup);
    this.startPage = ((this.endPage - this.pagesForEachGroup) + 1);
    if(this.endPage > this.totalPages){
      this.endPage = this.totalPages;
    }
  }

  changePage(page: number){
    this.currentPage = page;
    if(this.currentPage === 1){
      this.currentPageGroup = 1;
      this.setPageValues();
    }else if(this.currentPage === this.totalPages){
      this.currentPageGroup = this.totalPageGroups;
      this.setPageValues();
    }
    this.listAllClients();
  }

  nextPage(){
    if(this.currentPage === this.endPage){
      this.nextPageGroup();
    }else{
      this.currentPage++;
    }
    this.listAllClients();
  }

  previousPage(){
    if(this.currentPage === this.startPage){
      this.previousPageGroup();
    }else{
      this.currentPage--;
    }
    this.listAllClients();
  }

  nextPageGroup(){
    this.currentPageGroup++;
    this.setPageValues();
    this.currentPage = this.startPage;
    this.listAllClients();
  }

  previousPageGroup(){
    this.currentPageGroup--;
    this.setPageValues();
    this.currentPage = this.endPage;
    this.listAllClients();
  }
}
