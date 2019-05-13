import { browser, by, element, $, $$ } from 'protractor';
import { Coverage } from './coverage.po';
describe('Display coverage page', () => {
    let allTails: number;
    let coverage: Coverage;
    let missingAllOffloads: number;
    let missedAllPer: string;
    let missingOffloads: number;
    let missedPer: string;
    let originalTimeout = 0;
    const EC = browser.ExpectedConditions;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeAll(() => {
    coverage = new Coverage();
    browser.waitForAngularEnabled(false);
    coverage.navigateTo();
    browser.wait(EC.visibilityOf(coverage.coverageUpdatedTime));
    coverage.datePicker.click();
    browser.wait(EC.visibilityOf(coverage.calendarDropDown));
    coverage.monthDropDown.get(0).click();
    coverage.monthDuration.click();
    coverage.fromDate.click();
    coverage.toDate.click();
    browser.wait(EC.visibilityOf(coverage.eachTailInformation.first()));
  });

  it('coverage tab should be highlighted', () => {
    // assert
    coverage.coverageTab.getAttribute('class').then((result: string) =>
    expect(result).toContain('active'));
  });

  it('should display coverage percentage data', () => {
    // assert
    coverage.allFilterButton.isDisplayed().then((result: boolean) =>
    expect(result).toBeTruthy());
  });

  it('should display coverage percentage calculation', () => {
    // act
    browser.wait(EC.visibilityOf(coverage.missingOffloads.get(1)));
    coverage.missingOffloads.get(1).getText().then((result1: string) => {
      missingOffloads = parseInt(result1, 10);
    });
    coverage.missingOffloads.get(2).getText().then((result3: string) => {
      missingAllOffloads = parseInt(result3, 10);
    });
    coverage.allOffloads.getText().then((result2: string) => {
      allTails = parseInt(result2, 10);
    });
    coverage.receivedOffloads.get(0).getText().then((result4: string) => {
      missedPer = result4;
    });
    coverage.receivedOffloads.get(1).getText().then((result5: string) => {
      missedAllPer = result5;
    });
    // assert
    coverage.allOffloads.getText().then(() => {
      const finalProcessedPercentage: number = ((missingOffloads / allTails) * 100);
      expect(finalProcessedPercentage.toFixed(1).concat('%')).toContain(missedPer);

      const finalRejectedPercentage: number = ((missingAllOffloads / allTails) * 100);
      expect(finalRejectedPercentage.toFixed(1).concat('%')).toContain(missedAllPer);
    });
  });

  it('should display data table', () => {
    // assert
    coverage.tailTable.isDisplayed().then((result: boolean) =>
    expect(result).toBeTruthy());
  });

  it('should verify status of missing offloads', () => {
    // arrange
    let liveMissedOffloadStatus: string;
    // act
    browser.wait(EC.visibilityOf(coverage.eachTailInformation.first()));
    browser.wait(EC.visibilityOf(coverage.currentProccessedStatus.get(0)));
    // assert
    coverage.currentProccessedStatus.get(0).getCssValue('color')
      .then((result: string) => { liveMissedOffloadStatus = result; });
      coverage.receivedOffloads.get(0).getText().then((processedResult: string) => {
      const missingPercentage: number = parseFloat(processedResult.slice(0, -1));
      coverage.getMissingOffloads(missingPercentage).getCssValue('color')
      .then((missedOffloads: string) => expect(missedOffloads).toContain(liveMissedOffloadStatus));
    });
  });

  it('should verify status of missing all offloads', () => {
    // arrange
    let liveAllMissedOffloadStatus: string;
    // act
    browser.wait(EC.visibilityOf(coverage.eachTailInformation.first()));
    browser.wait(EC.visibilityOf(coverage.currentProccessedStatus.get(1)));
    // assert
    coverage.currentProccessedStatus.get(1).getCssValue('color')
      .then((result: string) => { liveAllMissedOffloadStatus = result; });
      coverage.receivedOffloads.get(1).getText().then((rejectedResult: string) => {
      const allMissingPercentage: number = parseFloat(rejectedResult.slice(0, -1));
      coverage.getAllMissingOffloads(allMissingPercentage).getCssValue('color')
      .then((missedAllOffloads: string) => expect(missedAllOffloads).toContain(liveAllMissedOffloadStatus));
    });
  });
});
