import { browser, by, element, $ } from 'protractor';
import { SingleAirlineUserPage } from './singleairlineuser.po';
import { CommonPage } from '../common.po';
describe('Single Airline User', () => {

  const singleAirlineUserPage = new SingleAirlineUserPage();
  const commonPage = new CommonPage();

  const EC = browser.ExpectedConditions;
  beforeAll(() => {
    singleAirlineUserPage.navigateTo();
    browser.waitForAngularEnabled(false);
    browser.wait(EC.visibilityOf($('#home-welcome-title')));
  });

  it('should be logout', () => {
    singleAirlineUserPage.logout().click();
    expect(browser.getCurrentUrl()).toContain('/login');
  });

  it('should be login', () => {
    const userName = 'e2e.single-airline@us.thalesgroup.com';
    const password = process.env.OKTA_E2E_SINGLE_AIRLINE_USER_PASSWORD;

    browser.wait(EC.visibilityOf($('#okta-signin-username')));

    browser.driver.findElement(by.id('okta-signin-username')).sendKeys(userName);
    browser.driver.findElement(by.id('okta-signin-password')).sendKeys(password);

    browser.driver.findElement(by.id('okta-signin-submit')).click();

    browser.wait(EC.visibilityOf($('#home-welcome-title')));

    expect(browser.getCurrentUrl()).toContain('/home');
  });
  it('should display repair link is present', () => {
    browser.sleep(3000);
    expect(element(by.id('spn-home-repairs')).isPresent()).toBeTruthy();
  });

  it('should display overview page', () => {
    singleAirlineUserPage.navigateToOverview();
    expect(browser.getCurrentUrl()).toContain('overview');
  });

  it('should display access denied page', () => {
    singleAirlineUserPage.navigateToAccessDenied();
    browser.sleep(3000);
    browser.wait(EC.visibilityOf($('.error-description')));
    expect(browser.getCurrentUrl()).toContain('access-denied');
  });

  it('should display not-found page', () => {
    singleAirlineUserPage.navigateToOverviewWithInvalidICAO();
    browser.wait(EC.visibilityOf($('.error-description')));
    expect(browser.getCurrentUrl()).toContain('not-found');
  });

  it('should not display tv-performance tab', () => {
    browser.sleep(1000);
    commonPage.navigateTo('/airlines/ACA/overview');
    browser.sleep(1000);
    expect(element(by.id('btn-tv-performance')).isPresent()).toBeFalsy();
  });

  it('should not display tv-performance link in overview page', () => {
    browser.sleep(1000);
    commonPage.navigateTo('/airlines/ACA/overview');
    browser.sleep(1000);
    expect(element(by.id('spn-overview-tv')).isPresent()).toBeFalsy();
  });

  it('should be logout', () => {
    singleAirlineUserPage.logout().click();
    expect(browser.getCurrentUrl()).toContain('/login');
  });

  it('should be login with admin user', () => {
    const userName = 'e2e.admin@us.thalesgroup.com';
    const password = process.env.OKTA_E2E_PASSWORD;
    browser.wait(EC.visibilityOf($('#okta-signin-username')));

    browser.driver.findElement(by.id('okta-signin-username')).sendKeys(userName);
    browser.driver.findElement(by.id('okta-signin-password')).sendKeys(password);

    browser.driver.findElement(by.id('okta-signin-submit')).click();

    browser.wait(EC.visibilityOf($('#home-welcome-title')));

    expect(browser.getCurrentUrl()).toContain('/home');
  });

  it('should display tv-performance tab', () => {
    browser.sleep(1000);
    commonPage.navigateTo('/airlines/JBU/overview');
    browser.sleep(3000);
    expect(element(by.id('btn-tv-performance')).isPresent()).toBeTruthy();
  });

  it('should display tv-performance link in overview page', () => {
    browser.sleep(1000);
    commonPage.navigateTo('/airlines/ACA/overview');
    browser.sleep(1000);
    expect(element(by.id('spn-overview-tv')).isPresent()).toBeFalsy();
  });
});

