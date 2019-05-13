import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TailService {

  API = `${environment.API}`;
  routeParams;
  public ADMIN_API = this.API + '/api/v1/airline/';

  constructor(private http: HttpClient) { }

  getTailDetail(airlineIcao, tailNumber): Observable<any[]> {
    const url = airlineIcao + '/tails?tailNumber=' + tailNumber;
    return this.http.get<any[]>(this.ADMIN_API + url)
      .pipe(
        catchError(this.handleError('getTailDetail', []))
      );
  }

  getCoverageData(icao, tailNumber, dateObj) {
    const url = `${icao}/coverage?tailNumber=${tailNumber}&fromDepartureTime=${dateObj.fromDate}&toDepartureTime=${dateObj.toDate}`;
    return this.http.get<any[]>(this.ADMIN_API + url)
      .pipe(
        catchError(this.handleError('getCoverageData', []))
      );
  }

  getResetsCount(airlineIcao, tailNumber, dateRange) {
    const url = `${airlineIcao}/tails/${tailNumber}/resets?fromDate=${dateRange.from}&toDate=${dateRange.to}`;
    return this.http.get<any[]>(this.ADMIN_API + url)
      .pipe(
        catchError(this.handleError('getResetsCount', []))
      );
  }

  getLopaDetails(airlineIcao, tailNumber) {
    const url = airlineIcao + '/tails/' + tailNumber + '/configuration';
    return this.http.get<any[]>(this.ADMIN_API + url)
      .pipe(
        catchError(this.handleError('getLopaDetails', []))
      );
  }

  getAirlineAllFlightLegs(airlineIcao, dates) {
    const queryparams = `?fromDate=${dates.fromDate}T00:00:00Z&toDate=${dates.toDate}T23:59:59Z&fields=flightLeg,statuses`;
    return this.http.get<any[]>(`${this.ADMIN_API}${airlineIcao}/flight-legs${queryparams}`).pipe(
      catchError(this.handleError('getAirlineAllFlightLegs', []))
    );
  }

  getFlightsByAirline(airlineIcao, dates) {
    const queryparams = `?fromDepartureTime=${dates.fromDate}T00:00:00Z&toDepartureTime=${dates.toDate}T23:59:59Z`;
    return this.http.get<any[]>(`${this.ADMIN_API}${airlineIcao}/flights${queryparams}`).pipe(
      catchError(this.handleError('getFlightsByAirline', []))
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
      return of(error as T);
    };
  }
}
