import { browser, by, element, $ } from 'protractor';
import { CommonPage } from '../../common.po';

export class OverviewPage {
    navigateTo() {
        browser.get('/repair-management/overview');
    }

    getIdElement(id) {
        return element(by.id(id));
    }

    getText(selElement) {
        return selElement.getText();
    }

}
