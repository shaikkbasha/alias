import { browser, protractor, $, $$, by, element } from 'protractor';
import { Tuner } from './tuner.po';

describe('Tuner Page', () => {

    let originalTimeout = 0;
    let tuner: Tuner;
    const EC = browser.ExpectedConditions;
    beforeEach(() => {
        browser.sleep(1000);
        tuner = new Tuner();
        browser.waitForAngularEnabled(false);
        tuner.navigate();
        browser.wait(EC.visibilityOf($('app-tuner')));
        browser.sleep(2000);
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('should navigate to tuner', () => {
        const tunerBtnId = 'btn-tuner';
        tuner.navigateToAntenna();
        browser.wait(EC.visibilityOf($('app-antenna')));
        const tunerBtn = tuner.getElementBySelector(tunerBtnId);
        tunerBtn.click();
        browser.wait(EC.visibilityOf($('app-tuner')));
        browser.sleep(1000);
        const classList = tuner.getClassListBySelector(tunerBtnId);
        expect(classList).toContain('active');
    });

    it('should display flight details', () => {
        const flightDetails = tuner.getCssElementBySelector('art-flight-details');
        expect(flightDetails.isPresent()).toBeTruthy();
    });

    it('should display section titles', () => {
        const sectionTitle = tuner.getAllElementsBySelector('art-section-title');
        expect(sectionTitle.count()).toBe(3);
    });

    it('should display board tuner filters', () => {
        const tunerCount = tuner.getAllElementsBySelector('.tuner-filter').count();
        const boardCount = tuner.getAllElementsBySelector('.board-filter').count();
        expect(tunerCount).toBe(8);
        expect(boardCount).toBe(7);
    });

    it('should filter by board-1 tuner-1', () => {
        browser.sleep(2000);
        const boardClassList = tuner.getClassListBySelector('lbl-board-1');
        const tunerClassList = tuner.getClassListBySelector('lbl-tuner-1');
        expect(boardClassList).toContain('active');
        expect(tunerClassList).toContain('active');
    });

    it('should display data table', () => {
        const dataTable = tuner.getCssElementBySelector('table');
        expect(dataTable.isPresent()).toBeTruthy();
    });
    it('should filter by board-6 tuner-7', () => {
        browser.sleep(3000);
        const tunerId = 'lbl-tuner-7';
        const boardId = 'lbl-board-6';
        const tunerFilter = tuner.getElementBySelector(tunerId);
        const boardFilter = tuner.getElementBySelector(boardId);
        browser.sleep(6000);
        tunerFilter.click();
        browser.sleep(2000);
        boardFilter.click();
        browser.sleep(2000);
        const tunerClassList = tuner.getClassListBySelector(tunerId);
        const boardClassList = tuner.getClassListBySelector(boardId);
        expect(boardClassList).toContain('active');
        expect(tunerClassList).toContain('active');
    });

    it('should display camId and receiverId', () => {
        browser.manage().timeouts().implicitlyWait(80000);
        tuner.receiverId.isDisplayed().then((receiverId: boolean) => expect(receiverId).toBeTruthy());
        tuner.camId.isDisplayed().then((tunerId: boolean) => expect(tunerId).toBeTruthy());
        $$('.row.mt-4 div label').count().then((result: number) => expect(result).toBe(6));
    });

    it('should action toolbar', () => {
        const actionToolbar = tuner.getCssElementBySelector('art-action-toolbar');
        expect(actionToolbar.isPresent()).toBeTruthy();
    });

    it('should filter tuner table', () => {
        browser.wait(EC.visibilityOf($('#tbl-tuner-board tbody tr')), 60000);
        tuner.getCssElementBySelector('.tool-bar-search').click();
        tuner.getCssElementBySelector('.action-toolbar-search').sendKeys('Pre');
        const filteredData = tuner.getAllElementsBySelector('table tbody tr');
        browser.sleep(1000);
        filteredData.count().then(function(count) {
            expect(Number(count)).toBeGreaterThanOrEqual(1);
        });
    });

    it('should switch parameterView', () => {
        const paramOption = tuner.getElementBySelector('inp-parameter');
        paramOption.click();
        browser.sleep(2000);
        const sectionTitle = tuner.getAllElementsBySelector('art-section-title');
        const paramDropdown = tuner.getElementBySelector('tunerParameterDropdown');
        const boardCount = tuner.getAllElementsBySelector('.param-board-filter').count();
        const boardClassList = tuner.getClassListBySelector('lbl-param-board-1');
        expect(sectionTitle.count()).toBe(2);
        expect(paramDropdown.isPresent()).toBeTruthy();
        expect(boardCount).toBe(7);
        expect(boardClassList).toContain('active');
    });

    it('should display export button', () => {
        const paramOption = tuner.getElementBySelector('inp-parameter');
        paramOption.click();
        browser.sleep(3000);
        tuner.getElementBySelector('tunerParameterDropdown').sendKeys('Agc');
        browser.sleep(3000);
        const exportBtn = tuner.getElementBySelector('btn-tuner-export');
        expect(exportBtn.isPresent()).toBeTruthy();
        exportBtn.click();
        browser.sleep(3000);
    });

    it('should display export button', () => {
        const exportBtn = tuner.getElementBySelector('btn-tuner-export');
        expect(exportBtn.isPresent()).toBeTruthy();
        exportBtn.click();
        browser.sleep(3000);
    });

});
