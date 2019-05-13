import { browser, by, element, $ } from 'protractor';

export class PeriodicTuner {

    navigate() {
        browser.get('/airlines/JBU/tv-performance/5ca2165e5917fa00197565f9/periodic-tuner-status');
    }

    navigateToAntenna() {
        browser.get('/airlines/JBU/tv-performance/5ca2165e5917fa00197565f9/antenna');
    }

    getElementBySelector(selector) {
        return element(by.css(selector));
    }

    getClassListBySelector(selector) {
        return element(by.css(selector)).getAttribute('class');
    }

    getAllElementsBySelector(selector) {
        return element.all(by.css(selector));
    }

}
