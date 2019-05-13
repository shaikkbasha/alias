import { browser, by, element, $, ElementFinder, ElementArrayFinder } from 'protractor';
import { HomePage } from './home.po';
describe('Display home page', () => {
  let originalTimeout = 0;
  const homePage = new HomePage();

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(() => {
    homePage.navigateTo();
    browser.waitForAngularEnabled(false);
    const EC = browser.ExpectedConditions;
    browser.wait(EC.visibilityOf($('#home-welcome-title')));
  });
  it('should display welcome title', () => {
    const welcomeTitle = element(by.id('home-welcome-title'));
    expect(welcomeTitle.getText()).toContain('Welcome');
  });

  it('should display profile link', () => {
    browser.waitForAngularEnabled(false);
    const EC = browser.ExpectedConditions;
    browser.wait(EC.visibilityOf($('#home-welcome-title')));
    //  check the label
    const profileLabel = element(by.id('lbl-profile'));
    expect(profileLabel.getText()).toEqual('PROFILE');
    // check the link
    const profileLink = element(by.id('lnk-home-profile'));
    expect(profileLink.getAttribute('href')).toContain('/profile');
    // check the profie icons
    const profileIcon = element(by.id('spn-home-profile'));
    expect(profileIcon.getAttribute('class')).toContain('home-icon');

  });

  it('should display admin link', () => {
    browser.waitForAngularEnabled(false);
    const EC = browser.ExpectedConditions;
    browser.wait(EC.visibilityOf($('#home-welcome-title')));
    browser.sleep(3000);
    // check the label
    const adminLabel = element(by.id('lbl-admin'));
    expect(adminLabel.getText()).toEqual('ADMIN');
    // check the link
    const adminLink = element(by.id('lnk-home-admin'));
    expect(adminLink.getAttribute('href')).toContain('/admin');
    // check the profie icons
    const adminIcon = element(by.id('spn-home-admin'));
    expect(adminIcon.getAttribute('class')).toContain('home-icon');
  });

  it('should display upload link', () => {
    browser.waitForAngularEnabled(false);
    const EC = browser.ExpectedConditions;
    browser.wait(EC.visibilityOf($('#home-welcome-title')));
    // check the label
    const payloadsLabel = element(by.id('lbl-upload'));
    expect(payloadsLabel.getText()).toEqual('UPLOAD');
    // check the link
    const payloadsLink = element(by.id('lnk-home-upload'));
    expect(payloadsLink.getAttribute('href')).toContain('/upload');
    // check the profie icons
    const payloadsIcon = element(by.id('spn-home-upload'));
    expect(payloadsIcon.getAttribute('class')).toContain('home-icon');

  });

  it('should display ArtActionToolbar', () => {
    const actionToolbar = homePage.getElementBySelector('art-action-toolbar');
    expect(actionToolbar.isPresent()).toBeTruthy();
  });

  it('should filter airline ', () => {
    browser.waitForAngularEnabled(false);
    const EC = browser.ExpectedConditions;
    browser.wait(EC.visibilityOf($('#home-welcome-title')));
    browser.sleep(3000);
    homePage.getElementBySelector('#filterList').click();
    browser.sleep(1000);
    homePage.getElementBySelector('#inp-filter-airlines-text').sendKeys('A');
    const filteredData = homePage.getAllElementsBySelector('.airline-parent');
    filteredData.count().then(function (count) {
      expect(Number(count)).toBeGreaterThan(1);
    });


  });

  it('should filter american airline ', () => {
    browser.waitForAngularEnabled(false);
    const EC = browser.ExpectedConditions;
    browser.wait(EC.visibilityOf($('#home-welcome-title')));
    browser.sleep(3000);
    homePage.getElementBySelector('#filterList').click();
    browser.sleep(1000);
    homePage.getElementBySelector('#inp-filter-airlines-text').sendKeys('American Airlines');
    const filteredData = homePage.getAllElementsBySelector('.airline-parent');
    filteredData.count().then(function (count) {
      expect(Number(count)).toBe(1);
    });


  });


  it('should filter empty of invalid', () => {
    browser.waitForAngularEnabled(false);
    const EC = browser.ExpectedConditions;
    browser.wait(EC.visibilityOf($('#home-welcome-title')));
    browser.sleep(3000);
    homePage.getElementBySelector('#filterList').click();
    browser.sleep(1000);
    homePage.getElementBySelector('#inp-filter-airlines-text').sendKeys('hgkhfd');
    const filteredData = homePage.getAllElementsBySelector('.airline-parent');
    expect(filteredData.isPresent()).toBeFalsy();
  });


  it('should display fixed header', () => {
    const fixedHeader = homePage.getElementBySelector('.fixed-top');
    expect(fixedHeader.isPresent()).toBeTruthy();
  });


  it('should display InFlytHealth title', () => {
    const welcomeTitle = element(by.id('in-flyt-health'));
    expect(welcomeTitle.getText()).toContain('InFlytHealth');
  });


  it('should navigate back to home page on click of navbar title', () => {
    browser.waitForAngularEnabled(false);
    const EC = browser.ExpectedConditions;
    browser.wait(EC.visibilityOf($('#home-welcome-title')));
    const profilebtn = element(by.id('lnk-home-profile'));
    profilebtn.click();
    browser.sleep(3000);
    const clouldbtn = element(by.css('.navbar-brand'));
    clouldbtn.click();
    browser.sleep(3000);
    const welcomeTitle = element(by.id('home-welcome-title'));
    expect(welcomeTitle.getText()).toContain('Welcome');
  });


  it('should contain app-airlines', () => {
    const airlines = element(by.id('home-airlines'));
    expect(airlines.isPresent()).toBeTruthy();
  });

  it('should navigate to /airlines when user clicks /airlines', () => {
    browser.waitForAngularEnabled(false);
    const EC = browser.ExpectedConditions;
    browser.wait(EC.visibilityOf($('#home-welcome-title')));
    browser.sleep(3000);
    const airlineData = homePage.getAllElementsBySelector('.airline-parent');
    airlineData.get(0).click();
    browser.sleep(1000);
    browser.getCurrentUrl().then(function (currentURL) {
      browser.get(currentURL.substr(0, currentURL.indexOf('airlines') + 8));
      browser.sleep(3000);
      homePage.getElementBySelector('#filterList').click();
      browser.sleep(1000);
      homePage.getElementBySelector('#inp-filter-airlines-text').sendKeys('A');
      const filteredData = homePage.getAllElementsBySelector('.airline-parent');
      filteredData.count().then(function (count) {
        expect(Number(count)).toBeGreaterThan(1);
      });
    });
  });

});

