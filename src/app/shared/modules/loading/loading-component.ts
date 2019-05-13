import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'art-loading',
  templateUrl: 'loading-component.html'
})
export class LoadingComponent implements OnInit {

  constructor() { }
  @Input() loading;
  ngOnInit() {
  }

}
