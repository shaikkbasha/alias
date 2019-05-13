
import { browser, by, ElementArrayFinder, ElementFinder, element, $, $$ } from 'protractor';

export class Flights {

    currentProccessedStatus: ElementArrayFinder = $$('span.fa-stack i.fa.fa-circle');
    navigateTo() {
        browser.get('/airlines/AFR/flights');
    }

    getOffloadClassList() {
        return element(by.css('#btn-airline-flights')).getAttribute('class');
    }

    getDataTable() {
        return element(by.css('table'));
    }

    getPercentageData() {
        return element(by.css('art-filter-button'));
    }

    getFilterButton() {
        return element(by.css('#no-value-btn'));
    }
    getResultCount() {
        return element(by.css('#no-value-btn')).getText();
    }
    getFilterButtonPerLeftAll() {
        return element(by.css('#all-value-btn'));
    }
    getFilterButtonPerRightProccessed() {
        return element(by.css('#yes-percentage'));
    }

    getFilterButtonPerRightRejected() {
        return element(by.css('#no-percentage'));
    }


    getFilterButtonPerLeftprocessed() {
        return element(by.css('#yes-value-btn'));
    }

    getFilterButtonPerLeftrejected() {
        return element(by.css('#no-value-btn'));
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

    getDate() {
        return element(by.className('date-range-picker-color'));
    }

    getFromDate() {
        return element(by.id('2019-3-1'));
    }
    getToDate() {
        return element(by.id('2019-3-26'));
    }
    getMonth() {
        return element.all(by.css('div.ngb-dp-header select.custom-select'));
    }
    getProcessedStatus(_percentage: number): ElementFinder {
        if (_percentage >= 90) {
            return element(by.css('div#yes-percentage i.fa.fa-circle.color-green'));
        } else if (_percentage < 90 && _percentage >= 80) {
            return element(by.css('div#yes-percentage i.fa.fa-circle.color-orange'));
        } else if (_percentage < 80) {
            return element(by.css('div#yes-percentage i.fa.fa-circle.color-red'));
        }
    }
    getMissedOffloads(_percentage: number): ElementFinder {
        if (_percentage <= 10) {
            return element(by.css('div#no-percentage i.fa.fa-circle.color-green'));
        } else if (_percentage > 10 && _percentage <= 20) {
            return element(by.css('div#no-percentage i.fa.fa-circle.color-orange'));
        } else if ( _percentage > 20) {
            return element(by.css('div#no-percentage i.fa.fa-circle.color-red'));
        }
    }
}
