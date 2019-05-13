import { browser, $, $$, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class AdminProductsPage {

    headerTabs: ElementArrayFinder = $$('div.mat-tab-labels div.mat-tab-label');

    navigateTo() {
        browser.get('/admin/products');
    }

    treeFilter() {
        return $('#filter');
    }

    idSelector(id) {
        return element(by.id(id));
    }

    cssSelector(css) {
        return element( by.css(css) );
    }

    allCssSelector(selector) {
        return element.all( by.css(selector)).get(1);
    }

}
