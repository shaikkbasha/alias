import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'art-configuration-details',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  @Input() componentId: string;
  @Input() colClass: string;
  @Input() tailDetails: any;
  constructor() { }

  ngOnInit() {
  }

}
