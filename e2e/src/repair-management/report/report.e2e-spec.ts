import { browser, protractor, $, $$, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { CommonPage } from '../../common.po';

describe('Report Page', () => {
    const commponPageObject = new CommonPage();
    beforeEach(() => {
        browser.sleep(1000);
        const origFn = browser.driver.controlFlow().execute;
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        commponPageObject.navigateTo('/repair-management/reports');
    });

    it('should display reports Tab', () => {
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf($('#btn-reports-link')));

        const airlineTab = element(by.id('btn-reports-link'));
        expect(airlineTab.getText()).toContain('Reports');
    });

    it('should display pareto chart in reports tab', () => {
        browser.sleep(5000);
        commponPageObject.getSelectedIdSelector('sel-report-lruType').sendKeys('AVCD 01');
        browser.sleep(4000);
        commponPageObject.getSelectedIdSelector('sel-report-lruName').sendKeys('ASU 3');
        browser.sleep(4000);
        commponPageObject.getSelectedIdSelector('sel-report-partNumber').sendKeys('BSU 1');
        browser.sleep(6000);
        $$('div.card-body').get(0).isPresent().then((result: boolean) => expect(result).toBeTruthy());
    });

    it('should display refresh icon', () => {
        browser.sleep(2000);
        const updatedAt = commponPageObject.getSelectedClassSelector('.updated-at');
        expect(updatedAt.getText()).toContain('Updated at');
    });

});
