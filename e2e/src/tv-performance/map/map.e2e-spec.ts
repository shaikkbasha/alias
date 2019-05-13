import { browser, protractor, $, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { Map } from './map.po';

describe('Map Page', () => {
    let map: Map;
    let originalTimeout = 0;
    const EC = browser.ExpectedConditions;
    beforeEach(() => {
        browser.sleep(1000);
        map = new Map();
        browser.waitForAngularEnabled(false);
        map.navigateTo();
        browser.wait(EC.visibilityOf($('app-map')));
        browser.sleep(2000);
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('should navigate to map', () => {
        map.navigateToAntenna();
        browser.wait(EC.visibilityOf($('app-antenna')));
        const mapBtn = map.getMapButton();
        mapBtn.click();
        browser.wait(EC.visibilityOf($('app-map')));
        browser.sleep(1000);
        const classList = map.getMapClassList();
        expect(classList).toContain('active');
    });

    it('should display flight details', () => {
        const flightDetails = map.getFlightDetails();
        expect(flightDetails.isPresent()).toBeTruthy();
    });

    it('should display section titles', () => {
        const sectionTitle = map.getSectionTitle();
        expect(sectionTitle.count()).toBe(2);
    });

    it('should display map', () => {
        browser.sleep(3000);
        browser.manage().timeouts().implicitlyWait(60000);
        const mapContainer = map.getMapContainer();
        const canvas = map.getMapCanvas();
        expect(mapContainer.isPresent()).toBeTruthy();
        expect(canvas.isPresent()).toBeTruthy();
    });

    it('should display action toolbar', () => {
        const actionToolbar = map.getArtActionToolbar();
        expect(actionToolbar.isPresent()).toBeTruthy();
    });
});
