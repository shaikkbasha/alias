
import { browser, by, ElementArrayFinder, ElementFinder, element, $, $$ } from 'protractor';

export class Tails {

    apply: ElementFinder = $('button#btn-airline-save');
    cancel: ElementFinder = $('button#cancel');
    checkedTail: ElementFinder = $('input.mat-checkbox-input.cdk-visually-hidden');
    downChevron: ElementFinder = $('.fa-chevron-down');
    unCheckedTail: ElementFinder = $('div.mat-checkbox-inner-container');
    filterTails: ElementFinder = $('td.mat-cell.cdk-column-tailNumber.mat-column-tailNumber');
    modifiedTail: ElementFinder = $('div.row.p-4.text-center');
    searchTails: ElementFinder = $('input.form-control.modal-search-box');
    timelineTable: ElementFinder = $('div.vis-overlay');
    tailInformation: ElementFinder = $('td.cdk-column-tailNumber');
    updatedTime: ElementFinder = $('i.fa-refresh.updated-at-icon');

    navigateTo() {
        browser.get('/airlines/AAL/tails');
    }

    navigateToTimeline() {
        browser.get('/airlines/AAL/tails/N154AA/timeline?fromDate=2019-04-20&toDate=2019-04-26');
    }

    navigateToFlightLegs() {
        browser.get('/airlines/AAL/tails/N154AA/flight-legs');
    }

    verifyInvalidTail() {
        browser.get('/airlines/AAL/tails/N154AA123/overview?fromDate=2019-04-23&toDate=2019-04-29');
    }

    verifyInvalidTimeline() {
        browser.get('/airlines/AAL/tails/N154AA123/timeline?fromDate=2019-04-23&toDate=2019-04-29');
    }

    verifyInvalidFlightLegs() {
        browser.get('/airlines/AAL/tails/N154AA123/flight-legs');
    }

    getOffloadClassList() {
        return element(by.css('#btn-airline-tails')).getAttribute('class');
    }

    getDataTable() {
        return element(by.css('table'));
    }

    getTableRows() {
        return element(by.css('.mat-paginator-range-label'));
    }

    getElementBySelector(selector) {
        return element(by.css(selector));
    }

    getAllElementsBySelector(selector) {
        return element.all(by.css(selector));
    }
 }
