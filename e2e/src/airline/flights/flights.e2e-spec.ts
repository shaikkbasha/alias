import { browser, by, element, $, $$ } from 'protractor';
import { Flights } from './flights.po';
describe('Display flights  page', () => {
  let proccessedValue: number;
  let allOffloads: number;
  let processedPercentage: string;
  let rejectedValue: number;
  let rejectedPercentage: string;
  let processedPer: number;
  let rejectedPer: number;

  let originalTimeout = 0;
  let flights: Flights;
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
    flights = new Flights();
    browser.waitForAngularEnabled(false);
    flights.navigateTo();
    browser.wait(EC.visibilityOf($('app-airline-flights')));
    const datebtn = flights.getDate();
    datebtn.click();
    browser.sleep(2000);
    browser.wait(EC.visibilityOf($('.dropdown-menu')));
    const mnthbtn = flights.getMonth().first();
    mnthbtn.element(by.cssContainingText('option', 'Mar')).click();
    const fromDate = flights.getFromDate();
    fromDate.click();
    const toDate = flights.getToDate();
    toDate.click();
    browser.wait(EC.visibilityOf($$('#tbl-airline-flight tbody tr').first()));
  });
  it('flights tab should be highlighted', () => {
    const classList = flights.getOffloadClassList();
    expect(classList).toContain('active');
  });


  it('should display flights percentage data', () => {
    const flightDetails = flights.getPercentageData();
    expect(flightDetails.isPresent()).toBeTruthy();
  });


  it('should display flights percentage calculation', () => {
    flights.getFilterButtonPerLeftprocessed().getText().then((result1: string) => {
      proccessedValue = parseInt(result1, 10);
    });
    flights.getFilterButtonPerLeftrejected().getText().then((result3: string) => {
      rejectedValue = parseInt(result3, 10);
    });
    flights.getFilterButtonPerLeftAll().getText().then((result2: string) => {
      allOffloads = parseInt(result2, 10);
    });
    flights.getFilterButtonPerRightProccessed().getText().then((result4: string) => {
      processedPercentage = result4;
    });


    flights.getFilterButtonPerRightRejected().getText().then((result5: string) => {
      rejectedPercentage = result5;
    });

    flights.getFilterButtonPerLeftAll().getText().then(() => {
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

  it('should display data table', () => {
    const dataTable = flights.getDataTable();
    expect(dataTable.isPresent()).toBeTruthy();
  });

  it('should verify status of received offloads', () => {
    let liveProccessedStatus: string;
    browser.wait(EC.visibilityOf($$('#tbl-airline-flight tbody tr').first()));
    browser.sleep(3000);
    flights.currentProccessedStatus.get(0).getCssValue('color')
      .then((result: string) => { liveProccessedStatus = result; });
    flights.getFilterButtonPerRightProccessed().getText().then((processedResult: string) => {
      const receivedPercentage: number = parseFloat(processedResult.slice(0, -1));
      flights.getProcessedStatus(receivedPercentage).getCssValue('color')
      .then((processedStatus: string) => expect(processedStatus).toContain(liveProccessedStatus));
    });
  });

  it('should verify status of missed offloads', () => {
    let liveMissedOffloads: string;
    browser.wait(EC.visibilityOf($$('#tbl-airline-flight tbody tr').first()));
    browser.sleep(3000);
    flights.currentProccessedStatus.get(1).getCssValue('color')
      .then((result: string) => { liveMissedOffloads = result; });
    flights.getFilterButtonPerRightRejected().getText().then((rejectedResult: string) => {
      const missedPercentage: number = parseFloat(rejectedResult.slice(0, -1));
      flights.getMissedOffloads(missedPercentage).getCssValue('color')
      .then((missedOffloads: string) => expect(missedOffloads).toContain(liveMissedOffloads));
    });
  });
});
