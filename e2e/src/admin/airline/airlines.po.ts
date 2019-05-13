import { browser, $, by, element, promise, ElementFinder, ElementArrayFinder, $$ } from 'protractor';

export class AirlinesPage {

    // Airlines page elements
    airlinesTab: ElementFinder = $('btn-airline-link');
    airlineLink: ElementArrayFinder = $$('td a.lnk-airline');
    airlinesHeader: ElementFinder = $('div.row.p-4.text-center');
    apply: ElementFinder = $('#btn-focusedObj-airline-apply');
    cancel: ElementFinder = $('button#cancel');
    checkedAirline: ElementFinder = $('input.mat-checkbox-input.cdk-visually-hidden');
    coverageTab: ElementFinder = $('#btn-payloads-coverage');
    downChevron: ElementFinder = $('.fa.fa-chevron-down');
    filteredAirline: ElementFinder = $('.cdk-column-airlineName');
    flightsTab: ElementFinder = $('#btn-airline-flights');
    offloadsTab: ElementFinder = $('#btn-payloads-offloads');
    overviewTab: ElementFinder = $('#btn-airline-overiew');
    searchAirlines: ElementFinder = $('#inp-airline-filter');
    scoresTab: ElementFinder = $('#btn-airline-scores');
    tailsTab: ElementFinder = $('#btn-airline-tails');
    tvPerformanceTab: ElementFinder = $('#btn-tv-performance');
    unCheckedAirline: ElementFinder = $('div.mat-checkbox-inner-container');

    // Admin airlines page elements
    adminAirlineHeaders: ElementArrayFinder = $$('.mat-tab-label.mat-ripple');
    allIssuesRows: ElementArrayFinder = $$('#tbl-admin-airline-issue tr');
    allIssuesNames: ElementArrayFinder = this.allIssuesRows.$$('td');
    cancelUpdate: ElementFinder = $('button#cancel');
    confirmDeleteIssue: ElementFinder = $('button#btn-issues-confirm');
    closeDeleteAlert: ElementFinder = $('button#btn-arilines-close');
    createIssue: ElementFinder = $('a#btn-create-issue');
    deleteIssue: ElementArrayFinder = $$('i.fa.fa-trash');
    editIssue: ElementArrayFinder = $$('i.fa.fa-pencil-square-o');
    filterButton: ElementFinder = $('a.tool-bar-search.filterList');
    filterTextbox: ElementFinder = $('.action-toolbar-search');
    noRecordsFound: ElementFinder = $('.text-center.mat-card');
    otherSettingradioButtons: ElementArrayFinder = $$('div.mat-radio-container');
    issueDescription: ElementFinder = $('input#inp-admin-airline-issue-description');
    issueName: ElementFinder = $('input#inp-admin-airline-issue-name');
    saveAirline: ElementFinder = $('button#btn-issue-save');
    successToastMessage: ElementFinder = $('div.toast-message');
    updateAirline: ElementFinder = $('button#btn-issue-update');
    navigateToAirlines() {
        browser.get('/admin/airlines').then(function () {
        });
    }

    navigateToIssues() {
        browser.get('/admin/airlines/JBU');
    }
    navigateToJetBlue() {
        browser.get('/airlines/JBU/overview');
    }
    gotoairlineModule() {
        return element(by.id('btn-airline-link')).click();
    }
    getAirlineText() {
        return $('#btn-airline-link');
    }
    gotostationModule() {
        return element(by.id('btn-stations-link')).click();
    }
    tableFilter() {
        return element(by.id('filterList'));
    }
    enableSearchText() {
        return element(by.id('inp-filter-airline-text'));
    }
    createAirline() {
        return element(by.id('btn-create-airline'));
    }
    updatedAt() {
        return element(by.css('.updated-at-icon'));
    }
    deleteAirline() {
        return element.all(by.css('.mat-checkbox-inner-container')).get(1);
    }

    cssSelector(selector) {
        return element.all(by.css(selector)).get(1);
    }

    getElementBySelector(selector) {
        return element(by.css(selector));
    }

    navigateToairlineConfiguration() {
        const airline = this.getElementBySelector('.lnk-airline');
        airline.click();
        browser.sleep(3000);
        const airlineConfigTab = element(by.id('mat-tab-label-0-1'));
        airlineConfigTab.click();
        browser.sleep(1000);
    }
}
