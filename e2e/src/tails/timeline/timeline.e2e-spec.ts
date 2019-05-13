import { browser, by, element , $} from 'protractor';
import { OverviewPage } from './timeline.po';
describe('Display Tail Timeline page', () => {
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
    expect(browser.getCurrentUrl()).toContain('/timeline');
  });

  it('should display event timeline details', () => {
    browser.waitForAngularEnabled(false);
    browser.wait(EC.visibilityOf($('#overview-timeline')));
    expect($('#overview-timeline').isDisplayed()).toBeTruthy();
  });
});
