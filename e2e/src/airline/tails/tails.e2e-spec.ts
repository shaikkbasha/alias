import { browser, by, element, $, $$, ExpectedConditions } from 'protractor';
import { Tails } from './tails.po';
describe('Display tails page', () => {

  let originalTimeout = 0;
  let tails: Tails;
  const EC = browser.ExpectedConditions;
  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeAll(() => {
    browser.sleep(1000);
    tails = new Tails();
    browser.waitForAngularEnabled(false);
    tails.navigateTo();
    browser.wait(EC.visibilityOf($('app-airline-tails')));
  });
  it('tails tab should be highlighted', () => {
    const classList = tails.getOffloadClassList();
    expect(classList).toContain('active');
  });

  it('should display data table', () => {
    const dataTable = tails.getDataTable();
    expect(dataTable.isPresent()).toBeTruthy();
  });

  it('should search data tails table', () => {
    browser.wait(EC.visibilityOf($$('#tbl-airline-tails tbody tr').first()));
    tails.getElementBySelector('.tool-bar-search').click();
    tails.getElementBySelector('.action-toolbar-search').sendKeys('N9013A');
    const filteredData = tails.getAllElementsBySelector('table tbody tr');
    browser.sleep(1000);
    filteredData.count().then(function (count) {
      expect(Number(count)).toBeGreaterThanOrEqual(1);
    });
  });

  it('should verify down chevron is displayed for tail focus area in overview tab', () => {
    tails.navigateTo();
    browser.wait(EC.visibilityOf($$('#tbl-airline-tails tbody tr').first()));
    tails.getElementBySelector('.tool-bar-search').click();
    tails.getElementBySelector('.action-toolbar-search').sendKeys('N154AA');
    browser.sleep(3000);
    tails.tailInformation.click();
    browser.wait(EC.visibilityOf($('.fa-chevron-down')), 8000);
    browser.wait(EC.elementToBeClickable($('.fa-chevron-down')), 8000);
    tails.getElementBySelector('.fa-chevron-down').isEnabled()
      .then((clickable: boolean) => expect(clickable).toBeTruthy());
  });

  it('should verify cancel button in overview tab', () => {
    tails.navigateTo();
    browser.wait(EC.visibilityOf($$('#tbl-airline-tails tbody tr').first()));
    tails.getElementBySelector('.tool-bar-search').click();
    tails.getElementBySelector('.action-toolbar-search').sendKeys('N154AA');
    browser.sleep(3000);
    tails.tailInformation.click();
    browser.wait(EC.elementToBeClickable(tails.downChevron), 8000);
    tails.downChevron.click();
    browser.sleep(3000);
    browser.wait(EC.elementToBeClickable(tails.searchTails), 8000);
    tails.cancel.click();
    browser.wait(EC.elementToBeClickable(tails.updatedTime), 8000);
    tails.updatedTime.isEnabled().then((windowClosed: boolean) => expect(windowClosed).toBeTruthy());
  });

  it('should validate select tail modal for tail focus area in overview tab', () => {
    tails.navigateTo();
    browser.wait(EC.visibilityOf($$('#tbl-airline-tails tbody tr').first()));
    tails.getElementBySelector('.tool-bar-search').click();
    tails.getElementBySelector('.action-toolbar-search').sendKeys('N154AA');
    browser.sleep(3000);
    tails.tailInformation.click();
    browser.wait(EC.elementToBeClickable($('.fa-chevron-down')), 8000);
    tails.downChevron.click();
    browser.wait(EC.elementToBeClickable(tails.cancel), 8000);
    browser.wait(EC.elementToBeClickable(tails.searchTails), 8000);
    tails.searchTails.sendKeys('N154AA');
    tails.searchTails.clear();
    tails.searchTails.sendKeys('N9013A');
    browser.wait(EC.presenceOf(tails.unCheckedTail), 8000);
    tails.unCheckedTail.isEnabled().then((clickableTail: boolean) => expect(clickableTail).toBeTruthy());
    browser.wait(EC.presenceOf(tails.filterTails), 8000);
    tails.filterTails.getText().then((filterResult: string) => expect(filterResult).toContain('N9013A'));
    tails.unCheckedTail.click();
    tails.apply.click();
    browser.manage().timeouts().implicitlyWait(3000);
    tails.downChevron.click();
    browser.wait(EC.elementToBeClickable(tails.cancel), 8000);
    browser.wait(EC.elementToBeClickable(tails.searchTails), 8000);
    tails.searchTails.sendKeys('N9013A');
    browser.manage().timeouts().implicitlyWait(3000);
    browser.wait(EC.presenceOf(tails.modifiedTail), 2000);
    tails.modifiedTail.getText().then((modifiedValue: string) => expect(modifiedValue).toContain('N9013A'));
  });

  it('should verify down chevron is displayed for tail focus area in timeline tab', () => {
    tails.navigateToTimeline();
    browser.wait(EC.visibilityOf(tails.timelineTable), 8000);
    tails.getElementBySelector('.fa-chevron-down').isEnabled()
      .then((clickable: boolean) => expect(clickable).toBeTruthy());
  });

  it('should verify cancel button in timeline tab', () => {
    browser.manage().timeouts().implicitlyWait(3000);
    tails.navigateToTimeline();
    browser.wait(EC.visibilityOf(tails.timelineTable));
    tails.getElementBySelector('.fa-chevron-down').click();
    tails.cancel.click();
    browser.wait(EC.elementToBeClickable(tails.updatedTime), 8000);
    tails.updatedTime.isEnabled().then((windowClosed: boolean) => expect(windowClosed).toBeTruthy());
  });

  it('should validate select tail modal for tail focus area in timeline tab', () => {
    tails.navigateToTimeline();
    browser.wait(EC.visibilityOf(tails.timelineTable));
    tails.getElementBySelector('.fa-chevron-down').click();
    browser.wait(EC.elementToBeClickable(tails.apply), 8000);
    browser.wait(EC.elementToBeClickable(tails.searchTails), 8000);
    tails.searchTails.sendKeys('N154AA');
    browser.wait(EC.elementToBeClickable(tails.checkedTail), 8000);
    tails.searchTails.clear();
    tails.searchTails.sendKeys('N9013A');
    tails.unCheckedTail.isEnabled().then((clickableTail: boolean) => expect(clickableTail).toBeTruthy());
    browser.wait(EC.presenceOf(tails.filterTails), 8000);
    tails.filterTails.getText().then((filterResult: string) => expect(filterResult).toContain('N9013A'));
    tails.unCheckedTail.click();
    tails.apply.click();
    browser.wait(EC.presenceOf(tails.modifiedTail), 8000);
    tails.modifiedTail.getText().then((modifiedValue: string) => expect(modifiedValue).toContain('N9013A'));
  });

  it('should verify down chevron is displayed for tail focus area in flight legs tab', () => {
    tails.navigateToFlightLegs();
    browser.wait(EC.elementToBeClickable(tails.downChevron), 8000);
    tails.downChevron.isEnabled()
      .then((clickable: boolean) => expect(clickable).toBeTruthy());
  });

  it('should verify cancel button in flight legs tab', () => {
    browser.manage().timeouts().implicitlyWait(3000);
    tails.navigateToFlightLegs();
    browser.wait(EC.presenceOf(tails.updatedTime));
    browser.wait(EC.elementToBeClickable(tails.updatedTime));
    tails.downChevron.click();
    tails.cancel.click();
    browser.wait(EC.elementToBeClickable(tails.updatedTime), 8000);
    tails.updatedTime.isEnabled().then((windowClosed: boolean) => expect(windowClosed).toBeTruthy());
  });

  it('should validate select tail modal for tail focus area in flight legs tab', () => {
    browser.manage().timeouts().implicitlyWait(3000);
    tails.navigateToFlightLegs();
    browser.wait(EC.presenceOf(tails.updatedTime));
    browser.wait(EC.elementToBeClickable(tails.updatedTime));
    tails.downChevron.click();
    browser.wait(EC.elementToBeClickable(tails.apply), 8000);
    browser.wait(EC.elementToBeClickable(tails.searchTails), 8000);
    tails.searchTails.sendKeys('N154AA');
    browser.wait(EC.elementToBeClickable(tails.checkedTail), 8000);
    tails.searchTails.clear();
    tails.searchTails.sendKeys('N9013A');
    tails.unCheckedTail.isEnabled().then((clickableTail: boolean) => expect(clickableTail).toBeTruthy());
    browser.wait(EC.presenceOf(tails.filterTails), 8000);
    tails.filterTails.getText().then((filterResult: string) => expect(filterResult).toContain('N9013A'));
    tails.unCheckedTail.click();
    tails.apply.click();
    browser.wait(EC.presenceOf(tails.modifiedTail), 8000);
    tails.modifiedTail.getText().then((modifiedValue: string) => expect(modifiedValue).toContain('N9013A'));
  });

  it('should validate invalid tail page', () => {
    browser.manage().timeouts().implicitlyWait(3000);
    tails.navigateTo();
    browser.wait(EC.visibilityOf($$('#tbl-airline-tails tbody tr').first()));
    tails.getElementBySelector('.tool-bar-search').click();
    tails.getElementBySelector('.action-toolbar-search').sendKeys('N154AA');
    browser.sleep(3000);
    tails.tailInformation.click();
    browser.wait(EC.elementToBeClickable($('.fa-chevron-down')), 8000);
    tails.verifyInvalidTail();
    browser.wait(EC.visibilityOf($('.error-description')), 5000);
    expect(browser.getCurrentUrl()).toContain('not-found');
  });

  it('should validate invalid timeline page', () => {
    browser.manage().timeouts().implicitlyWait(3000);
    tails.navigateTo();
    browser.wait(EC.visibilityOf($$('#tbl-airline-tails tbody tr').first()));
    tails.getElementBySelector('.tool-bar-search').click();
    tails.getElementBySelector('.action-toolbar-search').sendKeys('N154AA');
    browser.sleep(3000);
    tails.tailInformation.click();
    browser.wait(EC.elementToBeClickable($('.fa-chevron-down')), 8000);
    tails.verifyInvalidTimeline();
    browser.wait(EC.visibilityOf($('.error-description')), 5000);
    expect(browser.getCurrentUrl()).toContain('not-found');
  });

  it('should validate invalid flight legs page', () => {
    browser.manage().timeouts().implicitlyWait(3000);
    tails.navigateTo();
    browser.wait(EC.visibilityOf($$('#tbl-airline-tails tbody tr').first()));
    tails.getElementBySelector('.tool-bar-search').click();
    tails.getElementBySelector('.action-toolbar-search').sendKeys('N154AA');
    browser.sleep(3000);
    tails.tailInformation.click();
    browser.wait(EC.elementToBeClickable($('.fa-chevron-down')), 8000);
    tails.verifyInvalidFlightLegs();
    browser.wait(EC.visibilityOf($('.error-description')), 5000);
    expect(browser.getCurrentUrl()).toContain('not-found');
  });
});
