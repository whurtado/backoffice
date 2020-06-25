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

  constructor(private _clientServise : ClientService,
              private _alertMessagesService: AlertMessagesService) { }

  ngOnInit(): void {
    this.listAllClients();
  }

  listAllClients(){
    this._clientServise.getAllClients().subscribe(response => {
        if(!response.ok){
            this._alertMessagesService.showMessage('error', response.message);
        }else{
          this.clients = response.data;
        }
    },
    error => {
        this._alertMessagesService.showMessage('error', error);
    });
  }

}
