import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client/client.service';
import { Client } from '../../../models/client.model';
import { AlertMessagesService } from '../../../services/alert/alert-messages.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients: Client[] = [];
  currentPage: number = 1;
  totalPages: number[] = [];

  constructor(private _clientServise : ClientService,
              private _alertMessagesService: AlertMessagesService) { }

  ngOnInit(): void {
    this.listAllClients();
  }

  async listAllClients(page: number = 1, limit: number = 3){

    try {
      let response = await this._clientServise.getAllClientsPaginated(page, limit).toPromise();

      if(!response.ok){
        this._alertMessagesService.showMessage('error', response.message);
      }else{
        this.clients = response.data.data;
        this.currentPage = response.data.page;
        this.totalPages = [];
        for (let index = 1; index <= response.data.totalPages; index++) {
          this.totalPages.push(index);
        }
      }
    } catch (error) {
      this._alertMessagesService.showMessage('error', error);
    }
  }

  async changePage(page: number){
    await this.listAllClients(page);
  }

}
