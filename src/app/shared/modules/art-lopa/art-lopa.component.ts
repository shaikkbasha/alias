import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
declare var Lopa: any;

@Component({
    selector: 'art-lopa',
    templateUrl: './art-lopa.component.html',
    styleUrls: ['./art-lopa.component.css']
})
export class ArtLopaComponent implements OnInit, OnChanges {

    @Input() config: any;
    @Input() options: any;

    customOptions: any;
    lopaInstance: any;

    @ViewChild('lopaContainer') container;
    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['options'] && this.options) {
            this.customOptions = {
                'displayDeckName': this.options.displayDeckName,
                'displayCabinClassName': this.options.displayCabinClassName,
                'onSelect': this.options.isClickable ? (function (seat) {
                    // l1.select(seat);
                }) : null,
                'onMouseOver': this.options.isHoverable ? (function (seat) {
                    // l1.highlight(seat);
                }) : null
            };
        }
        if (changes['config']) {
            this.lopaInstance = new Lopa(this.container.nativeElement, this.config, this.customOptions);
        }

    }

}
