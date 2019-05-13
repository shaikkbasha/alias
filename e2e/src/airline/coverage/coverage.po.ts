import { browser, by, ElementArrayFinder, ElementFinder, element, $, $$ } from 'protractor';

export class Coverage {

    // Start region
    // Page elements
    allFilterButton: ElementFinder = $('art-filter-button');
    coverageTab: ElementFinder = $('#btn-payloads-coverage');
    coverageUpdatedTime: ElementFinder = $('app-airline-coverage');
    currentProccessedStatus: ElementArrayFinder = $$('i.fa.fa-circle');

    // Calender elements
    calendarDropDown: ElementFinder = $('a .dropdown-menu');
    datePicker: ElementFinder = $('a.date-range-picker-color');
    fromDate: ElementFinder = element(by.id('2019-3-1'));
    monthDropDown: ElementArrayFinder = $$('select.custom-select');
    monthDuration: ElementFinder = element(by.cssContainingText('option', 'Mar'));
    toDate: ElementFinder = element(by.id('2019-3-26'));

    // Filter elemets
    allOffloads: ElementFinder = $('#all-value-btn');
    receivedOffloads: ElementArrayFinder = $$('div.filter-button-align-bottom');
    missingOffloads: ElementArrayFinder = $$('div.pull-left');

    // Table elements
    tailTable: ElementFinder = $('table#tbl-coverage');
    eachTailInformation: ElementArrayFinder = this.tailTable.all(by.tagName('tr'));

    navigateTo() {
        browser.get('/airlines/AFR/coverage');
    }

    getMissingOffloads(_percentage: number): ElementFinder {
        if (_percentage <= 10) {
            return element.all(by.css('i.fa.fa-circle.color-green')).first();
        } else if (_percentage > 10 && _percentage <= 20) {
            return element.all(by.css('i.fa.fa-circle.color-orange')).first();
        } else if (_percentage > 20) {
            return element.all(by.css('i.fa.fa-circle.color-red')).first();
        }
    }
    getAllMissingOffloads(_percentage: number): ElementFinder {
        if (_percentage <= 10) {
            return element.all(by.css('i.fa.fa-circle.color-green')).last();
        } else if (_percentage > 10 && _percentage <= 20) {
            return element.all(by.css('i.fa.fa-circle.color-orange')).last();
        } else if (_percentage > 20) {
            return element.all(by.css('i.fa.fa-circle.color-red')).last();
        }
    }
}

