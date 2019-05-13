import { browser, by, element, ElementFinder, $ } from 'protractor';

export class Tuner {

    receiverId: ElementFinder = $('label#lbl-tuner-receiverId');
    camId: ElementFinder = $('label#lbl-tuner-camId');

    navigate() {
        browser.get('/airlines/JBU/tv-performance/5ca2165e5917fa00197565f9/tuner');
    }

    navigateToAntenna() {
        browser.get('/airlines/JBU/tv-performance/5ca2165e5917fa00197565f9/antenna');
    }

    getElementBySelector(selector) {
        return element(by.id(selector));
    }

    getCssElementBySelector(selector) {
        return element(by.css(selector));
    }

    getClassListBySelector(selector) {
        return element(by.id(selector)).getAttribute('class');
    }

    getAllElementsBySelector(selector) {
        return element.all(by.css(selector));
    }
}
