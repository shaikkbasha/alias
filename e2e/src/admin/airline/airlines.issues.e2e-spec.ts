import { browser, protractor, $, by, element, promise, ElementFinder, ElementArrayFinder, ExpectedConditions } from 'protractor';
import { AirlinesPage } from './airlines.po';

describe('Airlines manage issues Page', () => {
    let originalTimeout = 0;
    const airlinesPage = new AirlinesPage(),
        issue: String = 'name',
        issueDescriptionText: String = 'desc';
    beforeEach(() => {
        browser.sleep(1000);
        const origFn = browser.driver.controlFlow().execute;
        browser.waitForAngularEnabled(false);
        const EC = browser.ExpectedConditions;
        airlinesPage.navigateToIssues();
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('To verify issues tab', () => {
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.adminAirlineHeaders.last()), 8000);
        airlinesPage.adminAirlineHeaders.get(2).isDisplayed().then((issuesTab: boolean) => expect(issuesTab).toBeTruthy());
    });

    it('To verify issues page is displayed', () => {
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.adminAirlineHeaders.last()), 8000);
        airlinesPage.adminAirlineHeaders.get(2).click();
        airlinesPage.createIssue.isDisplayed().then((issueTabLoaded: boolean) => expect(issueTabLoaded).toBeTruthy());
    });

    it('To verify create and filter functionality for issues', () => {
        const issueToBeCreated: string = issue.concat(Math.random().toString(36).replace('0.', ''));
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.adminAirlineHeaders.last()), 8000);
        airlinesPage.adminAirlineHeaders.get(2).click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.createIssue), 8000);
        airlinesPage.createIssue.click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.issueName), 8000);
        airlinesPage.issueName.sendKeys(issueToBeCreated);
        airlinesPage.issueDescription.sendKeys(issueDescriptionText.concat(Math.random().toString(36).replace('0.', '')));
        airlinesPage.saveAirline.click();
        browser.sleep(3000);
        airlinesPage.filterButton.click();
        airlinesPage.filterTextbox.sendKeys(issueToBeCreated);
        browser.sleep(3000);
        airlinesPage.allIssuesNames.getText().then((issueCreated: string) => issueCreated.includes(issueToBeCreated));
    });

    it('To verify whether user is able to edit existing issue', () => {
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.adminAirlineHeaders.last()), 8000);
        airlinesPage.adminAirlineHeaders.get(2).click();
        browser.sleep(3000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.editIssue.first()), 4000);
        airlinesPage.editIssue.first().click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.issueName), 8000);
        airlinesPage.issueName.sendKeys('Edited');
        airlinesPage.cancelUpdate.isEnabled().then((cancelUpdate: boolean) => expect(cancelUpdate).toBeTruthy());
        airlinesPage.updateAirline.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.successToastMessage), 8000);
        airlinesPage.successToastMessage.getText().then((edited: string) => expect(edited).toContain('successfully updated'));
        airlinesPage.allIssuesNames.getText().then((issueCreated: string) => issueCreated.includes('Edited'));
    });

    it('To verify whether user is able to delete existing issue', () => {
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.adminAirlineHeaders.last()), 8000);
        airlinesPage.adminAirlineHeaders.get(2).click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.editIssue.first()), 8000);
        airlinesPage.deleteIssue.first().click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.confirmDeleteIssue), 8000);
        airlinesPage.confirmDeleteIssue.click();
        browser.wait(ExpectedConditions.visibilityOf(airlinesPage.successToastMessage), 8000);
        airlinesPage.successToastMessage.getText().then((deleted: string) => expect(deleted).toContain('successfully deleted'));
    });

    it('To verify whether user is able to cancel deleting existing issue', () => {
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.adminAirlineHeaders.last()), 8000);
        airlinesPage.adminAirlineHeaders.get(2).click();
        browser.sleep(3000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.editIssue.first()), 4000);
        airlinesPage.deleteIssue.first().click();
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.closeDeleteAlert), 8000);
        airlinesPage.closeDeleteAlert.click();
        browser.sleep(3000);
        browser.wait(ExpectedConditions.elementToBeClickable(airlinesPage.adminAirlineHeaders.get(2)), 8000);
        airlinesPage.deleteIssue.first().isEnabled().then((cancelDelete: boolean) => expect(cancelDelete).toBeTruthy());
    });
});
