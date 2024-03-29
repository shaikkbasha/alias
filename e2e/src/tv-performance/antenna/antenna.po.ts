
import { browser, by, element, $ } from 'protractor';

export class Antenna {
    navigateTo() {
        browser.get('/airlines/JBU/tv-performance/5ca2165e5917fa00197565f9/antenna');
    }

    getAntennaClassList() {
        return element(by.css('#btn-antenna')).getAttribute('class');
    }

    getChart() {
        return element(by.css('art-kpi-card .card'));
    }

    getChartTitle() {
        return element(by.css('.card-header span')).getText();
    }

    getFlightDetails() {
        return element(by.css('art-flight-details'));
    }

    getAntennaFilters() {
        return element.all(by.css('#antenna-filter-block .filter-button'));
    }

    getHighestRssiLabel() {
        return element(by.css('#lbl-high-rssi')).getText();
    }

    getHighestRssiValue() {
        return element(by.css('.high-rssi-value')).getText();
    }

    getLowestRssiLabel() {
        return element(by.css('#lbl-low-rssi')).getText();
    }

    getLowestRssiValue() {
        return element(by.css('.low-rssi-value')).getText();
    }

    getDataTable() {
        return element(by.css('table'));
    }

    getAllResultCount() {
        return element(by.css('#all-value-btn')).getText();
    }

    getFilterButton() {
        return element(by.css('#badRssi-filter-btn'));
    }

    getResultCount() {
        return element(by.css('#badRssi-value-btn')).getText();
    }

    getTableRows() {
        return element.all(by.css('table tbody tr')).count();
    }

    getElementBySelector(selector) {
        return element(by.css(selector));
    }

    getClassListBySelector(selector) {
        return element(by.css(selector)).getAttribute('class');
    }

    getAllElementsBySelector(selector) {
        return element.all(by.css(selector));
    }
}
