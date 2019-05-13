import { environment } from '../../../../../../environments/environment';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReasonofremovalService {
  API = `${environment.API}`;
  public ADMIN_API = this.API + '/api/v1/products';

  constructor(private http: HttpClient) { }

  /** GET LRUTypes */
  getLRUTypes (): Observable<any[]> {
    return this.http.get<any[]>(this.ADMIN_API + '/lru-types')
      .pipe(
        catchError(this.handleError('LRUTypeslist', []))
      );
  }
  /** GET getAllReasonOFRemoval */
  // getAllReasonOFRemoval (): Observable<any[]> {
  //   return this.http.get<any[]>(this.ADMIN_API + '/reason-of-removals/')
  //     .pipe(
  //       catchError(this.handleError('ReasonOFRemovalList', []))
  //     );
  // }
  getApiCall(apiUrl): Observable<any[]> {
    return this.http.get<any[]>(this.ADMIN_API + apiUrl)
      .pipe(
        catchError(this.handleError('List', []))
      );
  }
  /** GET getReasonOFRemoval */
  getReasonOFRemoval (id): Observable<any[]>  {
    return this.getApiCall('/lru-types/' + id + '/reason-of-removals');
  }
   /** GET Partnumbers */
   getPartNumbers (id): Observable<any[]> {
    return this.getApiCall( '/lru-types/' + id + '/part-numbers');
  }
  /** Create Removals **/
  createRemovals(postData): Observable<any[]> {
    return this.http.post<any[]>(this.ADMIN_API + '/reason-of-removals/', postData)
      .pipe(
        catchError(this.handleError('createRemovals', []))
      );
  }
  /** Update Removals **/
  updateRemovals(postData, id): Observable<any[]> {
    return this.http.put<any[]>(this.ADMIN_API + '/reason-of-removals/' + id, postData)
      .pipe(
        catchError(this.handleError('updateRemovals', []))
      );
  }

  /** Delete Removals */
  deleteRemovals(id): Observable<any[]> {
    const listId = id;
    return this.http.delete<any[]>(this.ADMIN_API + '/reason-of-removals/' + listId)
      .pipe(
        catchError(this.handleError('deleteRemovals', []))
      );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(error as T);
    };
  }
}
