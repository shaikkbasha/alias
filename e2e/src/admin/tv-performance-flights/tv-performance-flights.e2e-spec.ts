import { browser, by, element , $} from 'protractor';
import { TVPerformance } from './tv-performance-flights.po';
describe('Display Tv Performance flights  page', () => {
  let originalTimeout = 0;
  let tvPerformance: TVPerformance;
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
    tvPerformance = new TVPerformance();
    browser.waitForAngularEnabled(false);
    tvPerformance.navigateTo();
    browser.sleep(3000);
    const datebtn = tvPerformance.getDate();
    datebtn.click();
    browser.sleep(3000);
    browser.wait(EC.visibilityOf($('.dropdown-menu')));
    const mnthbtn = tvPerformance.getMonth();
    mnthbtn.element(by.cssContainingText('option', 'Feb')).click();
    const fromDate = tvPerformance.getFromDate();
    fromDate.click();
    const toDate = tvPerformance.getToDate();
    toDate.click();
    browser.wait(EC.visibilityOf($('#tbl-airline-tvperformance tbody tr')));
  });


it('should display data table', () => {
    const dataTable = tvPerformance.getDataTable();
    expect(dataTable.isPresent()).toBeTruthy();
});

});
