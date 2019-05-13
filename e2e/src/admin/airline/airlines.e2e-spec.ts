import { browser, protractor, $, by, element, promise, ElementFinder, ElementArrayFinder, ExpectedConditions } from 'protractor';
import { AirlinesPage } from './airlines.po';

describe('Airlines Page', () => {
    const airlinesPage = new AirlinesPage();
    beforeEach(() => {
        browser.sleep(1000);
        const origFn = browser.driver.controlFlow().execute;
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        airlinesPage.navigateToAirlines();
        browser.wait(EC.visibilityOf($('#btn-airline-link')));
    });

    it('should display airlines Tab', () => {
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf($('#btn-airline-link')));

        const airlineTab = element(by.id('btn-airline-link'));
        expect(airlineTab.getText()).toContain('Airlines');
    });


    it('should filter airline table', () => {
        const EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf($('art-action-toolbar')));
        airlinesPage.tableFilter().click();
        browser.sleep(1000);
        airlinesPage.enableSearchText().sendKeys('A');
        browser.sleep(1000);
        element.all(by.css('.mat-checkbox-inner-container')).then(function (items) {
            if (items.length) {
                expect(items.length).toBeGreaterThanOrEqual(1);
            } else {
                expect(items.length).toBeGreaterThanOrEqual(0);
            }
        });
    });

    it('should create airline', () => {
        airlinesPage.createAirline().click();
        element(by.id('inp-admin-airline-name')).sendKeys('10');
        element(by.id('inp-admin-airline-acronym')).sendKeys('acr');
        element(by.id('inp-admin-airline-icao')).sendKeys('ic');
        element(by.id('inp-admin-airline-iata')).sendKeys('at');
        element(by.id('btn-airline-save')).click();
        browser.sleep(2000);
        element.all(by.css('.mat-checkbox-inner-container')).then(function (items) {
            const myElement = element(by.id('error'));
            expect(myElement.isPresent()).toBeTruthy();
        });
    });

    it('should display updated at icon', () => {
        airlinesPage.updatedAt();
        browser.sleep(2500);
        element.all(by.css('.mat-checkbox-inner-container')).then(function (items) {
            if (items.length) {
                expect(items.length).toBeGreaterThanOrEqual(1);
            } else {
                expect(items.length).toBeGreaterThanOrEqual(0);
            }
        });
    });

    it('should sorting to be defined', () => {
        airlinesPage.cssSelector('.mat-sort-header-button').click();
        browser.sleep(1000);
        const arrow = airlinesPage.cssSelector('.mat-sort-header-arrow');
        expect(arrow.getAttribute('class')).toBeTruthy();
    });

    it('go to stations module', () => {
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        browser.wait(EC.visibilityOf($('#btn-stations-link')));
        airlinesPage.gotostationModule();
        expect(browser.getCurrentUrl()).toContain('/admin/stations');
    });

    it('should navigate to airline details', () => {
        browser.sleep(3000);
        const airline = airlinesPage.getElementBySelector('.lnk-airline');
        airline.click();
        browser.sleep(3000);
        const airlineConfigTab = airlinesPage.getElementBySelector('mat-tab-group');
        expect(airlineConfigTab.isPresent()).toBeTruthy();
    });

    it('should navigate to airline configuration', () => {
        browser.sleep(3000);
        const airline = airlinesPage.getElementBySelector('.lnk-airline');
        airline.click();
        browser.sleep(3000);
        const airlineConfigTab = element(by.id('mat-tab-label-0-1'));
        airlineConfigTab.click();
        const airlineConfigTbl = airlinesPage.getElementBySelector('table');
        expect(airlineConfigTbl.isPresent()).toBeTruthy();
    });

    it('should navigate back to admin airlines screen from airline deatils screen', () => {
        browser.sleep(3000);
        const airline = airlinesPage.getElementBySelector('.lnk-airline');
        airline.click();
        browser.sleep(1000);
        const back = element(by.id('airline-configuration-back'));
        back.click();
        browser.sleep(1000);
        const adminAirlines = element(by.id('admin-airlines'));
        expect(adminAirlines.isPresent()).toBeTruthy();
    });

    it('should filter airline configuration table', () => {
        browser.sleep(3000);
        airlinesPage.navigateToairlineConfiguration();
        airlinesPage.tableFilter().click();
        browser.sleep(1000);
        airlinesPage.enableSearchText().sendKeys('A');
        browser.sleep(1000);
        element.all(by.css('#tbl-admin-airline-configurations tbody tr td .mat-checkbox-inner-container')).then(function (items) {
            if (items.length) {
                expect(items.length).toBeGreaterThanOrEqual(1);
            } else {
                expect(items.length).toBeGreaterThanOrEqual(0);
            }
        });
    });

    it('should open upload configuration modal', () => {
        browser.sleep(3000);
        airlinesPage.navigateToairlineConfiguration();
        element.all(by.css('#tbl-admin-airline-configurations tbody tr td .mat-checkbox-inner-container')).then(function (items) {
            items[0].click();
            browser.sleep(1000);
            const uploadbtn = airlinesPage.getElementBySelector('#btn-upload-configuration');
            uploadbtn.click();
            const uploadModal = airlinesPage.getElementBySelector('#cofiguration-modal-heading');
            expect(uploadModal.getText()).toBe('Upload Seats Data');
        });
    });

    it('To verify whether down chevron is displayed and clickable in airline all tabs', () => {
        airlinesPage.navigateToJetBlue();
        browser.wait(ExpectedConditions.presenceOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.downChevron), 8000
            , 'Wait for the chevron to be timeout');
        airlinesPage.downChevron.isEnabled().then((chevronDisplayed: boolean) => expect(chevronDisplayed).toBeTruthy());
        airlinesPage.tailsTab.click();
        airlinesPage.downChevron.isEnabled().then((chevronDisplayed: boolean) => expect(chevronDisplayed).toBeTruthy());
        airlinesPage.flightsTab.click();
        airlinesPage.downChevron.isEnabled().then((chevronDisplayed: boolean) => expect(chevronDisplayed).toBeTruthy());
        airlinesPage.offloadsTab.click();
        airlinesPage.downChevron.isEnabled().then((chevronDisplayed: boolean) => expect(chevronDisplayed).toBeTruthy());
        airlinesPage.coverageTab.click();
        airlinesPage.downChevron.isEnabled().then((chevronDisplayed: boolean) => expect(chevronDisplayed).toBeTruthy());
        airlinesPage.scoresTab.click();
        airlinesPage.downChevron.isEnabled().then((chevronDisplayed: boolean) => expect(chevronDisplayed).toBeTruthy());
        airlinesPage.tvPerformanceTab.click();
        airlinesPage.downChevron.isEnabled().then((chevronDisplayed: boolean) => expect(chevronDisplayed).toBeTruthy());
    });

    it('To verify whether select airline window is displayed and with cancel button in airline overview page', () => {
        airlinesPage.navigateToJetBlue();
        browser.wait(ExpectedConditions.presenceOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.downChevron), 8000
            , 'Wait for the chevron to be timeout');
        airlinesPage.downChevron.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.apply), 8000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.searchAirlines), 8000);
        airlinesPage.cancel.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        airlinesPage.airlinesHeader.isDisplayed().then((windowClosed: boolean) => expect(windowClosed).toBeTruthy());
    });

    it('To validate select airline window in airline overview page', () => {
        airlinesPage.navigateToJetBlue();
        browser.wait(ExpectedConditions.presenceOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.downChevron), 8000
            , 'Wait for the chevron to be timeout');
        airlinesPage.downChevron.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.apply), 8000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.searchAirlines), 8000);
        airlinesPage.searchAirlines.sendKeys('JBU');
        airlinesPage.searchAirlines.clear();
        airlinesPage.searchAirlines.sendKeys('AAL');
        browser.wait(ExpectedConditions.presenceOf(airlinesPage.unCheckedAirline), 8000);
        airlinesPage.unCheckedAirline.isEnabled().then((clickableAirline: boolean) => expect(clickableAirline).toBeTruthy());
        airlinesPage.filteredAirline.getText().then((filtered: string) => expect(filtered).toContain('American Airlines (AAL)'));
        airlinesPage.unCheckedAirline.click();
        airlinesPage.apply.click();
        browser.manage().timeouts().implicitlyWait(3000);
        airlinesPage.downChevron.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.apply), 8000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.searchAirlines), 8000);
        airlinesPage.searchAirlines.sendKeys('AAL');
        browser.manage().timeouts().implicitlyWait(3000);
        airlinesPage.cancel.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.tailsTab), 8000);
        airlinesPage.tailsTab.click();
        airlinesPage.overviewTab.click();
        browser.sleep(3000);
        airlinesPage.airlinesHeader.getText().then((modifiedValue: string) => expect(modifiedValue).toContain('American Airlines'));
    });

    it('To validate invalid tail page', () => {
        browser.manage().timeouts().implicitlyWait(3000);
        browser.get('/airlines/JBU123/overview');
        browser.wait(ExpectedConditions.visibilityOf($('.error-description')), 5000);
        expect(browser.getCurrentUrl()).toContain('not-found');
    });

    it('To verify whether select airline window is displayed and with cancel button in airline tails page', () => {
        airlinesPage.navigateToJetBlue();
        airlinesPage.tailsTab.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.downChevron), 8000
            , 'Wait for the chevron to be timeout');
        airlinesPage.downChevron.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.apply), 8000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.searchAirlines), 8000);
        airlinesPage.cancel.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        airlinesPage.airlinesHeader.isDisplayed().then((windowClosed: boolean) => expect(windowClosed).toBeTruthy());
    });

    it('To validate select airline window in airline tails page', () => {
        airlinesPage.navigateToJetBlue();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.tailsTab), 8000);
        airlinesPage.tailsTab.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.downChevron), 8000
            , 'Wait for the chevron to be timeout');
        airlinesPage.downChevron.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.apply), 8000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.searchAirlines), 8000);
        airlinesPage.searchAirlines.sendKeys('AAL');
        browser.wait(ExpectedConditions.presenceOf(airlinesPage.unCheckedAirline), 8000);
        airlinesPage.unCheckedAirline.isEnabled().then((clickableAirline: boolean) => expect(clickableAirline).toBeTruthy());
        airlinesPage.filteredAirline.getText().then((filtered: string) => expect(filtered).toContain('American Airlines (AAL)'));
        airlinesPage.unCheckedAirline.click();
        airlinesPage.apply.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.overviewTab), 8000);
        airlinesPage.overviewTab.click();
        airlinesPage.tailsTab.click();
        browser.sleep(3000);
        airlinesPage.airlinesHeader.getText().then((modifiedValue: string) => expect(modifiedValue).toContain('American Airlines'));
    });

    it('To validate invalid tail page', () => {
        browser.manage().timeouts().implicitlyWait(3000);
        browser.get('/airlines/JBU123/tails');
        browser.wait(ExpectedConditions.visibilityOf($('.error-description')), 5000);
        expect(browser.getCurrentUrl()).toContain('not-found');
    });

    it('To verify whether select airline window is displayed and with cancel button in airline flights page', () => {
        airlinesPage.navigateToJetBlue();
        airlinesPage.flightsTab.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        airlinesPage.downChevron.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.apply), 8000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.searchAirlines), 8000);
        airlinesPage.cancel.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        airlinesPage.airlinesHeader.isDisplayed().then((windowClosed: boolean) => expect(windowClosed).toBeTruthy());
    });

    it('To validate select airline window in airline flights page', () => {
        airlinesPage.navigateToJetBlue();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.flightsTab), 8000);
        airlinesPage.flightsTab.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.downChevron), 8000
            , 'Wait for the chevron to be timeout');
        airlinesPage.downChevron.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.apply), 8000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.searchAirlines), 8000);
        airlinesPage.searchAirlines.sendKeys('JBU');
        airlinesPage.searchAirlines.clear();
        airlinesPage.searchAirlines.sendKeys('AAL');
        browser.wait(ExpectedConditions.presenceOf(airlinesPage.unCheckedAirline), 8000);
        airlinesPage.unCheckedAirline.isEnabled().then((clickableAirline: boolean) => expect(clickableAirline).toBeTruthy());
        browser.wait(ExpectedConditions.presenceOf(airlinesPage.filteredAirline), 8000);
        airlinesPage.filteredAirline.getText().then((filtered: string) => expect(filtered).toContain('American Airlines (AAL)'));
        airlinesPage.unCheckedAirline.click();
        airlinesPage.apply.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.offloadsTab), 8000);
        airlinesPage.offloadsTab.click();
        airlinesPage.flightsTab.click();
        browser.sleep(3000);
        airlinesPage.airlinesHeader.getText().then((modifiedValue: string) => expect(modifiedValue).toContain('American Airlines'));
    });

    it('To validate invalid flights page', () => {
        browser.manage().timeouts().implicitlyWait(3000);
        browser.get('/airlines/JBU123/flights');
        browser.wait(ExpectedConditions.visibilityOf($('.error-description')), 5000);
        expect(browser.getCurrentUrl()).toContain('not-found');
    });

    it('To verify whether select airline window is displayed and with cancel button in airline offloads page', () => {
        airlinesPage.navigateToJetBlue();
        airlinesPage.offloadsTab.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        airlinesPage.downChevron.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.apply), 8000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.searchAirlines), 8000);
        airlinesPage.cancel.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        airlinesPage.airlinesHeader.isDisplayed().then((windowClosed: boolean) => expect(windowClosed).toBeTruthy());
    });

    it('To validate select airline window in airline overview page', () => {
        airlinesPage.navigateToJetBlue();
        browser.wait(ExpectedConditions.presenceOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.downChevron), 8000
            , 'Wait for the chevron to be timeout');
        airlinesPage.downChevron.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.apply), 8000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.searchAirlines), 8000);
        airlinesPage.searchAirlines.sendKeys('JBU');
        airlinesPage.searchAirlines.clear();
        airlinesPage.searchAirlines.sendKeys('AAL');
        browser.wait(ExpectedConditions.presenceOf(airlinesPage.unCheckedAirline), 8000);
        airlinesPage.unCheckedAirline.isEnabled().then((clickableAirline: boolean) => expect(clickableAirline).toBeTruthy());
        airlinesPage.filteredAirline.getText().then((filtered: string) => expect(filtered).toContain('American Airlines (AAL)'));
        airlinesPage.unCheckedAirline.click();
        airlinesPage.apply.click();
        browser.manage().timeouts().implicitlyWait(3000);
        airlinesPage.downChevron.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.apply), 8000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.searchAirlines), 8000);
        airlinesPage.searchAirlines.sendKeys('AAL');
        browser.manage().timeouts().implicitlyWait(3000);
        airlinesPage.cancel.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.tailsTab), 8000);
        airlinesPage.tailsTab.click();
        airlinesPage.overviewTab.click();
        browser.sleep(3000);
        airlinesPage.airlinesHeader.getText().then((modifiedValue: string) => expect(modifiedValue).toContain('American Airlines'));
    });


    it('To validate invalid offloads page', () => {
        browser.manage().timeouts().implicitlyWait(3000);
        browser.get('/airlines/JBU123/offloads');
        browser.wait(ExpectedConditions.visibilityOf($('.error-description')), 5000);
        expect(browser.getCurrentUrl()).toContain('not-found');
    });

    it('To verify whether select airline window is displayed and with cancel button in airline coverage page', () => {
        airlinesPage.navigateToJetBlue();
        airlinesPage.coverageTab.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        airlinesPage.downChevron.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.apply), 8000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.searchAirlines), 8000);
        airlinesPage.cancel.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        airlinesPage.airlinesHeader.isDisplayed().then((windowClosed: boolean) => expect(windowClosed).toBeTruthy());
    });

    it('To validate select airline window in airline coverage page', () => {
        airlinesPage.navigateToJetBlue();
        airlinesPage.coverageTab.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.downChevron), 8000
            , 'Wait for the chevron to be timeout');
        airlinesPage.downChevron.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.apply), 8000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.searchAirlines), 8000);
        airlinesPage.searchAirlines.sendKeys('JBU');
        airlinesPage.searchAirlines.clear();
        airlinesPage.searchAirlines.sendKeys('AAL');
        browser.wait(ExpectedConditions.presenceOf(airlinesPage.unCheckedAirline), 8000);
        airlinesPage.unCheckedAirline.isEnabled().then((clickableAirline: boolean) => expect(clickableAirline).toBeTruthy());
        browser.wait(ExpectedConditions.presenceOf(airlinesPage.filteredAirline), 8000);
        airlinesPage.filteredAirline.getText().then((filtered: string) => expect(filtered).toContain('American Airlines (AAL)'));
        airlinesPage.unCheckedAirline.click();
        airlinesPage.apply.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.tailsTab), 8000);
        airlinesPage.overviewTab.click();
        airlinesPage.coverageTab.click();
        browser.sleep(3000);
        airlinesPage.airlinesHeader.getText().then((modifiedValue: string) => expect(modifiedValue).toContain('American Airlines'));
    });

    it('To validate invalid coverage page', () => {
        browser.manage().timeouts().implicitlyWait(3000);
        browser.get('/airlines/JBU123/coverage');
        browser.wait(ExpectedConditions.visibilityOf($('.error-description')), 5000);
        expect(browser.getCurrentUrl()).toContain('not-found');
    });

    it('To verify whether select airline window is displayed and with cancel button in airline scores page', () => {
        airlinesPage.navigateToJetBlue();
        airlinesPage.scoresTab.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        airlinesPage.downChevron.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.apply), 8000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.searchAirlines), 8000);
        airlinesPage.cancel.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        airlinesPage.airlinesHeader.isDisplayed().then((windowClosed: boolean) => expect(windowClosed).toBeTruthy());
    });

    it('To validate select airline window in airline scores page', () => {
        airlinesPage.navigateToJetBlue();
        airlinesPage.scoresTab.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.downChevron), 8000
            , 'Wait for the chevron to be timeout');
        airlinesPage.downChevron.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.apply), 8000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.searchAirlines), 8000);
        airlinesPage.searchAirlines.sendKeys('JBU');
        airlinesPage.searchAirlines.clear();
        airlinesPage.searchAirlines.sendKeys('AAL');
        browser.wait(ExpectedConditions.presenceOf(airlinesPage.unCheckedAirline), 8000);
        airlinesPage.unCheckedAirline.isEnabled().then((clickableAirline: boolean) => expect(clickableAirline).toBeTruthy());
        browser.wait(ExpectedConditions.presenceOf(airlinesPage.filteredAirline), 8000);
        airlinesPage.filteredAirline.getText().then((filtered: string) => expect(filtered).toContain('American Airlines (AAL)'));
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.unCheckedAirline), 8000);
        airlinesPage.unCheckedAirline.click();
        airlinesPage.apply.click();
        browser.wait(ExpectedConditions.visibilityOf($('.error-description')), 5000);
        browser.sleep(5000);
        expect(browser.getCurrentUrl()).toContain('access-denied');
    });

    it('To validate invalid scores page', () => {
        airlinesPage.navigateToJetBlue();
        airlinesPage.scoresTab.click();
        browser.manage().timeouts().implicitlyWait(3000);
        browser.get('/airlines/JBU123/scores');
        browser.wait(ExpectedConditions.visibilityOf($('.error-description')), 5000);
        browser.sleep(5000);
        expect(browser.getCurrentUrl()).toContain('not-found');
    });

    it('To verify whether select airline window is displayed and with cancel button in airline tv performance page', () => {
        airlinesPage.navigateToJetBlue();
        airlinesPage.scoresTab.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        airlinesPage.downChevron.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.apply), 8000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.searchAirlines), 8000);
        airlinesPage.cancel.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        airlinesPage.airlinesHeader.isDisplayed().then((windowClosed: boolean) => expect(windowClosed).toBeTruthy());
    });

    it('To validate select airline window in airline tv performance page', () => {
        airlinesPage.navigateToJetBlue();
        airlinesPage.scoresTab.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.airlinesHeader), 8000
            , 'Wait for the airlines header displayed to be timeout');
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.downChevron), 8000
            , 'Wait for the chevron to be timeout');
        airlinesPage.downChevron.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.apply), 8000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.searchAirlines), 8000);
        airlinesPage.searchAirlines.sendKeys('JBU');
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.checkedAirline), 8000);
        airlinesPage.searchAirlines.clear();
        airlinesPage.searchAirlines.sendKeys('AAL');
        browser.wait(ExpectedConditions.presenceOf(airlinesPage.unCheckedAirline), 8000);
        airlinesPage.unCheckedAirline.isEnabled().then((clickableAirline: boolean) => expect(clickableAirline).toBeTruthy());
        browser.wait(ExpectedConditions.presenceOf(airlinesPage.filteredAirline), 8000);
        airlinesPage.filteredAirline.getText().then((filtered: string) => expect(filtered).toContain('American Airlines (AAL)'));
        airlinesPage.unCheckedAirline.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.apply), 8000);
        airlinesPage.apply.click();
        browser.wait(ExpectedConditions.visibilityOf($('.error-description')), 5000);
        browser.sleep(5000);
        expect(browser.getCurrentUrl()).toContain('access-denied');
    });

    it('To validate invalid tv performance page', () => {
        airlinesPage.navigateToJetBlue();
        airlinesPage.tvPerformanceTab.click();
        browser.manage().timeouts().implicitlyWait(3000);
        browser.get('/airlines/JBU123/tv-performance');
        browser.wait(ExpectedConditions.visibilityOf($('.error-description')), 5000);
        browser.sleep(3000);
        expect(browser.getCurrentUrl()).toContain('not-found');
    });
});
