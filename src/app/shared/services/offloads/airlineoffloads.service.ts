import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { OffloadModel } from './airlineofflods';


@Injectable({
  providedIn: 'root'
})
export class OffloadService {

  API = `${environment.API}`;

  public ADMIN_API = this.API + '/api/v1/airline/';

  constructor(private http: HttpClient) { }


  getOffloadList(id, fromDate, toDate): Observable<OffloadModel[]> {

    return this.http.get<OffloadModel[]>(this.ADMIN_API + id + '/payloads?fromDepartureTime=' + fromDate + '&toDepartureTime=' + toDate)
      .pipe(
        catchError(this.handleError('getOffloadList', []))
      );
  }

  getOffloadListByFileType(id, fromDate, toDate, tailNumber): Observable<any[]> {

    return this.http.get<any[]>(this.ADMIN_API + id + '/offloads?fromDepartureTime=' + fromDate + '&toDepartureTime=' + toDate
    + '&tailNumber=' + tailNumber )
      .pipe(
        catchError(this.handleError('getOffloadListByFileType', []))
      );
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure


      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(error as T);
    };
  }

}
