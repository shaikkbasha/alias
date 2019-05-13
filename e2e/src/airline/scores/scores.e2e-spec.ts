import { browser, by, element, $, $$ } from 'protractor';
import { Scores } from './scores.po';
describe('Display scores  page', () => {

  let originalTimeout = 0;
  let scores: Scores;
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
    scores = new Scores();
    browser.waitForAngularEnabled(false);
    scores.navigateTo();
    browser.wait(EC.visibilityOf($('app-airline-scores')));
    const datebtn = scores.getDate();
    datebtn.click();
    browser.sleep(2000);
    browser.wait(EC.visibilityOf($('.dropdown-menu')));
    const mnthbtn = scores.getMonth();
    mnthbtn.element(by.cssContainingText('option', 'Apr')).click();
    const fromDate = scores.getFromDate();
    fromDate.click();
    const toDate = scores.getToDate();
    toDate.click();
    browser.wait(EC.visibilityOf($('#tbl-airline-scores tbody tr')));
  });
  it('scores tab should be highlighted', () => {
    const classList = scores.getOffloadClassList();
    expect(classList).toContain('active');
  });

  it('should display data table', () => {
    const dataTable = scores.getDataTable();
    expect(dataTable.isPresent()).toBeTruthy();
  });

  it('chart display chart', () => {
    const chart = scores.getChart();
    const chartName = scores.getChartTitle();
    expect(chart.isPresent()).toBeTruthy();
    expect(chartName).toBe('Signal / Channel');
});

  it('should search data score table', () => {
    browser.wait(EC.visibilityOf($('#tbl-airline-scores tbody tr')));
    scores.getElementBySelector('.tool-bar-search').click();
    scores.getElementBySelector('.action-toolbar-search').sendKeys('N729JB');
    const filteredData = scores.getAllElementsBySelector('table tbody tr');
    browser.sleep(1000);
    filteredData.count().then(function (count) {
      expect(Number(count)).toBeGreaterThanOrEqual(1);
    });
  });
});
