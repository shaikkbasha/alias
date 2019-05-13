import { browser, by, element, $ } from 'protractor';

export class Map {

    navigateTo() {
        browser.get('/airlines/JBU/tv-performance/5ca2165e5917fa00197565f9/map');
    }

    navigateToAntenna() {
        browser.get('/airlines/JBU/tv-performance/5ca2165e5917fa00197565f9/antenna');
    }

    getMapButton() {
        return element(by.css('#btn-map'));
    }

    getMapClassList() {
        return element(by.css('#btn-map')).getAttribute('class');
    }

    getFlightDetails() {
        return element(by.css('art-flight-details'));
    }

    getSectionTitle() {
        return element.all(by.css('art-section-title'));
    }

    getMapContainer() {
        return element(by.css('#map'));
    }

    getMapCanvas() {
        return element(by.css('canvas'));
    }

    getArtActionToolbar() {
        return element(by.css('art-action-toolbar'));
    }
}
