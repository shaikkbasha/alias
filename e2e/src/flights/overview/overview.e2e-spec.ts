import { browser, by, element , $} from 'protractor';
import { OverviewPage } from './overview.po';
describe('Display Flight Overview page', () => {
  let originalTimeout = 0;
  const overviewPage = new OverviewPage();
  const EC = browser.ExpectedConditions;
  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeAll(() => {
    overviewPage.navigateTo();
    browser.waitForAngularEnabled(false);
    browser.sleep(1000);
    browser.wait(EC.visibilityOf($('#lbl-flight-overview-tail')));
  });

  it('should display same path', () => {
    expect(browser.getCurrentUrl()).toContain('/overview');
  });

  it('should display all flight detail labels', () => {
    browser.wait(EC.visibilityOf($('#lbl-flight-overview-tail')));
    const tailLabel = overviewPage.getIdElement('lbl-flight-overview-tail');
    expect(tailLabel.getText()).toEqual('TAIL');

    const flightIdLabel = overviewPage.getIdElement('lbl-flight-overview-flight');
    expect(flightIdLabel.getText()).toEqual('FLIGHT #');

    const originLabel = overviewPage.getIdElement('lbl-flight-overview-origin');
    expect(originLabel.getText()).toEqual('ORIGIN');

    const destinationLabel = overviewPage.getIdElement('lbl-flight-overview-destination');
    expect(destinationLabel.getText()).toEqual('DESTINATION');

    const flightStartTimeLabel = overviewPage.getIdElement('lbl-flight-overview-departure-time');
    expect(flightStartTimeLabel.getText()).toEqual('FLIGHT LEG START TIME (UTC)');

    const flightEndTimeLabel = overviewPage.getIdElement('lbl-flight-overview-arrival-time');
    expect(flightEndTimeLabel.getText()).toEqual('FLIGHT LEG END TIME (UTC)');

  });

  it('should display event timeline details', () => {
    browser.waitForAngularEnabled(false);
    browser.wait(EC.visibilityOf($('#overview-timeline')));
    expect($('#overview-timeline').isDisplayed()).toBeTruthy();
  });

  it('should display flight statuses', () => {
    browser.waitForAngularEnabled(false);
    browser.wait(EC.visibilityOf($('#spn-flight-sys-event')));
    const sysLabel = overviewPage.getIdElement('lbl-system-reset');
    expect(overviewPage.getText(sysLabel)).toEqual('SYSTEM RESET');

    const headLabel = overviewPage.getIdElement('lbl-head-end');
    expect(overviewPage.getText(headLabel)).toEqual('HEAD END');

    const firstLabel = overviewPage.getIdElement('lbl-first-class');
    expect(overviewPage.getText(firstLabel)).toEqual('FIRST CLASS');

    const businessLabel = overviewPage.getIdElement('lbl-business-class');
    expect(overviewPage.getText(businessLabel)).toEqual('BUSINESS CLASS');

    const economyLabel = overviewPage.getIdElement('lbl-economy-class');
    expect(overviewPage.getText(economyLabel)).toEqual('ECONOMY CLASS');
  });


});

