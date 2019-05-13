import { browser, by, element, $ } from 'protractor';

export class HomePage {
    navigateTo() {
        browser.get('/home');
    }

    getElementBySelector(selector) {
        return element(by.css(selector));
    }


    getAllElementsBySelector(selector) {
        return element.all(by.css(selector));
    }

}

