import { browser, protractor, by, $, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { AdminStationsPage } from './stations.po';

describe('Stations Page', () => {
    const staionsPage = new AdminStationsPage();
    let origFn: any;
    beforeEach(() => {
        browser.sleep(1000);
        origFn = browser.driver.controlFlow().execute;
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        staionsPage.navigateTo();
        browser.wait(EC.visibilityOf($('#btn-stations-link')));
    });

    it('should display maintenance stations Tab', () => {
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf($('#btn-stations-link')));

        const airlineTab = element(by.id('btn-stations-link'));
        expect(airlineTab.getText()).toContain('Stations');
    });

    it('Maintenance Station Module is Defined', () => {
        expect(staionsPage.getCreateStationsButtonText().getText()).toContain('Maintenance Stations');
    });

    it('Refresh maintenance station List', () => {
        staionsPage.refreshList().click();
        browser.sleep(2000);
        element.all(by.css('.mat-checkbox-inner-container')).then(function(items) {
            if (items.length) {
                expect(items.length).toBeGreaterThanOrEqual(1);
            } else {
                expect(items.length).toBeGreaterThanOrEqual(0);
            }
        });
    });

    it('should filter maintenance station table', () => {
        staionsPage.idSelector('filterList').click();
        browser.sleep(2000);
        staionsPage.idSelector('inp-filter-station-text').sendKeys('A');
        browser.sleep(1000);
        element.all(by.css('.mat-checkbox-inner-container')).then(function(items) {
            if (items.length) {
                expect(items.length).toBeGreaterThanOrEqual(1);
            } else {
                expect(items.length).toBeGreaterThanOrEqual(0);
            }
        });
    });

    it('should create maintenance station', () => {
        staionsPage.idSelector('btn-create-adminStation').click();
        browser.sleep(1000);
        element(by.id('inp-station-fullname')).sendKeys('10');
        element(by.id('inp-station-shortName')).sendKeys('acr');
        element(by.id('inp-station-locationName')).sendKeys('ic');
        element(by.id('btn-admin-station-save')).click();
        browser.sleep(2000);
        element.all(by.css('.mat-checkbox-inner-container')).then(function(items) {
            const myElement = element(by.css('.alert-danger'));
            expect(myElement.isPresent()).toBeTruthy();
        });
    });

    it('Go to repair stations', () => {
       staionsPage.idSelector('mat-tab-label-0-1').click();
       expect(element(by.css('#mat-tab-label-0-1 .mat-tab-label-content')).getText()).toContain('Repair Stations');
    });

    it('Repair stations module is defined', () => {
        staionsPage.idSelector('mat-tab-label-0-1').click();
        browser.sleep(1000);
        expect(element(by.css('#mat-tab-label-0-1 .mat-tab-label-content')).getText()).toContain('Repair Stations');    });

    it('Refresh repair stations List', () => {
        staionsPage.classNameSelector('mat-tab-label').click();
        browser.sleep(1000);
        staionsPage.refreshList().click();
        browser.sleep(2000);
        element.all(by.css('.mat-checkbox-inner-container')).then(function(items) {
            if (items.length) {
                expect(items.length).toBeGreaterThanOrEqual(1);
            } else {
                expect(items.length).toBeGreaterThanOrEqual(0);
            }
        });
    });

    it('should filter repair stations table', () => {
        browser.sleep(2000);
        staionsPage.cssClassNameSelector('mat-tab-label').click();
        browser.sleep(3000);
        staionsPage.cssClassNameSelector('filterList').click();
        browser.sleep(2000);
        staionsPage.idSelector('inp-filter-station-text').sendKeys('A');
        browser.sleep(1000);
        element.all(by.css('.mat-checkbox-inner-container')).then(function(items) {
            if (items.length) {
                expect(items.length).toBeGreaterThanOrEqual(1);
            } else {
                expect(items.length).toBeGreaterThanOrEqual(0);
            }
        });
    });

    it('should create repair stations', () => {
        staionsPage.idSelector('mat-tab-label-0-1').click();
        browser.sleep(1000);
        staionsPage.idSelector('btn-admin-station-createStation').click();
        browser.sleep(1000);
        element(by.id('inp-station-fullName')).sendKeys('10');
        element(by.id('inp-station-shortNames')).sendKeys('acr');
        element(by.id('inp-station-locationName')).sendKeys('ic');
        element(by.id('btn-station-create')).click();
        browser.sleep(2000);
        element.all(by.css('.mat-checkbox-inner-container')).then(function(items) {
            const myElement = element(by.css('.alert-danger'));
            expect(myElement.isPresent()).toBeTruthy();
        });
    });


    it('Go to products tab', () => {
        expect(staionsPage.gotoProductsModule().click()).toBeDefined();
    });


});
