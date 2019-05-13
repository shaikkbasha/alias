import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  API = `${environment.API}`;
  public ADMIN_API = this.API + '/api/v1';
  constructor(private http: HttpClient) { }


  getLRUType(): Observable<any[]> {
    return this.http.get<any[]>(this.ADMIN_API + '/products/lru-types')
      .pipe(
        catchError(this.handleError('getLRUType', []))
      );
  }

  getLRUName(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.ADMIN_API + `/products/lru-types/${id}/lru-names`)
      .pipe(
        catchError(this.handleError('getLRUName', []))
      );
  }
  getPartNumber(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.ADMIN_API + `/products/lru-names/${id}/part-numbers`)
      .pipe(
        catchError(this.handleError('getPartNumber', []))
      );
  }

  getReasonOfRemovals(params: any): Observable<any[]> {
    const dates = '&fromDate=' + params.fromDate + '&' + 'toDate=' + params.toDate;
    const url = this.ADMIN_API + '/repair-management/reports/removals-pareto?partNumber=' + params.id.toString() + dates;
    return this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError('getReasonOfRemovals', []))
      );
  }

  getRepairActions(params: any): Observable<any[]> {
    const dates = '&fromDate=' + params.fromDate + '&' + 'toDate=' + params.toDate;
    const url = '/repair-management/reports/repairs-pareto?partNumber=' + params.id.toString() + dates;

    return this.http.get<any[]>(this.ADMIN_API + url)
      .pipe(
        catchError(this.handleError('getRepairActions', []))
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
