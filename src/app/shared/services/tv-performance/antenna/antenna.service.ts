import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AntennaService {

  public ADMIN_API = `${environment.API}/api/v1/airline/`;
  public AIRPORT_API = `${environment.API}/api/v1/airports`;
  constructor(private http: HttpClient) { }

  getFlightDetails(icao, id): Observable<any> {

    return this.http.get<any>(`${this.ADMIN_API}${icao}/tv-performance/flights/${id}`)
      .pipe(
        catchError(this.handleError('antenna', []))
      );
  }

  getAntennaDetails(icao, id): Observable<any> {

    return this.http.get<any>(`${this.ADMIN_API}${icao}/tv-performance/flights/${id}/antenna`)
      .pipe(
        catchError(this.handleError('antenna', []))
      );
  }

  exportAntennaData(icao, id) {
    const blob: any = 'blob';
    return this.http.get<any>(`${this.ADMIN_API}${icao}/tv-performance/flights/${id}/antenna/export`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }), responseType: blob
      })
      .pipe(
        catchError(this.handleError('antennaExport', []))
      );
  }

  getGeographicalData(icao, id, timeStamp) {
    return this.http.get<any>(`${this.ADMIN_API}${icao}/tv-performance/flights/${id}/geographical-details?timestamp=${timeStamp}`)
      .pipe(
        catchError(this.handleError('antenna', []))
      );
  }


  getAllAirportData(airports: string, isICAO?: boolean, isAll?: boolean) {
    let params = '';
    if (!isAll) {
      params = (isICAO) ? `?icao=${airports}` : `?iata=${airports}`;
    }
    return this.http.get<any>(`${this.AIRPORT_API}${params}`).pipe(
      catchError(this.handleError('Airports', []))
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
