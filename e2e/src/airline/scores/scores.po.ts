
import { browser, by, ElementArrayFinder, ElementFinder, element, $, $$ } from 'protractor';

export class Scores {


    navigateTo() {
        browser.get('/airlines/JBU/scores');
    }

    getOffloadClassList() {
        return element(by.css('#btn-airline-scores')).getAttribute('class');
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

    getDate() {
        return element(by.className('date-range-picker-color'));
    }

    getFromDate() {
        return element(by.id('2019-4-22'));
    }
    getToDate() {
        return element(by.id('2019-4-25'));
    }
    getMonth() {
        return element(by.css('.custom-select'));
    }
    getChart() {
        return element(by.css('art-kpi-card .card'));
    }

    getChartTitle() {
        return element(by.css('.card-header span')).getText();
    }

 }
