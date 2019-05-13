import { browser, by, element, $ } from 'protractor';
import { OverviewPage } from './overview.po';
describe('Display Tail Overview page', () => {
  let originalTimeout = 0;
  const overviewPage = new OverviewPage();
  const EC = browser.ExpectedConditions;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  beforeAll(() => {
    overviewPage.navigateTo();
    browser.waitForAngularEnabled(false);
  });

  it('should display same path', () => {
    browser.waitForAngularEnabled(false);
    expect(browser.getCurrentUrl()).toContain('/overview');
  });

  it('should display configuration detail labels', () => {
    browser.wait(EC.presenceOf($('#lbl-configuration-aircraftType')));
    browser.wait(EC.presenceOf($('#lbl-configuration-content')));
    const aircraftType = overviewPage.getIdElement('lbl-configuration-aircraftType');
    expect(aircraftType.getText()).toEqual('AIRCRAFT TYPE');

    const aircraftConfig = overviewPage.getIdElement('lbl-configuration-aircraftConfig');
    expect(aircraftConfig.getText()).toEqual('AIRCRAFT CONFIG');

    const msn = overviewPage.getIdElement('lbl-configuration-msn');
    expect(msn.getText()).toEqual('MSN');

    const eis = overviewPage.getIdElement('lbl-configuration-eis');
    expect(eis.getText()).toEqual('EIS');

    const platform = overviewPage.getIdElement('lbl-configuration-platform');
    expect(platform.getText()).toEqual('PLATFORM');

    const swBaseline = overviewPage.getIdElement('lbl-configuration-sw-baseline');
    expect(swBaseline.getText()).toEqual('SW BASELINE');

    const swVersion = overviewPage.getIdElement('lbl-configuration-sw-version');
    expect(swVersion.getText()).toEqual('SW VERSION');

    const swPartNumber = overviewPage.getIdElement('lbl-configuration-sw-part-number');
    expect(swPartNumber.getText()).toEqual('SW PART NUMBER');

    const swInstalledDate = overviewPage.getIdElement('lbl-configuration-sw-installed-date');
    expect(swInstalledDate.getText()).toEqual('SW INSTALLED DATE');

    const mapVersion = overviewPage.getIdElement('lbl-configuration-map-version');
    expect(mapVersion.getText()).toEqual('MAP VERSION');

    const content = overviewPage.getIdElement('lbl-configuration-content');
    expect(content.getText()).toEqual('CONTENT');

  });

  it('should display BITE coverage card', () => {
    browser.get('/airlines/AAL/tails/N934AA/overview?fromDate=2019-03-21&toDate=2019-03-27');
    browser.sleep(5000);
    const coverageCard = overviewPage.getElement('art-kpi-card');
    expect(coverageCard.isPresent()).toBeTruthy();
    const coveragePercentage = overviewPage.getElement('#total-percentage').getText();
    expect(coveragePercentage).toBe('0.0');
    const percentageClasslist = overviewPage.getElement('#total-percentage').getAttribute('class');
    expect(percentageClasslist).toContain('negative-kpi');
    const progressBar = overviewPage.getElement('ngb-progressbar');
    expect(progressBar.isPresent()).toBeTruthy();
    const metrics = overviewPage.getAllElements('.flights-count');
    browser.sleep(1000);
    metrics.count().then(function(count) {
      expect(Number(count)).toBeGreaterThanOrEqual(1);
    });
  });

  it('should display lopa', () => {
    browser.get('/airlines/AAL/tails/N120EE/overview?fromDate=2018-12-01&toDate=2018-12-31');
    browser.sleep(2000);
    browser.wait(EC.visibilityOf($('.lopa-container')));
    const chart = overviewPage.getElement('svg');
    expect(chart.isPresent()).toBeTruthy();
    const xAxis = overviewPage.getAllElements('.xAxis');
    browser.sleep(1000);
    xAxis.count().then(function(count) {
      expect(Number(count)).toBeGreaterThanOrEqual(3);
    });
    const yAxis = overviewPage.getAllElements('.yAxis');
    browser.sleep(1000);
    yAxis.count().then(function(count) {
      expect(Number(count)).toBeGreaterThanOrEqual(3);
    });
    const metrics = overviewPage.getAllElements('path');
    browser.sleep(1000);
    metrics.count().then(function(count) {
      expect(Number(count)).toBeGreaterThanOrEqual(100);
    });
    const resetsContainer = overviewPage.getAllElements('.seat-count');
    browser.sleep(1000);
    resetsContainer.count().then(function(count) {
      expect(Number(count)).toBeGreaterThanOrEqual(1);
    });
    const textPath = overviewPage.getAllElements('textPath');
    browser.sleep(1000);
    textPath.count().then(function(count) {
      expect(Number(count)).toBeGreaterThanOrEqual(46);
    });
  });
});
