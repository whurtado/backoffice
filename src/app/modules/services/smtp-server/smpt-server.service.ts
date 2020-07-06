import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../utils/env.service';
import { constants } from '../../../../config/app.constants';
import { Observable, of } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import { SmtpServer } from '../../models/smtpserver.model';

@Injectable({
  providedIn: 'root'
})
export class SmptServerService {

  constructor(private http: HttpClient,
              private env: EnvService) { }

  

  getAllSmptServers() : Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const url = this.env.apiGatewayBackOffice + constants.config.smtpServer;
    return this.http.get(url, {headers})
    .pipe(
      delay(500),
      catchError(err =>  of( err.error))
    );
  }

  getSmptServer(id: number) : Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    const url = this.env.apiGatewayBackOffice + constants.config.smtpServer + id;
    return this.http.get(url, {headers})
    .pipe(
      delay(500),
      catchError(err => of(err.error))
    );
  }

  createSmtpServer(smtpServer: SmtpServer) : Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    const url = this.env.apiGatewayBackOffice + constants.config.smtpServer;
    return this.http.post<SmtpServer>(url, smtpServer, {headers})
    .pipe(
      delay(500),
      catchError(err => of( err.error))
    );
  }

  updateSmtpServer(smtpServer: SmtpServer) : Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    const url = this.env.apiGatewayBackOffice + constants.config.smtpServer + smtpServer.id;
    return this.http.put<SmtpServer>(url, smtpServer, {headers})
    .pipe(
      delay(500),
      catchError(err => of( err.error))
    );
  }
}
