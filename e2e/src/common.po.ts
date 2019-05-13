import { browser, $, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class CommonPage {

    navigateTo(path) {
        browser.get(path).then(function() {
        });
    }
    getSelectedIdSelector(selector) {
        return element( by.id(selector) );
    }
    getSelectedClassSelector(selector) {
        return element( by.css(selector) );
    }

}
