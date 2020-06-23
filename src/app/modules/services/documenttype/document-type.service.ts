import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { constants } from '../../../../config/app.constants';
import { EnvService } from '../utils/env.service';
import { delay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  constructor(private http: HttpClient,
    private env: EnvService) { }


  /**
   * Solicitar la información de todos los tipos de documentos
   */
  listAll() : Observable<any>{

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    headers.append( 'Authorization', 'Bearer ' + localStorage.getItem('token'));

    const url = this.env.apiGatewayBackOffice + constants.config.documentTypeList;

    return this.http.get(url, {headers})
    .pipe(
      delay(500),
      catchError(err => {
        return of( err.error);
      })
    );
  }


}
