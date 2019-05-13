import { browser, by, element, $ } from 'protractor';

export class SingleAirlineUserPage {
    navigateTo() {
        browser.get('/home');
    }

    logout() {
        return element( by.id('logout'));
    }

    navigateToOverview() {
        browser.get('/airlines/AAL/overview').then(function() {
        });
    }
    navigateToAccessDenied() {
        browser.get('/airlines/OMA/overview').then(function() {
        });
    }
    navigateToOverviewWithInvalidICAO() {
        browser.get('/airlines/12345/overview').then(function() {
        });
    }


}

