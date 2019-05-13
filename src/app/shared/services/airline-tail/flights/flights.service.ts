import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  API = `${environment.API}`;
  routeParams;
  public ADMIN_API = this.API + '/api/v1/airline/';

  constructor(private http: HttpClient) { }

  getFlights(airlineIcao, tailNumber, dateObj, fields): Observable<any[]> {
    let url = airlineIcao + '/tails/' + tailNumber + '/flight-legs?fromDate=' + dateObj.fromDate + '&toDate=' + dateObj.toDate;
    if (fields[0] === 'flightLeg' && fields[1] === 'statuses') {
      url += '&fields=' + fields;
    }
    return this.http.get<any[]>(this.ADMIN_API + url)
      .pipe(
        catchError(this.handleError('getFlights', []))
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
