import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../utils/env.service';
import { Observable, of } from 'rxjs';
import { constants } from '../../../../config/app.constants';
import { delay, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient,
    private env: EnvService) { }


  /**
   * Solicitar la información de todos los tipos de documentos
   */
  listAll() : Observable<any>{

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    const url = this.env.apiGatewayBackOffice + constants.config.departmentList;

    return this.http.get(url, {headers})
    .pipe(
      delay(500),
      catchError(err => {
        return of( err.error);
      })
    );
  }
}
