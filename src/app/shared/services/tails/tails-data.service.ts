import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class TailsDataService {

  tailDetails: any = {
    tailNumber: '',
  };

  private subject: BehaviorSubject<any> = new BehaviorSubject(this.tailDetails);

  sendData(tail: TailDetails) {
    this.subject.next(tail);
  }

  clearData() {
    this.subject.next(this.tailDetails);
  }

  getData(): Observable<TailDetails> {
    return this.subject.asObservable();
  }

}

interface TailDetails {
  tailNumber: string;
}
