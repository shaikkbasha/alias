import { browser, by, element, $, $$ } from 'protractor';
import { Offloads } from './offloads.po';

describe('Display offloads  page', () => {
  let proccessedValue: number;
  let allOffloads: number;
  let processedPercentage: string;
  let rejectedValue: number;
  let rejectedPercentage: string;
  let processedPer: number;
  let rejectedPer: number;

  let originalTimeout = 0;
  let offloads: Offloads;
  const EC = browser.ExpectedConditions;
  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

 beforeAll(() => {
    browser.sleep(1000);
    offloads = new Offloads();
    browser.waitForAngularEnabled(false);
    offloads.navigateTo();
    browser.wait(EC.visibilityOf($('app-airline-offloads')));
    const datebtn = offloads.getDate();
    datebtn.click();
    browser.sleep(2000);
    browser.wait(EC.visibilityOf($('.dropdown-menu')));
    const mnthbtn = offloads.getMonth().first();
    mnthbtn.element(by.cssContainingText('option', 'Mar')).click();
    const fromDate = offloads.getFromDate();
    fromDate.click();
    const toDate = offloads.getToDate();
    toDate.click();
    browser.wait(EC.visibilityOf($$('#tbl-airline-offloads tbody tr').first()));
  });


  it('should display percentage filter data', () => {
    const flightDetails = offloads.getPercentageData();
    expect(flightDetails.isPresent()).toBeTruthy();
  });


  it('should display offloads percentage calculation', () => {
    offloads.getFilterButtonPerLeftprocessed().getText().then((result1: string) => {
      proccessedValue = parseInt(result1, 10);
    });
    offloads.getFilterButtonPerLeftrejected().getText().then((result3: string) => {
      rejectedValue = parseInt(result3, 10);
    });
    offloads.getFilterButtonPerLeftAll().getText().then((result2: string) => {
      allOffloads = parseInt(result2, 10);
    });
    offloads.getFilterButtonPerRightProccessed().getText().then((result4: string) => {
      processedPercentage = result4;
    });


    offloads.getFilterButtonPerRightRejected().getText().then((result5: string) => {
      rejectedPercentage = result5;
    });

    offloads.getFilterButtonPerLeftAll().getText().then(() => {
      const finalProcessedPercentage: number = ((proccessedValue / allOffloads) * 100);
      processedPer = parseFloat(finalProcessedPercentage.toFixed(1));
      expect(finalProcessedPercentage.toFixed(1).concat('%')).toContain(processedPercentage);

      const finalRejectedPercentage: number = ((rejectedValue / allOffloads) * 100);
      rejectedPer = parseFloat(finalRejectedPercentage.toFixed(1));
      expect(finalRejectedPercentage.toFixed(1).concat('%')).toContain(rejectedPercentage);

      const finalPercentageEqual: number = processedPer + rejectedPer;
      expect(finalPercentageEqual).toEqual(100);

    });
  });

  it('offloads tab should be highlighted', () => {
    const classList = offloads.getOffloadClassList();
    expect(classList).toContain('active');
  });

  it('should display data table', () => {
    const dataTable = offloads.getDataTable();
    expect(dataTable.isPresent()).toBeTruthy();
  });

  it('should filter data with offloads processed status', () => {
    browser.wait(EC.visibilityOf($$('#tbl-airline-offloads tbody tr').first()));
    offloads.getResultCount().then(count => {
      const fltrbtn = offloads.getFilterButton();
      fltrbtn.click();
      browser.sleep(3000);
      const noOfRows = offloads.getTableRows().getText();
      expect(noOfRows).toContain(Number(count));
    });
  });

  it('should search data offload table', () => {
    browser.wait(EC.visibilityOf($$('#tbl-airline-offloads tbody tr').first()));
    offloads.getElementBySelector('.tool-bar-search').click();
    offloads.getElementBySelector('.action-toolbar-search').sendKeys('A4O-BX');
    const filteredData = offloads.getAllElementsBySelector('table tbody tr');
    browser.sleep(1000);
    filteredData.count().then(function (count) {
      expect(Number(count)).toBeGreaterThanOrEqual(1);
    });
  });

  it('should verify status of processed offloads', () => {
    let liveProccessedStatus: string;
    browser.wait(EC.visibilityOf($$('#tbl-airline-offloads tbody tr').first()));
    browser.sleep(3000);
    offloads.currentProccessedStatus.get(0).getCssValue('color')
      .then((result: string) => { liveProccessedStatus = result; });
      offloads.getFilterButtonPerRightProccessed().getText().then((processedResult: string) => {
      const receivedPercentage: number = parseFloat(processedResult.slice(0, -1));
      offloads.getProcessedStatus(receivedPercentage).getCssValue('color')
      .then((processedStatus: string) => expect(processedStatus).toContain(liveProccessedStatus));
    });
  });

  it('should verify status of rejected offloads', () => {
    let liveMissedOffloads: string;
    browser.wait(EC.visibilityOf($$('#tbl-airline-offloads tbody tr').first()));
    browser.sleep(3000);
    offloads.currentProccessedStatus.get(1).getCssValue('color')
      .then((result: string) => { liveMissedOffloads = result; });
      offloads.getFilterButtonPerRightRejected().getText().then((rejectedResult: string) => {
      const missedPercentage: number = parseFloat(rejectedResult.slice(0, -1));
      offloads.getMissedOffloads(missedPercentage).getCssValue('color')
      .then((missedOffloads: string) => expect(missedOffloads).toContain(liveMissedOffloads));
    });
  });
});
