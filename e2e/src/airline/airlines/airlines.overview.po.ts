import { browser, by, element, $, ElementFinder, ElementArrayFinder, $$, ExpectedConditions } from 'protractor';

export class AirlinesOverviewPage {

    // Overview page Elements
    analyzeFlightLeg: ElementFinder = $('a#btn-airline-overview');
    datePicker: ElementFinder = $('a.date-range-picker-color');
    fromDate: ElementFinder = $('#2019-3-25');
    toDate: ElementFinder = $('#2019-3-29');
    refreshPage: ElementFinder = $('.fa.fa-refresh');
    overviewTab: ElementFinder = $('button#btn-tail-overview');
    // Table Elements
    keyMetrics: ElementFinder = $('#overview-timeline');
    flightNumber: ElementArrayFinder = $$('div.vis-inner');
    flightLegStatus: ElementArrayFinder = $$('div.vis-item-overflow');
    flightStatusText: ElementArrayFinder = $$('div.vis-tooltip');
    allFlightLinks: ElementArrayFinder = $$('div.vis-foreground');
    calendarDropDown: ElementFinder = $('a .dropdown-menu');
    monthDropDown: ElementArrayFinder = $$('select.custom-select');
    monthDuration: ElementFinder = element(by.cssContainingText('option', '3'));
    navigateTo() {
        browser.get('/airlines/AAL/overview');
    }
}
