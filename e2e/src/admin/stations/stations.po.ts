import { browser, by, element, $ } from 'protractor';

export class AdminStationsPage {

    navigateTo() {
        browser.get('/admin/stations');
    }

    getCreateStationsButtonText() {
        return element.all(by.className('mat-tab-label-content')).get(0);
    }
    refreshList() {
        return element(by.className('updated-at-icon'));
    }

    gotoRepairStations() {
        element(by.css('[id="mat-tab-label-2-1"]')).click();
        return $('.mat-tab-body-content h3');
    }

    gotoProductsModule() {
        return element( by.id('btn-products-link') );
    }
    idSelector(id) {
        return element(by.id(id));
    }
    classNameSelector(className) {
        return element.all(by.className(className)).get(0);
    }
    cssClassNameSelector(className) {
        return element.all(by.className(className)).get(1);
    }
}
