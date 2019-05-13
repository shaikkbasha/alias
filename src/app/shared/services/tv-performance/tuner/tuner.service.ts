import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TunerService {

  public ADMIN_API = `${environment.API}/api/v1/airline/`;
  constructor(private http: HttpClient) { }

  getTunerDetails(id, icao, obj): Observable<any> {

    return this.http.get
      <any>(`${this.ADMIN_API}${icao}/tv-performance/flights/${id}/boards/${obj.boardId}/tuners/${obj.tunerId}`)
      .pipe(
        // tap(offloadList => console.log(`fetched antenna list: `, offloadList)),
        catchError(this.handleError('antenna', []))
      );
  }

  getTunerParameterDetails(id, icao, filters): Observable<any> {
    const parameters = `${id}/boards/${filters.boardParam}/parameters/${filters.tunerParam}`;
    return this.http.get<any>(`${this.ADMIN_API}${icao}/tv-performance/flights/${parameters}`)
      .pipe(
        // tap(offloadList => console.log(`fetched antenna list: `, offloadList)),
        catchError(this.handleError('antenna', []))
      );
  }
  exportTunnerData(id, icao, filters) {
    const blob: any = 'blob';
    const parameters = `boards/${filters.boardParam}/parameters/${filters.tunerParam}/export`;
    return this.http.get<any>(`${this.ADMIN_API}${icao}/tv-performance/flights/${id}/${parameters}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }), responseType: blob
      })
      .pipe(
        catchError(this.handleError('tunnerExport', []))
      );
  }
  exportBoardTunnerData(id, icao, filters) {
    const blob: any = 'blob';
    const parameters = `boards/${filters.boardId}/tuners/${filters.tunerId}/export`;
    return this.http.get<any>(`${this.ADMIN_API}${icao}/tv-performance/flights/${id}/${parameters}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }), responseType: blob
      })
      .pipe(
        catchError(this.handleError('boardtunnerExport', []))
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
