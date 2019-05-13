import { browser, by, element, $ } from 'protractor';

export class OverviewPage {
    navigateTo() {
        browser.get('/airlines/OMA/tails/A4O-BAF/flight-legs/2651/overview');
    }

    getIdElement(id) {
        return element(by.id(id));
    }

    getText(selElement) {
        return selElement.getText();
    }
}
