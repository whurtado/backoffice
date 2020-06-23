import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client/client.service';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients: Client[] = [];

  constructor(private _clientServise : ClientService) { }

  ngOnInit(): void {
    this.listAllClients();
  }

  listAllClients(){

    this._clientServise.listAllClients().subscribe(response => {
        console.log(response);
        if(!response.ok){
            //mostrar mensaje de error
            console.log(response.message);
        }
        this.clients = response.data;
    },
    error => {
        console.log('error: ', error);
    });

  }

}
