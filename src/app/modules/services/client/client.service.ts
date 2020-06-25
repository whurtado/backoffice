import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, catchError } from "rxjs/operators";
import {constants} from '../../../../config/app.constants';
import { EnvService } from '../utils/env.service';
import { Observable, of } from 'rxjs';
import { Client } from '../../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient,
              private env: EnvService) { }

  /**
   * Solicitar la información de todos los clientes
   */
  getAllClients() : Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    const url = this.env.apiGatewayBackOffice + constants.config.client;
    return this.http.get(url, {headers})
    .pipe(
      delay(500),
      catchError(err =>  of( err.error))
    );
  }

  getClient(id: number) : Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    const url = this.env.apiGatewayBackOffice + constants.config.client + id;
    return this.http.get(url, {headers})
    .pipe(
      delay(500),
      catchError(err => of(err.error))
    );
  }

  createClient(client: Client) : Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    const url = this.env.apiGatewayBackOffice + constants.config.client;
    return this.http.post<Client>(url, client, {headers})
    .pipe(
      delay(500),
      catchError(err => of( err.error))
    );
  }

  updateClient(client: Client) : Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    const url = this.env.apiGatewayBackOffice + constants.config.client + client.id;
    return this.http.put<Client>(url, client, {headers})
    .pipe(
      delay(500),
      catchError(err => of( err.error))
    );
  }


}
