import { browser, protractor, $, $$, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { AdminProductsPage } from './products.po';

describe('Admin Products Page', () => {

    const productsPage = new AdminProductsPage();
    let origFn: any;
    beforeEach(() => {
        origFn = browser.driver.controlFlow().execute;
        productsPage.navigateTo();
    });

    it('should display products Tab', () => {
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf($('#btn-products-link')));

        const airlineTab = element(by.id('btn-products-link'));
        expect(airlineTab.getText()).toContain('Products');
    });

    it('filter tree node', () => {
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf($('#filter')));
        productsPage.treeFilter().sendKeys('SVDU');
        expect(productsPage.treeFilter().getAttribute('value')).toEqual('SVDU');
    });

    it('should create lru type', () => {
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf($('#filter')));
        productsPage.idSelector('btn-admin-product-details').click();
        element(by.id('inp-lrutype-name')).sendKeys('DSU');
        element(by.id('sel-lrutype-category')).sendKeys('head-end');
        productsPage.idSelector('btn-submit').click();
        browser.sleep(2000);
        element.all(by.css('.mat-checkbox-inner-container')).then(function (items) {
            const myElement = element(by.id('spn-lruname-errorMsg'));
            expect(myElement.isPresent()).toBeTruthy();
        });

    });

    it('should create lru name', () => {
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf($('#filter')));
        productsPage.allCssSelector('.lruType').click();
        browser.sleep(1000);
        productsPage.idSelector('btn-admin-product-createLruName').click();
        element(by.id('name')).sendKeys('180771');
        productsPage.idSelector('btn-submit').click();
        browser.sleep(2000);
        element.all(by.css('.mat-checkbox-inner-container')).then(function (items) {
            const myElement = element(by.css('.alert-danger'));
            expect(myElement.isPresent()).toBeTruthy();
        });

    });

    it('should create part number', () => {
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf($('#filter')));
        $$('.toggle-children').first().click();
        browser.sleep(3000);
        $$('div.tree-children div.node-content-wrapper').first().click();
        browser.sleep(3000);
        productsPage.idSelector('btn-admin-product-createPartNumber').click();
        element(by.id('name')).sendKeys('test');
        productsPage.idSelector('btn-submit').click();
        browser.sleep(2000);
        element.all(by.css('.mat-checkbox-inner-container')).then(function (items) {
            const myElement = element(by.css('.alert-danger'));
            expect(myElement.isPresent()).toBeTruthy();
        });
    });

    it('should go to reasons of removal tab', () => {
        browser.sleep(1000);
        productsPage.headerTabs.get(1).click();
        expect(element(by.css('#mat-tab-label-0-1 .mat-tab-label-content')).getText()).toContain('Reasons of Removal');
    });

    it('should sorting to be defined', () => {
        const EC = browser.ExpectedConditions;
        browser.sleep(2000);
        productsPage.headerTabs.get(1).click();
        browser.wait(EC.visibilityOf($('.mat-sort-header-button')));
        productsPage.allCssSelector('.mat-sort-header-button').click();
        browser.sleep(1000);
        const arrow = productsPage.allCssSelector('.mat-sort-header-arrow');
        expect(arrow.getAttribute('class')).toBeTruthy();
    });

    it('should create reasons of removal', () => {
        browser.sleep(2000);
        productsPage.headerTabs.get(1).click();
        browser.sleep(2000);
        productsPage.idSelector('btn-admin-product-reasonofremovaL').click();
        element(by.id('inp-reasonofremovaldesc')).sendKeys('DSU');
        productsPage.idSelector('btn-save-products').click();
        browser.sleep(2000);
        element.all(by.css('.mat-checkbox-inner-container')).then(function (items) {
            const myElement = element(by.id('btn-save-products'));
            expect(myElement.isPresent()).toBeFalsy();
        });

    });


    it('should go to repair action tab', () => {
        browser.sleep(1000);
        productsPage.headerTabs.get(2).click();
        productsPage.headerTabs.get(2).getText().then((result: string) => expect(result).toContain('Repair Actions'));
    });

    it('should sorting to be defined', () => {
        browser.sleep(1000);
        productsPage.headerTabs.get(2).click();
        browser.sleep(2000);
        productsPage.allCssSelector('.mat-sort-header-button').click();
        browser.sleep(1000);
        const arrow = productsPage.allCssSelector('.mat-sort-header-arrow');
        expect(arrow.getAttribute('class')).toBeTruthy();
    });

    it('should create repair action', () => {
        browser.sleep(1000);
        productsPage.headerTabs.get(2).click();
        browser.sleep(2000);
        productsPage.idSelector('btn-admin-product-repairactions').click();
        element(by.id('inp-repairaction-template')).sendKeys('DSU');
        productsPage.idSelector('btn-save-products').click();
        browser.sleep(3000);
        element.all(by.css('.mat-checkbox-inner-container')).then(function (items) {
            const myElement = element(by.id('btn-save-products'));
            expect(myElement.isPresent()).toBeFalsy();
        });

    });

});
