import { browser, by, element, $ } from 'protractor';

export class TVPerformance {
    navigateTo() {
        browser.get('/airlines/JBU/tv-performance');
    }

    getDataTable() {
        return element(by.css('table'));
    }

    getDate() {
        return element(by.css('.date-range-picker-color'));
    }
    getMonth() {
        return element(by.css('.custom-select'));
    }
    getFromDate() {
        return element(by.id('2019-2-1'));
    }
    getToDate() {
        return element(by.id('2019-2-28'));
    }
}
