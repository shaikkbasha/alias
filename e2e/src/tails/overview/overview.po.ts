import { browser, by, element, $ } from 'protractor';

export class OverviewPage {
    navigateTo() {
        browser.get('/airlines/OMA/tails/A4O-SA/overview?fromDate=2019-03-01&toDate=2019-03-25');
    }

    getIdElement(id) {
        return element(by.id(id));
    }

    getClassElement(name) {
        return element(by.className(name));
    }

    getText(selElement) {
        return selElement.getText();
    }

    getElement(selector) {
        return element(by.css(selector));
    }

    getAllElements(selector) {
        return element.all(by.css(selector));
    }

}
