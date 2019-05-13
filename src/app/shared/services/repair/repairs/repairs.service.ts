import { Injectable } from '@angular/core';
import { RepairRepairsStations } from './repairs';
import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RepairsService {
  private API = `${environment.API}`;
  public ADMIN_API = this.API + '/api/v1/';
  constructor(private http: HttpClient) {
  }
  postApiCall(apiUrl, postData): Observable<any[]> {
    return this.http.post<any[]>(this.ADMIN_API + apiUrl, postData)
      .pipe(
        catchError(this.handleError('postdata', []))
      );
  }
  getRepairList(dateObj): Observable<any[]> {
    let argumentList = '';
    argumentList = '?fromDate=' + dateObj.fromDate +
    '&toDate=' + dateObj.toDate;
    return this.getApiCall('repairs' + argumentList);
  }
  getApiCall(apiUrl): Observable<RepairRepairsStations[]> {
    return this.http.get<RepairRepairsStations[]>(this.ADMIN_API + apiUrl)
      .pipe(
        catchError(this.handleError('getRepair', []))
      );
  }
  getRepair(): Observable<any[]> {
    return this.getApiCall('repair-stations');
  }
  getLru(serialNumber: any): Observable<any[]> {
    return this.getApiCall('removals/search?lruSerialNumber=' + serialNumber);
  }
  getMaintenanceStationlist (): Observable<any[]> {
    return this.getApiCall('maintenance-stations');
  }
  getAirlinelist(): Observable<any[]> {
    return this.getApiCall('airlines');
  }
  getTails(id: number) {
    return this.getApiCall( 'airline/' + id + '/tails');

  }
  getLruName(): Observable<any[]> {
    return this.getApiCall('products/lru-names');
  }
  getLruPartNumber(id): Observable<any[]> {
    return this.getApiCall('products/lru-names/' + id + '/lruPartNumbers');
  }
  ReasonRemoval(id): Observable<any[]> {
    return this.getApiCall('products/lru-part-numbers/' + id + '/reason-of-removals');
  }
  createRemoval(postData): Observable<any[]> {
    return this.postApiCall('removals', postData);
  }
  createRepair(postData): Observable<any[]> {
    return this.postApiCall('repairs', postData);
  }

  getRepairActions(id) {
    return this.getApiCall('products/lru-part-numbers/' + id + '/repair-actions');
  }
  getShowDetails(id: any): Observable<any[]> {
    return this.getApiCall('repairs' + `/${id}`);
  }
   getActionDetails(id: any): Observable<any[]> {
    return this.getApiCall('products/lru-part-numbers/' + id + '/repair-actions');
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(error as T);
    };
  }

}
