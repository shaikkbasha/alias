
import { browser, by, element, ElementArrayFinder, ElementFinder, $, $$ } from 'protractor';

export class Offloads {
    currentProccessedStatus: ElementArrayFinder = $$('span.fa-stack i.fa.fa-circle');
    navigateTo() {
        browser.get('/airlines/OMA/offloads');
    }

    getOffloadClassList() {
        return element(by.css('#btn-payloads-offloads')).getAttribute('class');
    }

    getDataTable() {
        return element(by.css('table'));
    }

    getPercentageData() {
        return element(by.css('art-filter-button'));
    }

    getResultCount() {
        return element(by.css('#processed-value-btn')).getText();
    }

    getResultCountAll() {
        return element(by.css('#processed-filter-btn h3')).getText();
    }
    getFilterButtonAll() {
        return element(by.css('#all-filter-btn'));
    }
    getFilterButtonPerLeftAll() {
        return element(by.css('#all-value-btn'));
    }
    getFilterButtonPerRightProccessed() {
        return element(by.css('#processed-percentage'));
    }

    getFilterButtonPerRightRejected() {
        return element(by.css('#rejected-percentage'));
    }


    getFilterButtonPerLeftprocessed() {
        return element(by.css('#processed-value-btn'));
    }

    getFilterButtonPerLeftrejected() {
        return element(by.css('#rejected-value-btn'));
    }

    getFilterButton() {
        return element(by.css('#processed-value-btn'));
    }
    getFilterButtonRejected() {
        return element(by.css('#rejected-filter-btn'));
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
            return element(by.css('div#processed-percentage i.fa.fa-circle.color-green'));
        } else if (_percentage < 90 && _percentage >= 80) {
            return element(by.css('div#processed-percentage i.fa.fa-circle.color-orange'));
        } else if (_percentage < 80) {
            return element(by.css('div#processed-percentage i.fa.fa-circle.color-red'));
        }
    }
    getMissedOffloads(_percentage: number): ElementFinder {
        if (_percentage <= 10) {
            return element(by.css('div#rejected-percentage i.fa.fa-circle.color-green'));
        } else if (_percentage > 10 && _percentage <= 20) {
            return element(by.css('div#rejected-percentage i.fa.fa-circle.color-orange'));
        } else if ( _percentage > 20) {
            return element(by.css('div#rejected-percentage i.fa.fa-circle.color-red'));
        }
    }
}
