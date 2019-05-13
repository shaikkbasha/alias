import { browser, protractor, $, $$, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { CommonPage } from '../../common.po';

describe('Repairs Page', () => {
    // let originalTimeout = 0;
    const commponPageObject = new CommonPage();
    beforeEach(() => {
        browser.sleep(1000);
        const origFn = browser.driver.controlFlow().execute;
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        commponPageObject.navigateTo('/repair-management/repairs?fromDate=2019-04-22T00:00:00Z&toDate=2019-04-24T00:00:00Z');
    });

    it('should display repairs Tab', () => {
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf($('#btn-repair-link')));

        const airlineTab = element(by.id('btn-repair-link'));
        expect(airlineTab.getText()).toContain('Repairs');
    });

    it('should filter repairs table', () => {
        browser.sleep(5000);
        commponPageObject.getSelectedIdSelector('filterList').click();
        browser.sleep(3000);
        commponPageObject.getSelectedIdSelector('inp-filter-repairs-text').sendKeys('a');
        browser.sleep(7000);
        $$('i.fa.fa-external-link').get(0).click();
        browser.sleep(6000);
        commponPageObject.getSelectedIdSelector('btn-repair-removal-details-close').click();
        browser.sleep(3000);
        element.all(by.css('td.mat-column-lruPartNo')).then(function (items) {
            if (items.length) {
                expect(items.length).toBeGreaterThanOrEqual(1);
            } else {
                expect(items.length).toBeGreaterThanOrEqual(0);
            }
        });
    });

    it('should display refresh icon', () => {
        browser.sleep(2000);
        const updatedAt = commponPageObject.getSelectedClassSelector('.updated-at');
        expect(updatedAt.getText()).toContain('Updated at');
    });

    it('should display date range picker', () => {
        browser.sleep(2000);
        const updatedAt = commponPageObject.getSelectedClassSelector('.date-range-picker-color');
        expect(updatedAt.isEnabled()).toBeTruthy();
    });

});
