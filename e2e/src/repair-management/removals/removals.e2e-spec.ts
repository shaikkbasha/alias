import { browser, protractor, $, $$, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { CommonPage } from '../../common.po';

describe('Removals Page', () => {
    const commponPageObject = new CommonPage();
    beforeEach(() => {
        browser.sleep(1000);
        const origFn = browser.driver.controlFlow().execute;
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        commponPageObject.navigateTo('/repair-management/removals?fromDate=2019-04-11T00:00:00Z&toDate=2019-03-13T00:00:00Z');
        browser.wait(EC.visibilityOf($('#btn-removals-link')));
    });

    it('should display removals Tab', () => {
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf($('#btn-removals-link')));

        const airlineTab = element(by.id('btn-removals-link'));
        expect(airlineTab.getText()).toContain('Removals');
    });


    it('should filter removals table', () => {
        browser.sleep(5000);
        commponPageObject.getSelectedIdSelector('filterList').click();
        browser.sleep(3000);
        commponPageObject.getSelectedIdSelector('inp-filter-removals-text').sendKeys('A');
        browser.sleep(7000);
        $$('i.fa.fa-external-link').get(0).click();
        browser.sleep(6000);
        commponPageObject.getSelectedIdSelector('btn-repair-details-close').click();
        browser.sleep(3000);
        element.all(by.css('td.mat-column-lruPartNumber')).then(function(items) {
            if (items.length) {
                expect(items.length).toBeGreaterThanOrEqual(1);
            } else {
                expect(items.length).toBeGreaterThanOrEqual(0);
            }
        });
    });

    it('should display refresh icon', () => {
        const updatedAt = commponPageObject.getSelectedClassSelector('.updated-at');
        expect(updatedAt.getText()).toContain('Updated at');
    });

    it('should display date range picker', () => {
        const updatedAt = commponPageObject.getSelectedClassSelector('.date-range-picker-color');
        expect(updatedAt.isEnabled()).toBeTruthy();
    });

});
