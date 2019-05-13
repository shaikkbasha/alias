import { browser, by, element, $, ExpectedConditions } from 'protractor';
import { AirlinesOverviewPage } from './airlines.overview.po';

describe('Display airlines overview page', () => {
  let originalTimeout = 0;
  const airlinesOverviewPage = new AirlinesOverviewPage();
  const EC = browser.ExpectedConditions;
  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeAll(() => {
    airlinesOverviewPage.navigateTo();
    browser.waitForAngularEnabled(false);
    browser.wait(ExpectedConditions.visibilityOf(airlinesOverviewPage.refreshPage));
  });

  it('To verify the refresh icon is displayed', () => {
    browser.wait(ExpectedConditions.visibilityOf(airlinesOverviewPage.datePicker));
    airlinesOverviewPage.refreshPage.isEnabled().then((result: boolean) =>
      expect(result).toBeTruthy());
  });

  it('To verify whether calender is enabled is displayed', () => {
    browser.wait(ExpectedConditions.visibilityOf(airlinesOverviewPage.datePicker), 8000);
    airlinesOverviewPage.datePicker.isDisplayed().then((displayed: boolean) =>
      expect(displayed).toBeTruthy());
  });
});
